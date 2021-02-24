import {mainAuthorSendMailer} from '../config/mailer.js'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import _ from 'lodash'
import expressJwt from 'express-jwt'
dotenv.config()

export const Register = asyncHandler(async (req,res)=>{
    try{
        const { token } = req.body
        const {username,email,password} = jwt.verify(token,process.env.JWT_ACCOUT_ACTIVATION)
        const user = await User.findOne({email})
        if(user){
            res.status(403)
            throw new Error('there is uesr with email')
        }
        const newUser = await User.create({
            username,email,password
        })
        if(!newUser){
            res.status(403)
            throw new Error('something went wrong with saving')
        }
        res.send({
            email
        })


    }
    catch (e) {
        res.status(401)
        throw new Error(`${e}`)
    }
})


export const PreRegister = asyncHandler(async (req,res)=>{
    try{
        const {username,email,password} = req.body
        const user = await User.findOne({email:email})
        if(user){
            res.status(403)
            throw new Error('user exist with this email')
        }
        const token = jwt.sign({username,email,password},process.env.JWT_ACCOUT_ACTIVATION,{expiresIn: '1d'})
        res.json(token)
    }
    catch (error) {
        res.status(401)
        throw new Error(`${error}`)
    }
})

export const AddressAder = asyncHandler(async (req,res)=>{
    try{
        const {shippingAddress} = req.body
            console.log(req.user)
        let user = await User.findOne({_id:req.user._id})
        if(!user){
            throw new Error('no user')
        }
        user.shippingAddress = shippingAddress
        const newUser = await user.save()
        res.send({success:true,'address':shippingAddress})
    }
    catch (error) {
        res.status(401)
        throw new Error(`${error}`)
    }
})

export const forgotPassword = asyncHandler(async (req,res)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(404)
            throw new Error('no user is found')
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_RESET_PASSWORD,{expiresIn: '10m'})
        user.resetPasswordLink=token
        const updatedUser = await user.save()
        if(!updatedUser){
            res.status(404)
            throw new Error('try again')
        }
        res.send({"token":token})
    }
    catch (error) {
        res.status(401)
        throw new Error(`${error}`)
    }
})

export const resetPassword = asyncHandler(async (req,res)=>{
    try{
        const {resetPasswordLink,newPassword} = req.body
        if(!resetPasswordLink){
            res.status(403)
            throw new Error('it should be there')
        }
        let user = await User.findOne({resetPasswordLink:resetPasswordLink.toString()})

        if(!user){
            res.status(404)
            throw new Error('no user is found')
        }
        const updatedFields = {
            password:newPassword,
            resetPasswordLink:''
        }
        user = _.extend(user,updatedFields)
        const newUser = await user.save()
        res.send(newUser)
    }
    catch (error) {
        res.status(500)
        throw new Error(`${error.message}`)
    }
})


export const Login = asyncHandler(async (req,res)=>{

    try{
        const token = jwt.sign({_id:req.user._id,role:req.user.role},process.env.JWT_SECRET,{ algorithm: 'HS256' ,expiresIn: '1d'})
        res.send({token:token})
    }
    catch (e) {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})




export const Profile = asyncHandler(async (req,res)=>{
        if(req.isAuthenticated()){
            return res.send(req.user);
        }
        res.send('alaskdfljkl');
})