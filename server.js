import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from './routes/users.route.js'
import gigRoute from './routes/gig.route.js'
import conversationRoute from './routes/conversation.route.js'
import messageRoute from './routes/message.route.js'
import orderRoute from './routes/order.route.js'
import reviewRoute from './routes/review.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


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


app.use(cors({origin:'https://6464d4317ca2dc000831f3c6--inspiring-cranachan-f783e0.netlify.app',credentials:true}))
app.use(cookieParser())
app.use(express.json()
// routes
)
app.use('/api/users',userRoute)
app.use('/api/auths',authRoute)
app.use('/api/gigs',gigRoute)
app.use('/api/orders',orderRoute)
app.use('/api/conversations',conversationRoute)
app.use('/api/messages',messageRoute)
app.use('/api/reviews',reviewRoute)




app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'something went wrong'

  return res.status(errorStatus).send(errorMessage)
})



















connetction()




