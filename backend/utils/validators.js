// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Password validation - at least 6 characters
const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Validate registration input
const validateRegisterInput = (email, password, name) => {
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Please provide a valid email');
  }

  if (!password) {
    errors.push('Password is required');
  } else if (!isValidPassword(password)) {
    errors.push('Password must be at least 6 characters');
  }

  if (name && name.length > 50) {
    errors.push('Name cannot be more than 50 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate login input
const validateLoginInput = (email, password) => {
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Please provide a valid email');
  }

  if (!password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate post input
const validatePostInput = (title, content) => {
  const errors = [];

  if (!title) {
    errors.push('Title is required');
  } else if (title.length > 200) {
    errors.push('Title cannot be more than 200 characters');
  }

  if (!content) {
    errors.push('Content is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Sanitize string input
const sanitizeString = (str) => {
  if (!str) return '';
  return str.trim();
};

// Parse pagination parameters
const parsePagination = (page, limit) => {
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;
  
  return {
    page: Math.max(1, parsedPage),
    limit: Math.min(100, Math.max(1, parsedLimit)),
  };
};

module.exports = {
  isValidEmail,
  isValidPassword,
  validateRegisterInput,
  validateLoginInput,
  validatePostInput,
  sanitizeString,
  parsePagination,
};