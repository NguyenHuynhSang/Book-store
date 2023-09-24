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
  console.log(PAGE_SIZE);
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const searchQuery = query.query || '';
  const rating = query.rating || '';
  const price = query.price || '';
  const order = query.order || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $option: 'i',
          },
        }
      : {};

  const categoryFilter = category && category !== 'all' ? { category } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  console.log('price' + price);
  const priceFilter =
    price && price !== 'all'
      ? {
          // 1-150
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};
  console.log('price after cast' + price);
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
  console.log(3);
  const books = await Book.find({
    ...queryFilter,
    ...categoryFilter,
    ...ratingFilter,
  })

    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  console.log(books);
  console.log(4);

  const countBooks = await Book.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...ratingFilter,
  });
  console.log(5);
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
  console.log('cate' + categories);
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
