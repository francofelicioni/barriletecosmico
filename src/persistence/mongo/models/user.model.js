import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'premium'],
    default: 'user',
    require: true,
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" }
});

export const userModel = mongoose.model('user', userSchema);