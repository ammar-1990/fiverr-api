import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import { deleteUser, getUser } from '../controllers/users.controllers.js'

const router = express.Router()

router.get('/:id',verifyToken,getUser)
router.delete('/delete/:id',verifyToken,deleteUser)



export default router