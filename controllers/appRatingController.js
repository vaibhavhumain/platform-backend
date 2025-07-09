const AppRating = require('../models/AppRating');

// POST /api/app-ratings
exports.submitAppRating = async (req, res) => {
  try {
    const { rating, feedback, submittedBy } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }

    const newRating = new AppRating({
      rating,
      feedback,
      submittedBy,
    });

    await newRating.save();

    res.status(201).json({ msg: 'Rating submitted successfully', rating: newRating });
  } catch (err) {
    console.error('Submit Rating Error:', err);
    res.status(500).json({ msg: 'Server error while submitting rating' });
  }
};

// GET /api/app-ratings
exports.getAppRatings = async (req, res) => {
  try {
    const ratings = await AppRating.find().sort({ createdAt: -1 });
    res.status(200).json(ratings);
  } catch (err) {
    console.error('Get Ratings Error:', err);
    res.status(500).json({ msg: 'Server error while fetching ratings' });
  }
};
