import express from 'express';
import {
  braintreePaymentsController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  singleCategoryProductsController,
  updateProductController,
} from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import braintree from 'braintree';

const router = express.Router();

/**
 * Create a new product (admin access required).
 *
 * @route POST /api/v1/product/create-product
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.post(
  '/create-product',
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

/**
 * Update an existing product (admin access required).
 *
 * @route PUT /api/v1/product/update-product/:pid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.put(
  '/update-product/:pid',
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

/**
 * Get all products.
 *
 * @route GET /api/v1/product/get-product
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/get-product', getProductController);

/**
 * Get a single product by its slug.
 *
 * @route GET /api/v1/product/get-product/:slug
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/get-product/:slug', getSingleProductController);

/**
 * Get the photo of a product by its ID.
 *
 * @route GET /api/v1/product/product-photo/:pid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/product-photo/:pid', productPhotoController);

/**
 * Delete a product (admin access required).
 *
 * @route DELETE /api/v1/product/delete-product/:pid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.delete('/delete-product/:pid', deleteProductController);

/**
 * Filter products based on criteria.
 *
 * @route POST /api/v1/product/product-filters
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.post('/product-filters', productFilterController);

/**
 * Get the count of all products.
 *
 * @route GET /api/v1/product/product-count
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/product-count', productCountController);

/**
 * Get a list of products per page.
 *
 * @route GET /api/v1/product/product-list/:page
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/product-list/:page', productListController);

/**
 * Search for products by keyword.
 *
 * @route GET /api/v1/product/search/:keyword
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/search/:keyword', searchProductController);

/**
 * Get related products based on product ID and category ID.
 *
 * @route GET /api/v1/product/related-product/:pid/:cid
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/related-product/:pid/:cid', realtedProductController);

/**
 * Get products from a single category by its slug.
 *
 * @route GET /api/v1/product/single-category-products/:slug
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/single-category-products/:slug', singleCategoryProductsController);

/**
 * Get a Braintree token for payment processing.
 *
 * @route GET /api/v1/product/braintree/token
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.get('/braintree/token', braintreeTokenController);

/**
 * Process a payment using Braintree (user authentication required).
 *
 * @route POST /api/v1/product/braintree/payment
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.post('/braintree/payment', requireSignIn, braintreePaymentsController);

export default router;
