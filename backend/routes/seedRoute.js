import express from 'express';
import Book from '../models/bookModel.js';
import Link from '../models/linkModel.js';
import User from '../models/userModel.js';
import data from '../tempdata.js';
const seed = express.Router();

seed.get('/all', async (req, res) => {
  //seed book
  await Book.remove({});
  const createdBook = await Book.insertMany(data.books);

  // seed user
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  console.log(data.user);
  res.send({ createdBook, createdUsers });
});

seed.get('/book', async (req, res) => {
  //seed book
  await Book.remove({});
  const createdBook = await Book.insertMany(data.books);
  res.send(createdBook);
});

seed.get('/user', async (req, res) => {
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  console.log(data.user);
  res.send(createdUsers);
});
seed.get('/link', async (req, res) => {
  await Link.remove({});
  const createdLinks = await Link.insertMany(data.links);
  console.log(data.links);
  res.send(createdLinks);
});
export default seed;
