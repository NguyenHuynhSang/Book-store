import express, { query } from 'express';
import Book from '../models/bookModel.js';
import Author from '../models/authorModel.js';

const PAGE_SIZE = 10;
const bookRoute = express.Router();

bookRoute.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

bookRoute.get('/products', async (req, res) => {
  var sort = req.query.sort;
  const order = sort.isUp === 'true' ? 1 : -1;
  const sortOrder =
    sort.field === 'id'
      ? { _id: order }
      : sort.field === 'name'
      ? { name: order }
      : sort.field === 'createAt'
      ? { createdAt: order }
      : sort.field === 'price'
      ? { price: order }
      : sort.field === 'countInStock'
      ? { countInStock: order }
      : { _id: -1 };
  console.log(sortOrder);
  const books = await Book.find().sort(sortOrder);
  res.send(books);
});

bookRoute.get('/search', async (req, res) => {
  console.log('call filter');
  const { query } = req;

  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const searchQuery = query.query.toLowerCase() || '';
  const rating = query.rating || '';
  const price = query.price || '';
  const order = query.order || 'latest';
  console.log('query.price' + query.price);

  ///Currently bug with unicode character
  // return unfound if there have unicode character in search query
  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i', // lower case compare
          },
        }
      : {};

  const categoryFilter =
    category && category !== 'all'
      ? {
          'caterories.name': {
            $eq: category,
          },
        }
      : {};
  console.log('rating: ' + rating);
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: parseInt(rating),
          },
        }
      : {};

  console.log(ratingFilter);
  console.log('filter 2' + price);

  const priceFilter =
    price && price != 'all'
      ? {
          // 1-150
          price: {
            $gte: parseInt(price.split('-')[0]),
            $lte: parseInt(price.split('-')[1]),
          },
        }
      : {};

  const sortOrder =
    order === 'featured'
      ? { featured: -1 }
      : order === 'latest'
      ? { _id: -1 }
      : order === 'oldest'
      ? { createdAt: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'lowest'
      ? { price: 1 }
      : order === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };
  console.log(sortOrder);
  const books = await Book.find({
    ...queryFilter,
    ...priceFilter,
    ...categoryFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countBooks = await Book.countDocuments({
    ...queryFilter,
    ...priceFilter,
    ...categoryFilter,
    ...ratingFilter,
  });

  res.send({
    books,
    countBooks,
    page,
    pages: Math.ceil(countBooks / pageSize),
  });
});

bookRoute.get('/categories', async (req, res) => {
  const categories = await Book.find()
    .sort({ 'caterories.order': -1 })
    .distinct('caterories.name');

  res.send(categories);
});

//it works but it look bad lmao
// need to find a better solution
bookRoute.get('/slug/:slug', async (req, res) => {
  const book = await Book.findOne({ slug: req.params.slug });

  const authors = await Author.find({
    books: {
      $eq: book._id,
    },
  });

  const resData = {
    ...book._doc,
    authors: [...authors],
  };

  if (resData) {
    res.send(resData);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});

bookRoute.get('/:id', async (req, res) => {
  console.log('call get book by id api');
  console.log(req.params);
  const book = await Book.findById(req.params.id);
  console.log(book);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});
export default bookRoute;
