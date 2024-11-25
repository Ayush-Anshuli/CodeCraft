import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import { errorHandle } from "../utils/error.js";
import jwt from 'jsonwebtoken'
export const signup = async (req,res,next) => {
    const {username , email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === '' ) {
        // created a util folder which handles the error
        next(errorHandle(400, "All fields are required"))
    }

    const hashedPassword = bcryptjs.hashSync(password,10)

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    try {
        await newUser.save();
        res.json({message :"Signup successfull"})
    } catch (error) {
        next(error)
    }
}

// SIGN IN API ROUTE
export const signin = async (req,res,next) => {
    const {email , password} = req.body;
    if(!email || !password || email === '' || password === '' ) {
        next(errorHandle(400, 'All fields are required'))
    }

    try {
        const validUser = await User.findOne({email})
        if(!validUser) {
           return next(errorHandle(404, 'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) {
            return next(errorHandle(404,'Invalid Password'))
        }
        // If cedentials are correct then we sigin the user for that we are using jwt
    
        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET)
        const {password: pass, ...rest} = validUser._doc // IT WILL HIDE THE PASSWORD WHEN TRYING TO FETCH THE DATA FROM THE MONGO DB
        res.status(200).cookie('access_token',token,{httpOnly: true}).json(rest)
    }
    catch (error) {
        next(error)
    }
}