import express from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from './../controllers/categoryController.js';

const router = express.Router();

/**
 * Create a new category (admin access required).
 *
 * @route POST /api/category/create-category
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.post(
  '/create-category',
  requireSignIn,
  isAdmin,
  createCategoryController
);

/**
 * Update an existing category (admin access required).
 *
 * @route PUT /api/category/update-category/:id
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.put(
  '/update-category/:id',
  requireSignIn,
  isAdmin,
  updateCategoryController
);

/**
 * Get all categories.
 *
 * @route GET /api/category/get-category
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/get-category', categoryControlller);

/**
 * Get a single category by its slug.
 *
 * @route GET /api/category/single-category/:slug
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/single-category/:slug', singleCategoryController);

/**
 * Delete a category (admin access required).
 *
 * @route DELETE /api/category/delete-category/:id
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.delete(
  '/delete-category/:id',
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;
