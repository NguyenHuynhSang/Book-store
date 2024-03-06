import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectId },
    image: { type: String, default: '/imgs/n2.webp' },
    images: [{ link: { type: String }, type: { type: String } }], // type: 'font','back','other'
    price: { type: Number, require: true },
    rating: { type: Number, default: 0 },
    dimensions: { type: String },
    countInStock: { type: Number, default: 0 },
    description: { type: String },
    publishDate: { type: Date },
    publisher: { type: String },
    language: { type: String },
    numPage: { type: Number },
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
