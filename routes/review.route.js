import express from 'express'
import { getReviews } from '../controllers/review.controllers.js'
import { verifyToken } from '../middleware/jwt.js'
import { postReview } from '../controllers/review.controllers.js'
import { deleteReview } from '../controllers/review.controllers.js'

const route = express.Router()


route.post('/',verifyToken,postReview)
route.get('/:id',getReviews)
route.delete('/:id',deleteReview)

export default route