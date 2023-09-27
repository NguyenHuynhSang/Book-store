import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    image: { type: String, default: '/imgs/n2.webp' },
    price: { type: Number, require: true },
    rating: { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },
    description: { type: String },
    numReviews: { type: Number, default: 0 },
    // sparse: true //
    // unique if not null
    caterories: [
      {
        name: { type: String },
        order: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);
export default Book;
