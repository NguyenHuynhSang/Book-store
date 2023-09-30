import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    review_text: { type: String, require: true },
    review_date: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Review = mongoose.model('Review', reviewSchema);

export default Review;
