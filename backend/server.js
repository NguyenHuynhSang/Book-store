import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seed from './routes/seedRoute.js';

import userRoute from './routes/userRoute.js';
import linkRoute from './routes/linkRoute.js';
import orderRoute from './routes/orderRoute.js';
import bookRoute from './routes/BookRoute.js';

// load data from .env to process
const uri = 'mongodb://0.0.0.0:27017/book-store';
const dbName = 'book-store';

const app = express();
dotenv.config();
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database');
    console.log(error.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seed);

app.use('/api/books', bookRoute);
app.use('/api/user', userRoute);
app.use('/api/orders', orderRoute);

app.use('/api/link', linkRoute);
//send specific error to server
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
