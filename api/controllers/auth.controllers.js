import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import { errorHandle } from "../utils/error.js";


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