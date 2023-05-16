import { createError } from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import mongoose from "mongoose";
import Stripe from 'stripe'












export const createOrder = async (req, res, next) => {
  const valid = mongoose.Types.ObjectId.isValid(req.params.gigId);
  if (!valid) return next(createError(404, "gigId is not valid"));
  try {
    const gig =await  Gig.findById(req.params.gigId);
    if (!gig) return next(createError(404, "no such gig"));

    if(req.isSeller) return next(createError(404,'sellers can not buy gigs'))

    const newOrder = await Order.create({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "temp",
    });

    res.status(200).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {



try {

    const orders = await Order.find(req.isSeller ? {sellerId:req.userId}:{buyerId:req.userId})

    res.status(200).json(orders)
    
} catch (error) {
    next(error)
}

};
