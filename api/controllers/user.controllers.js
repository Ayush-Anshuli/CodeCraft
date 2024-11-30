import {errorHandle} from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.models.js'

export const test =  (req,res) => {
    res.json({message : "API is working"})
}

export const updateUser = async (req,res,next) => {
    // First we have to verify that user is signeed in by using the tokens
    // Create the verify.js file and get the tokens
    // install cookie-parser

    // console.log(req.user)
    if(req.user.id != req.params.userId) {
        return next(errorHandle(403,'You are not allow to update this user'))
    }
    if(req.body.password) {
        if(req.body.password.length < 6) {
            return next(errorHandle(400,'Password must be at least 6'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10)
    }

    if(req.body.username) {
        if(req.body.username.includes(' ')) {
            return next(errorHandle(400,'Username cannot contain spaces'))
        }
        if(req.body.username != req.body.username.toLowerCase()) {
            return (next(errorHandle(400),'Username must be lowercase'))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return (next(errorHandle(400,'Username can only contains letters and number')))
        }

        try {
            const updateUser = await User.findByIdAndUpdate(req.body.userId, {
                // By doing this I am only able to udate these things
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                    password:req.body.password
                }
            },{new: true})//new true -> sets the new information
            const {password, ...rest} = updateUser._doc
            res.status(200).json(rest)
        } catch (error) {
            next(error)
        }
    }

}