import Post from "../models/post.models.js"
import { errorHandle } from "../utils/error.js"

export const create = async (req,res,next) => {
    if(!req.user.isAdmin) {
        return next(errorHandle(401,'You are not allowed to create a post'))
    }
    if(!req.body.title || !req.body.content) {
        return next(errorHandle(400,'Please provide all required fields'))
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-p-]/g,'-')
    const newPost = new Post({
        ...req.body,
        slug,
        userId:req.user.id
    })

    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        next(error)
    }

}