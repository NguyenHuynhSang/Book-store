import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    order: { type: String, require: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model('Link', categorySchema);

export default Category;
