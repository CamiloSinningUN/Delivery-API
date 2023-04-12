import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// App creation
const app = express();

// Connection to DB
mongoose
  .connect('mongodb://127.0.0.1/delivery', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected.');
  })
  .catch((err) => {
    console.log('There was an error with connection!');
    console.log(err);
  });

// Middlewares
app.use(cors());
app.use(express.json());

// User routes
import userRoutes from './src/user/user.routes';
app.use('/user', userRoutes);

// Restaurant routes
import restaurantRoutes from './src/restaurant/restaurant.routes';
app.use('/restaurant', restaurantRoutes);

// Product routes
import productRoutes from './src/product/product.routes';
app.use('/product', productRoutes);

// Endpoint for 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

// Start app on port 8080
app.listen(8080);
