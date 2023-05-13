
import User from '../models/user.model.js'
import { createError } from '../utils/createError.js'

export const deleteUser = async (req,res ,next)=>{



    const user =await User.findById(req.params.id)

    if(!user) return next(createError(401,'user does not exist'))

    if(req.userId !== user._id.toString()){
        return next(createError(401, 'you can delete your own account only'))
    }

    await User.findByIdAndDelete(req.params.id)
    res.status(201).send('deleted')



  

   

   

   

}