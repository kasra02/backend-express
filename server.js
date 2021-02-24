import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import morgan from 'morgan'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import passport from './config/passport.js'
import path from 'path'
const MongoStore = connectMongo(session);
import cors from 'cors'
import connectDB from "./config/db.js";
import userRouter from "./router/user.router.js";
import departmentRouter from "./router/department.router.js";
import {errorHandler,notFound} from "./middleware/errorMiddleware.js";
import User from "./models/user.model.js";
import productRouter from './router/product.router.js'
import brandRouter from "./router/brand.router.js";
import cartRouter from "./router/cart.router.js";
import orderRouter from "./router/order.router.js";
import uploadsRouter from "./router/upload.router.js";
import testRouter from "./router/test.router.js";
import asyncHandler from "express-async-handler";

dotenv.config()
const app = express()
connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const __dirname = path.resolve()

app.use('/uploads',express.static(path.join(__dirname, 'uploads')))


if(process.env.NODE_ENV){
    app.use(morgan('dev'))
}

const sessionStore = new MongoStore({ mongooseConnection: mongoose.connection, collection: 'sessions' })
app.use(session({
    secret: process.env.SESSION_ID,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 30 * 60
    }
}));

passport.serializeUser(async function(user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(async function(id, cb) {
    try{
        const user = await User.findById(id)
        if(!user){
            return cb(new Error('user not found'))
        }
        cb(null,user)
    }
    catch (e) {
        cb(e)
    }
});

app.use(passport.initialize());
app.use(passport.session());




const apiRouter = express.Router()
app.use('/api',apiRouter)
apiRouter.use('/user',userRouter)
apiRouter.use('/product',productRouter)
apiRouter.use('/department',departmentRouter)
apiRouter.use('/brand',brandRouter)
apiRouter.use('/cart',cartRouter)
apiRouter.use('/order',orderRouter)
apiRouter.use('/uploads',uploadsRouter)
apiRouter.use('/test',testRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log('oaky')
})