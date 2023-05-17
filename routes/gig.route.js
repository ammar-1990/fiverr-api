import express from 'express'
import { verifyToken } from '../middleware/jwt.js'

import { createGig, deleteGig , getGigs , getGig, getManyGigs } from '../controllers/gig.controllers.js'

const router = express.Router()

router.post('/',verifyToken,createGig)
router.delete('/:id',verifyToken,deleteGig)
router.get('/',getGigs)
router.get('/many',getManyGigs)
router.get('/:id',getGig)





export default router