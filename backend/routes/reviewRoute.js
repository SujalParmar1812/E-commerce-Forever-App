import express from 'express'
import { addReview, getAllReviews, getReviewOfProduct } from '../controllers/reviewController.js';
import authUser from '../middlewares/auth.js';

const reviewRouter = express.Router();

reviewRouter.get('/allreviews',getAllReviews);
reviewRouter.get('/:productId',getReviewOfProduct);
reviewRouter.post('/:productId',authUser,addReview);


export default reviewRouter;