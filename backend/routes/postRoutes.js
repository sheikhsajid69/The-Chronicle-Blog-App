const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/postController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const { isAuthorOrAdmin, isAdmin } = require('../middleware/roleMiddleware');

// Public routes
router.get('/', getPosts);
router.get('/tags', getTags);
router.get('/categories', getCategories);

// Protected routes
router.use(protect);

router.get('/my-posts', getMyPosts);
router.get('/:id', optionalAuth, getPostById); // Optional auth to check private/draft posts ownership
router.post('/', isAdmin, createPost);
router.put('/:id', isAuthorOrAdmin, updatePost);
router.delete('/:id', isAuthorOrAdmin, deletePost);

// Admin only routes
router.get('/admin/all', isAdmin, getAllPostsAdmin);
router.get('/admin/stats', isAdmin, getPostStats);

module.exports = router;
