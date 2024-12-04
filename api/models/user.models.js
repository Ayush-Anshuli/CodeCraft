import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    profilePicture : {
        type:String,
        // If user profile doesnot exist then default will be shown
        default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{timestamps:true}    //IT SHOWS TIME OF CREATION AND UPDATE
)

const User = mongoose.model('User',userSchema);

export default User;