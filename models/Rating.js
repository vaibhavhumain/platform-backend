import mongoose from 'mongoose';

const appRatingSchema = new mongoose.Schema({
  rating: { type: Number}, 
  feedback: { type: String },
  submittedBy: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.AppRating || mongoose.model('AppRating', appRatingSchema);
