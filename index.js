import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Creacion del app
const app = express();

// Conexión a MongoDB usando mongoose
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

// Rutas usuario
import userRoutes from './src/user/user.routes';
app.use('/user', userRoutes);

// Rutas restaurante
import restaurantRoutes from './src/restaurant/restaurant.routes';
app.use('/restaurant', restaurantRoutes);

// Endpoint para 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

// Inicia app en puerto 8080
app.listen(8080);
