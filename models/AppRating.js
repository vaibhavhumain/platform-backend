const mongoose = require('mongoose');

const appRatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  feedback: {
    type: String
  },
  submittedBy: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('AppRating', appRatingSchema);
