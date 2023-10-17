import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

/**
 * Middleware to verify if a user is signed in by checking the JWT token in the request headers.
 * If verified, the decoded user information is attached to the request object for further processing.
 * If not verified, it returns an error.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function to call if verification is successful.
 */
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during token verification here.
    res.status(401).send({
      success: false,
      error,
      message: 'Unauthorized Access',
    });
  }
};

/**
 * Middleware to check if a user has admin access based on their user role.
 * If the user is not an admin (role !== 1), it returns an unauthorized error.
 * If the user is an admin, it proceeds to the next middleware.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function to call if the user is an admin.
 */
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during admin access check here.
    res.status(401).send({
      success: false,
      error,
      message: 'Error in admin middleware',
    });
  }
};
