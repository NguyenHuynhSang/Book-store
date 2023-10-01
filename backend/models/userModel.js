import mongoose, { mongo } from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String },
    role: { type: String, default: 'user' },
    address: [
      {
        location: { type: String },
        isDefault: { type: Boolean, default: false },
        phone: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
