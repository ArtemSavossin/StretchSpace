import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import sessionRoutes from './routes/sessionRoutes.js';
import userRoutes from './routes/userRoutes.js';
import schedueleRoutes from './routes/schedueleRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api is running');
});
app.use('/api/sessions', sessionRoutes);
app.use('/api/scheduele', schedueleRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error(`Не найдено - ${res.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const error = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(error);
  res.json({
    message: err.message,
  });
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`)
);
