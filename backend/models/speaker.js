import mongoose from 'mongoose';

const speakerSchema = new mongoose.Schema({
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
  bio: {
    type: String,
    required: false,
  },
  expertise: {
    type: [String],
    required: false,
  },
  userType: {
    type: String,
    default: 'speaker', 
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  bookedSlots: {
    type: [Date], 
    default: [],
  },
});

const Speaker = mongoose.model('Speaker', speakerSchema);

export default Speaker;



