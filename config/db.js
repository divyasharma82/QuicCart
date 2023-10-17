/**
 * Module for connecting to the MongoDB database using Mongoose.
 * @module connectDB
 */

import mongoose from 'mongoose';
import colors from 'colors';

/**
 * Connect to the MongoDB database specified in the MONGO_URL environment variable.
 * @async
 * @throws {Error} Throws an error if the connection to the database fails.
 */
const connectDB = async () => {
  try {
    // Establish a connection to the MongoDB database
    const conn = await mongoose.connect(process.env.MONGO_URL);

    // Log a success message if the connection is established
    console.log(
      `Connected to MongoDB Database: ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    // Log an error message if the connection fails
    console.error(`Error in MongoDB Connection: ${error}`.bgRed.white);
    throw error;
  }
};

export default connectDB;
