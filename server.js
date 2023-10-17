import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import path from 'path';

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON data from requests
app.use(morgan('dev')); // HTTP request logger
app.use(express.static(path.join(__dirname, './client/build'))); //middleware for react application

// Routes
app.use('/api/v1/auth', authRoutes); // Authentication routes
app.use('/api/v1/category', categoryRoutes); // Category routes
app.use('/api/v1/product', productRoutes); // Product routes

// client
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
