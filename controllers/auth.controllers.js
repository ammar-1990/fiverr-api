import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createError } from "../utils/createError.js";

export const register = async (req, res, next) => {
  
  const userExist = await User.findOne({username:req.body.username})
  if(userExist) return next(createError(401,'username already exists '))
  
  const exist = await User.findOne({email:req.body.email})
  if(exist) return next(createError(401,'email already exists '))
  
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    const token = jwt.sign({ id: req.body.id, isSeller: req.body.isSeller },process.env.JWT_KEY);
    const { password, ...info } = req.body;
    res.cookie('accessToken',token,{httpOnly:true}).status(200).send(info);
  } catch (err) {
   next(err)
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

 
    if (!user) return next(createError(404,'user does not exist'));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) return next(createError(404,'invalid username or password'))

    const token = jwt.sign({ id: user._id, isSeller: user.isSeller },process.env.JWT_KEY);

    const { password, ...info } = user._doc;

    res.cookie('accessToken',token,{httpOnly:true}).status(200).send(info);
  } catch (err) {
   next(err);
  }
};

export const logout = async (req, res) => {

    res.clearCookie('accessToken',{
        sameSite:'none',
        secure:'true'
    }).status(200).send('user logged out')
};
