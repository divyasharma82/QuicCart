import bcrypt from 'bcrypt';

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during hashing here.
    throw error; // Optionally rethrow the error for higher-level handling.
  }
};

/**
 * Compares a password with its hashed version to check for a match.
 *
 * @param {string} password - The plain text password.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, or false if not.
 */
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during comparison here.
    throw error; // Optionally rethrow the error for higher-level handling.
  }
};
