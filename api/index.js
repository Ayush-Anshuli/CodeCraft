import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import commentRoutes from './routes/comment.route.js';

import cors from 'cors'
import cookieParser from "cookie-parser";
import postRoutes from './routes/post.route.js'
import path from 'path'
dotenv.config()  // dotenv.config() reads a .env file, parses its contents,
                //  and assigns it to the process.env object. 
                //It returns an object with a parsed key containing the loaded 
                //content or an error key if it failed

mongoose.connect(process.env.MONGO)
.then(() => {   
    console.log("Database is connected")
})
.catch((err) => {
    console.log(err)
})

const __dirname = path.resolve();  //WE ARE WRITING THIS SO WE CAN RENDER THE PROJECT

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("server is runnning")
});

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/post',postRoutes)
app.use('/api/comment', commentRoutes);

// {  THIS WE ARE USING BECAUSE WE CAN DEPLOY THE FULL STACK PROJECT ON RENDER

app.use(express.static(path.join(__dirname , '/client/dist')))
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
// }


app.use(cors)

// MIDDLEWARES
app.use((error , req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server problem"
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

