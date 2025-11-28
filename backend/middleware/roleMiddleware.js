// Role-based access control middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, please login',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this resource`,
      });
    }

    next();
  };
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, please login',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }

  next();
};

// Check if user is author or admin
const isAuthorOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, please login',
    });
  }

  if (req.user.role !== 'admin' && req.user.role !== 'author') {
    return res.status(403).json({
      success: false,
      message: 'Author or Admin access required',
    });
  }

  next();
};

// Check ownership - user can only modify their own resources
const checkOwnership = (Model) => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found',
        });
      }

      // Admin can modify any resource
      if (req.user.role === 'admin') {
        req.resource = resource;
        return next();
      }

      // Check if user owns the resource
      const ownerId = resource.author ? resource.author.toString() : resource._id.toString();
      
      if (ownerId !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to modify this resource',
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error while checking ownership',
      });
    }
  };
};

module.exports = {
  authorize,
  isAdmin,
  isAuthorOrAdmin,
  checkOwnership,
};