import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pricePerSession: {
    type: Number,
    required: function () {
      return this.userType === 'speaker'; 
    },
  },
  userType: {
    type: String,
    default: 'user', 
  },
  
});

const User = mongoose.model('User', userSchema);

export default User;

