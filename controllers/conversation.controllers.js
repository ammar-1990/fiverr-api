import { createError } from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";
import mongoose from "mongoose";





export const getConversations = async (req, res, next) => {

try {
    const conversations = await Conversation.find(req.isSeller ? {sellerId:req.userId}:{buyerId:req.userId}).sort({updatedAt:-1})

    res.status(200).json(conversations)
} catch (error) {
    next(error)
}






};










export const getConversation = async (req, res, next) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id);

    try {
        const conversation = await Conversation.findOne({id:req.params.id})


        if (!conversation) return next(createError(404,'no such conversation'))


        res.status(200).json(conversation)

    } catch (error) {
        next(error)
    }

};




export const createConversation = async (req, res, next) => {
  try {
    const newConversation = await Conversation.create({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });

    res.status(200).json(newConversation);
  } catch (error) {
    next(error);
  }
};







export const updateConversation = async (req, res, next) => {
  const valid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!valid) return next(createError(404, "invalid id"));
  try {
    const updated = await Conversation.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          readBySeller: true,
          readByBuyer: true,
        },
      },{new:true}
    );


res.status(200).json(updated)

  } catch (error) {
    next(error)
  }
};
