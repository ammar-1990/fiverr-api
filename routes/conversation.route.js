import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import { getConversations ,getConversation ,updateConversation,createConversation } from '../controllers/conversation.controllers.js'

const route = express.Router()




route.get('/',verifyToken,getConversations)
route.get('/:id',verifyToken,getConversation)
route.post('/',verifyToken,createConversation)
route.put('/:id',verifyToken,updateConversation)

export default route