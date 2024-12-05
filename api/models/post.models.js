import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            default:"https://www.shutterstock.com/image-photo/digital-technology-software-development-concept-600nw-2111828198.jpg"
        },
        category:{
            type:String,
            default:"uncategorized"
        },
        slug:{
            type:String,
            required:true,
            unique:true,
        },
    },{timestamps:true}
)

const Post = mongoose.model('Post',postSchema)

export default Post