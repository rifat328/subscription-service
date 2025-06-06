import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
// import Routers 
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

//import database connect
import connectToDatabase from './DATABASE/mongodb.js'
// middleware for error check
import errorMiddleware from "./middlewares/error.middleware.js"; //for error check
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";


const app=express();
    // built in middleware
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(cookieParser());

    app.use(arcjetMiddleware);

    //Routes and Router
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflows', workflowRouter)

// error middleware
app.use(errorMiddleware);

app.get('/',(reg, res)=>{
    res.send("Welcome to mini commerce")
})

app.listen(PORT, async ()=>{
    console.log(`mini Commerce is running on port : http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;
