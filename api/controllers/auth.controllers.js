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
    
        const token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin},process.env.JWT_SECRET)

        const {password: pass, ...rest} = validUser._doc // IT WILL HIDE THE PASSWORD WHEN TRYING TO FETCH THE DATA FROM THE MONGO DB
        res.status(200).cookie('access_token',token,{httpOnly: true}).json(rest)
    }
    catch (error) {
        next(error)
    }
}

// Google auth
export const google = async(req,res,next) => {
    const { email , name , googlePhotoUrl } = req.body
    try {
        const user = await User.findOne({email});
        // LOGIC IF THE USER EXISTS
        if(user) {
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET);
// IT SEPARATES THE PASSWORD AND THE REST ONE
           const {password , ...rest} = user._doc
            res.status(200).cookie('access_token', token , {
                httpOnly:true
            }).json(rest);
        }
// IF THE USER DOESNOT EXIST THEN
        else {
            // we have to create some random passwords because in user schema password is required
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            // hashed the password
            const hashedPassword = bcryptjs.hashSync(generatePassword,10);
            const newUser = new User({
                // by doing toLOwecase ------   it coverts Ayush Anshuli to ayushanshuli78412   because the username exist a unique name
                username : name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture : googlePhotoUrl,
            })
            await newUser.save();
            const token = jwt.sign({id:newUser._id, isAdmin: user.isAdmin},process.env.JWT_SECRET)
            const {password , ...rest} = newUser._doc

            res.status(200).cookie('access_token',token,{
                httpOnly:true
            }).json(rest)
        }
    } catch (error) {
        next(error)
    }
}



