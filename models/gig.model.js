import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  totalStars: {
    type: Number,
    default: 0,
  },
  startNumber: {
    type: Number,
    default: 0,
  },
  cat: {
    type: String,
    required:true,
  },

  price: {
    type: Number,
    required:true,
  },
  cover: {
    type: String,
    required:true,
  },
  images: {
    type: [String],
    required:false,
  },
  shortTitle: {
    type: String,
    required:true,
  },
  shortDesc: {
    type: String,
    required:true,
  },
  deliveryTime: {
    type: Number,
    required:true,
  },
  revesionNumber: {
    type: Number,
    required:true,
  },
  features: {
    type: [String],
    required:false,
  },

},{timestamps:true});


export default mongoose.model('Gig',gigSchema)