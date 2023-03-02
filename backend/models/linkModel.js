import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    url: { type: String, require: true, unique: true },
    alt: { type: String },
    target: { type: String, default: '_blank' },
    type: { type: String },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);
const Link = mongoose.model('Link', linkSchema);

export default Link;
