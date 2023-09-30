import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    infor: { type: String },
    avatar: { type: String },
    socialAccounts: [{ type: String }],
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  },
  {
    timestamps: true,
  }
);
const Author = mongoose.model('Author', authorSchema);

export default Author;
