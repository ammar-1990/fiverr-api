import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import { getMessages, createMessage } from '../controllers/message.controllers.js'

const route = express.Router()


route.get('/:id',verifyToken,getMessages)
route.post('/',verifyToken,createMessage)

export default route