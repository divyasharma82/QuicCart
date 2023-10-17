import express from 'express';
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateUserProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusUpdateController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// Create a router object
const router = express.Router();

/**
 * Register a new user.
 *
 * @route POST /api/auth/register
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.post('/register', registerController);

/**
 * Log in a user.
 *
 * @route POST /api/auth/login
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.post('/login', loginController);

/**
 * Request to reset the user's password.
 *
 * @route POST /api/auth/forgot-password
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.post('/forgot-password', forgotPasswordController);

/**
 * Test route for authenticated users with admin access.
 *
 * @route GET /api/auth/test
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/test', requireSignIn, isAdmin, testController);

/**
 * Protected route for user authentication.
 *
 * @route GET /api/auth/user-auth
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * Protected route for admin authentication.
 *
 * @route GET /api/auth/admin-auth
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * Update user profile information.
 *
 * @route PUT /api/auth/profile
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.put('/profile', requireSignIn, updateUserProfileController);

/**
 * Get a user's orders.
 *
 * @route GET /api/auth/orders
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/orders', requireSignIn, getOrdersController);

/**
 * Get all orders (admin access).
 *
 * @route GET /api/auth/all-orders
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

/**
 * Update the status of an order (admin access).
 *
 * @route PUT /api/auth/status-update/:orderId
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.put(
  '/status-update/:orderId',
  requireSignIn,
  isAdmin,
  orderStatusUpdateController
);

export default router;
