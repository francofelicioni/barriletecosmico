import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'premium'],
    default: 'user',
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts'
  },
  documents: [{
    name: String,
    reference: String
  }],
  lastConnection: {
    type: Date,
    default: Date.now
  }
});

export const userModel = mongoose.model('user', userSchema);