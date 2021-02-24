import express from 'express'
const userRouter = express.Router()
import {AddressAder,Login,Profile,Register,PreRegister,forgotPassword,resetPassword,} from '../controller/user.controller.js'
import passport from "../config/passport.js";

import {userSignUpValidator,userAddressRegisterValidator,userSignInValidator,userSignUpTokenValidator} from '../validators/auth.validator.js'
import runValidation from '../validators/index.js'
import middlewareObject from "../middleware/authMiddleware.js";


userRouter.post('/register-activation',
    [middlewareObject.isNotLoggedIn, userSignUpValidator, runValidation],
    PreRegister)
userRouter.post('/register',
    [middlewareObject.isNotLoggedIn, userSignUpTokenValidator, runValidation]
    ,Register)

userRouter.post('/login',
    [middlewareObject.isNotLoggedIn,userSignInValidator,runValidation,passport.authenticate('local')],
     Login)
userRouter.post('/address-register',
    [middlewareObject.isLoggedIn,userAddressRegisterValidator,runValidation]
    ,AddressAder)
userRouter.post('/forgot-password',forgotPassword)
userRouter.post('/reset-password',resetPassword)
userRouter.get('/me', Profile)


export default userRouter