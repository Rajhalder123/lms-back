import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js"
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js"
import errorMiddleware from "./middleware/error.middleware.js";
import miscRoutes from './routes/miscellaneous.routes.js';
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
origin: process.env.FRONTEND_URL ,
credentials: true
}));
// app.use(cors({
//     origin: '*',
//     credentials: true,
//   }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/ping',function(req,res){
    res.send('/pong');
});

///routes of three module
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/courses',courseRoutes);
app.use('/api/v1/payments',paymentRoutes);
app.use('/api/v1', miscRoutes);

app.all('*',(req,res)=>{
    res.status(404).send('OOPS! 404 page not found')
});

app.use(errorMiddleware);

export default app;