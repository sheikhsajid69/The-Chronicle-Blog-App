const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getUserStats,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// All routes are protected and admin only
router.use(protect);
router.use(isAdmin);

router.get('/', getUsers);
router.get('/stats', getUserStats);
router.get('/:id', getUserById);
router.put('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);

module.exports = router;
