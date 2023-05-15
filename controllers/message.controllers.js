import { createError } from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import mongoose from "mongoose";

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {

  try {
    const newMessage = await Message.create({
      conversationId: req.body.conversationId,
      userId: req.userId,
      desc: req.body.desc,
    });
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );
    res.status(200).json(newMessage);
  } catch (error) {
    next(error);
  }
};
