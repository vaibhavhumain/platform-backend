import express from 'express';
import { submitAppRating , getAppRatings } from '../controllers/appRatingController';
const router = express.Router();

router.post('/',submitAppRating);
router.get('/',getAppRatings);

export default router;
