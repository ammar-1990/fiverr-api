import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from './routes/users.route.js'
import gigRoute from './routes/gig.route.js'
import conversationRoute from './routes/conversation.route.js'
import messageRoute from './routes/message.route.js'
import orderRoute from './routes/order.route.js'
import reviewRoute from './routes/review.route.js'

const app = express();
dotenv.config()

const connetction = async()=>{

    try {
        await mongoose.connect(process.env.MONGO);
        console.log('mongoDB is connected')
        app.listen(8800, () => {

            console.log("server is running");
          });
          
      } catch (error) {
        console.log(error);
    
      }
}
// routes

app.use('/api/users',userRoute)
app.use('/api/message',messageRoute)



















connetction()




