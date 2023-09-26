import express, { query } from 'express';
import Book from '../models/bookModel.js';

const PAGE_SIZE = 10;
const bookRoute = express.Router();

bookRoute.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

bookRoute.get('/search', async (req, res) => {
  console.log('call filter');
  const { query } = req;

  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const searchQuery = query.query || '';
  const rating = query.rating || '';
  const price = query.price || '';
  const order = query.order || '';
  console.log('query.price' + query.price);

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $option: 'i',
          },
        }
      : {};

  const categoryFilter =
    category && category !== 'all' ? `{ caterories.name: ${category} }` : {};

  console.log(categoryFilter);
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
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
      : order === 'lasest'
      ? { price: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'toprated'
      ? { rating: -1 }
      : order === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

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

bookRoute.get('/slug/:slug', async (req, res) => {
  const book = await Book.findOne({ slug: req.params.slug });
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});

bookRoute.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not found' });
  }
});
export default bookRoute;
