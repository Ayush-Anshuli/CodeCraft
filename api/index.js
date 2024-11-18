import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
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


app.listen(3000,()=>{
    console.log("server is runnning")
});

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

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