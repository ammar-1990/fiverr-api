import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import {getOrders,createOrder } from '../controllers/order.controllers.js'

const route = express.Router()



route.post('/:gigId',verifyToken,createOrder)
route.get('/',verifyToken,getOrders)


export default route