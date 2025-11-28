const Post = require('../models/Post');
const { validatePostInput, parsePagination } = require('../utils/validators');

// @desc    Get all published posts (public)
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const { page, limit } = parsePagination(req.query.page, req.query.limit);
    const skip = (page - 1) * limit;

    // Build query
    const query = { published: true };

    // Filter by tag
    if (req.query.tag) {
      query.tags = { $in: [req.query.tag] };
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Search in title and content
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Build sort
    let sort = { createdAt: -1 }; // Default: newest first
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'oldest':
          sort = { createdAt: 1 };
          break;
        case 'title_asc':
          sort = { title: 1 };
          break;
        case 'title_desc':
          sort = { title: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    }

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('author', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // If post is not published, only author or admin can view
    if (!post.published) {
      if (!req.user || (req.user.role !== 'admin' && post.author._id.toString() !== req.user._id.toString())) {
        return res.status(404).json({
          success: false,
          message: 'Post not found',
        });
      }
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = async (req, res) => {
  try {
    const { title, content, tags, category, published, excerpt, featuredImage } = req.body;

    // Validate input
    const validation = validatePostInput(title, content);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors.join(', '),
      });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      tags: tags || [],
      category: category || 'Uncategorized',
      published: published || false,
      excerpt: excerpt || '',
      featuredImage: featuredImage || '',
    });

    const populatedPost = await Post.findById(post._id).populate('author', 'name email');

    res.status(201).json({
      success: true,
      data: populatedPost,
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (Admin, Author - own posts only)
const updatePost = async (req, res) => {
  try {
    const { title, content, tags, category, published, excerpt, featuredImage } = req.body;

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check ownership (admin can edit any, author can edit own)
    if (req.user.role !== 'admin' && post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      });
    }

    // Validate if title or content is being updated
    if (title || content) {
      const validation = validatePostInput(
        title || post.title,
        content || post.content
      );
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: validation.errors.join(', '),
        });
      }
    }

    // Update fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags !== undefined ? tags : post.tags;
    post.category = category || post.category;
    post.published = published !== undefined ? published : post.published;
    post.excerpt = excerpt !== undefined ? excerpt : post.excerpt;
    post.featuredImage = featuredImage !== undefined ? featuredImage : post.featuredImage;

    await post.save();

    const updatedPost = await Post.findById(post._id).populate('author', 'name email');

    res.json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (Admin, Author - own posts only)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check ownership (admin can delete any, author can delete own)
    if (req.user.role !== 'admin' && post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get posts by current user
// @route   GET /api/posts/my-posts
// @access  Private
const getMyPosts = async (req, res) => {
  try {
    const { page, limit } = parsePagination(req.query.page, req.query.limit);
    const skip = (page - 1) * limit;

    const query = { author: req.user._id };

    // Filter by published status
    if (req.query.published !== undefined) {
      query.published = req.query.published === 'true';
    }

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get my posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all posts (admin only - includes unpublished)
// @route   GET /api/posts/admin/all
// @access  Private/Admin
const getAllPostsAdmin = async (req, res) => {
  try {
    const { page, limit } = parsePagination(req.query.page, req.query.limit);
    const skip = (page - 1) * limit;

    const query = {};

    // Filter by published status
    if (req.query.published !== undefined) {
      query.published = req.query.published === 'true';
    }

    // Filter by author
    if (req.query.author) {
      query.author = req.query.author;
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Search
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get all posts admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all unique tags
// @route   GET /api/posts/tags
// @access  Public
const getTags = async (req, res) => {
  try {
    const tags = await Post.distinct('tags', { published: true });
    res.json({
      success: true,
      data: tags.filter(tag => tag), // Remove empty tags
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all unique categories
// @route   GET /api/posts/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Post.distinct('category', { published: true });
    res.json({
      success: true,
      data: categories.filter(cat => cat), // Remove empty categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get post statistics
// @route   GET /api/posts/stats
// @access  Private/Admin
const getPostStats = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const publishedPosts = await Post.countDocuments({ published: true });
    const draftPosts = await Post.countDocuments({ published: false });

    const categoryStats = await Post.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        total: totalPosts,
        published: publishedPosts,
        drafts: draftPosts,
        byCategory: categoryStats,
      },
    });
  } catch (error) {
    console.error('Get post stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  getAllPostsAdmin,
  getTags,
  getCategories,
  getPostStats,
};