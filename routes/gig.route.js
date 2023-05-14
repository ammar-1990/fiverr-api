import express from 'express'
import { verifyToken } from '../middleware/jwt.js'

import { createGig, deleteGig , getGigs , getGig } from '../controllers/gig.controllers.js'

const router = express.Router()

router.post('/',verifyToken,createGig)
router.delete('/:id',verifyToken,deleteGig)
router.get('/',verifyToken,getGigs)
router.get('/:id',verifyToken,getGig)




export default router