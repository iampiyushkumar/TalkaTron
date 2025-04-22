import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import path from "path";
import cors from 'cors';
import messageRoute from "./routes/message.route.js";
import {app,server} from './SocketIO/server.js';





dotenv.config();
app.use(express.json());




app.use(cookieParser());
app.use(cors({
    origin:"https://talka-tron.vercel.app/login",  // Allow frontend
    methods: ["GET", "POST"],
    credentials: true
}));

const PORT=process.env.PORT||5000;
const URI=process.env.MONGODB_URI;
try{
   mongoose.connect(URI)
   console.log("MongoDB connected");
}catch(error){
    console.log('Error:',error);
}


app.use("/api/user",userRoute);

app.use("/api/message",messageRoute);

//------------------Code for deployment lets write--------------


if(process.env.NODE_ENV==='production'){
     const dirPath=path.resolve();
     app.use(express.static("/Frontend/dist"));
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"));
        });
}







server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
