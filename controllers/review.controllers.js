import mongoose from "mongoose"
import { createError } from "../utils/createError.js"
import Review from '../models/review.model.js'
import Gig from '../models/gig.model.js'


export const getReviews =async(req,res,next)=>{
const id =req.params.id

const valid = mongoose.Types.ObjectId.isValid(id)
if(!valid) return next(createError(404,'invalid gig id'))
try {
    const reviews = await Review.find({gigId:req.params.id})

res.status(200).json(reviews)

} catch (error) {
    next(error)
}


}



export const postReview = async(req,res,next)=>{
if(req.isSeller) return next(createError(401,'sellers can not create reviews'))

const review = {userId:req.userId,...req.body}
console.log(review)


try {
    const exist = await Review.findOne({gigId:req.body.gigId,userId:req.userId})
    if(exist) return next(createError(401,'review already exists'))
await Review.create(review)
await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{totalStars:req.body.star,startNumber:1}})
res.status(200).json(review)

    
} catch (error) {
    next(error)
}

}


export const deleteReview = async (req,res,next)=>{

}