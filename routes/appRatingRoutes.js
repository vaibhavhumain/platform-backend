const express = require('express');
const { submitAppRating, getAppRatings } = require('../controllers/appRatingController');
const router = express.Router();

router.post('/', submitAppRating);
router.get('/', getAppRatings);

module.exports = router;
