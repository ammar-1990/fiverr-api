import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    gigId:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:false
    },
    title:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    sellerId:{
        type:String,
        required:true
    },
    buyerId:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    isCompleted:{
        type:String,
        required:true
    },

},{timestamps:true})

export default mongoose.model('Order',orderSchema)