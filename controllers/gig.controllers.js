import Gig from "../models/gig.model.js";
import { createError } from "../utils/createError.js";
import mongoose from "mongoose";

export const createGig = async (req, res, next) => {
  
  if (!req.isSeller)
    return next(createError(401, "only sellers can create gigs"));
console.log(req.userId)
  try {
  const  newGig = await Gig.create({ userId: req.userId, ...req.body });
    res.status(201).json(newGig)
  } catch (err) {
    next(err)
  }
};

export const deleteGig = async (req, res, next) => {


    try{const gig = await Gig.findById(req.params.id)
        if(!gig) return next(createError(404,'gig does not exist'))
        if(gig.userId !== req.userId) return next(createError(401,'you can delete only your gigs !'))
        await Gig.findByIdAndDelete(req.params.id)
        res.status(201).send('Gig has been deleted')
    }
    
        catch(err){
            next(err)
        }


};

export const getGig = async (req, res, next) => {

    try {
        const valid = mongoose.Types.ObjectId.isValid(req.params.id)
        if(!valid) return next(createError(404,'not valid gig id'))
        const gig = await Gig.findById(req.params.id)
        if(!gig) return next(createError(404,'gig does not exist'))
        res.status(201).json(gig)
    } catch (err) {
        next(err)
    }
};

export const getGigs = async (req, res, next) => {
const q = req.query;

const filters = {
    ...(q.userId && {userId:q.userId}),
    ...(q.cat && {cat:q.cat}),
    ...((q.min || q.max ) && {price:{...(q.min &&{$gt:q.min}), ...(q.max && {$lt:q.max})}}),
    ...(q.search && {title:{$regex:q.search, $options:'i'}})
}

    try {

        const gigs = await Gig.find(filters).sort({[q.sort]:-1})

        res.status(201).json(gigs)
        
    } catch (err) {
        next(err)
    }
};



export const getManyGigs = async (req,res,next)=>{

    try {
     
        const gigs = await Gig.aggregate([{ $sample: { size: 7 } }]);

        res.status(200).json(gigs)
    } catch (error) {
        next(error)
    }
}
