import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => {   
    console.log("Database is connected")
})
.catch((err) => {
    console.log(err)
})

const app = express();
app.use(express.json());

app.use(cookieParser)

app.listen(3000,()=>{
    console.log("server is runnning")
});

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
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

