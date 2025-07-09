const mongoose = require('mongoose');

const appRatingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    feedback: {
      type: String,
    },
    submittedBy: {
      type: String,
    },
    appName: {type:String},
  },
  { timestamps: true } // ✅ This adds createdAt and updatedAt
);

module.exports = mongoose.model('AppRating', appRatingSchema);
