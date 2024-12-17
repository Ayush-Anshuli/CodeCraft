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

// GET POST API ROUTE

export const getposts = async(req,res,next) => {
    try {
        const startindex = parseInt(req.query.startindex) || 0  //This tells that which post should start fetching
        const limit = parseInt(req.query.limit) || 9  //This sets first 9 card then show more 9 inshort we will use this to fetch the data on the limited order
        const sortdirection = req.query.order === 'asc' ? 1 : -1     //sort on the basis of ascending and descending order

        const posts = await Post.find({
            ...(req.query.userId && {userId: req.query.userId}),   // user can search results on the basis of userId
            ...(req.query.category && {category:req.query.category}), // user can search results on the basis of category
            ...(req.query.slug && {slug:req.query.slug}),     //  user can search results on the basis of slug
            ...(req.query.postId && {_id:req.query.postId}),    //user can search results on the basis of postID

            ...(req.query.searchTerm && {                          // user can search on the basis of TITLE or from the CONTENT the post
                $or :[
                    {title:{$regex:req.query.searchTerm, $options:'i'}},    /*Regex (short for Regular Expression) is a powerful tool used
                                                                            for searching, matching, and manipulating text based on specific patterns.
                                                                            It is widely used in programming, text processing, and data validation tasks.*/
                    {content:{$regex: req.query.searchTerm,$options:'i'}}
                ],
            }),
        }).sort({updatedAt:sortdirection}).skip(startindex).limit(limit)  // this will sort on the basis of the limits index and direction order

        const totlpost = await Post.countDocuments() //This will give you the total number p=of posts
        const now = new Date()
       //from this we can get total post in a month 
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastmonthpost = await Post.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })

        res.status(200).json({
            posts,
            totlpost,
            lastmonthpost
        })

    } catch (error) {
        next(error)
    }
}

// DELETE API ROUTE
export const deletepost = async(req,res,next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandle(403,'You are not allowed to delete this post'))
    }
    try{
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json('Post has been deleted')
    }
    catch(error) {
        next(error)
    }
}

// update post

export const updatepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandle(403, 'You are not allowed to update this post'));
    }
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  };