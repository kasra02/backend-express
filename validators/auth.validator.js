import {check} from 'express-validator'

const userSignUpValidator = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('username is required'),
    check('email')
        .isEmail()
        .withMessage('must be a valid email address'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('password is required')
        .isLength({min:6})
        .withMessage('password must be at least 6 char long'),

]

const userAddressRegisterValidator = [
    check('shippingAddress')
        .not()
        .isEmpty()
        .withMessage('shippingAddress is required'),
]

const userSignUpTokenValidator = [
    check('token')
        .not()
        .isEmpty()
        .withMessage('token is required')
        .isJWT()
        .withMessage('token isHash'),
]

const userSignInValidator = [
    check('email')
        .exists()
        .withMessage('email is required')
        .isEmail()
        .withMessage('must be a valid email address'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('password is required')
        .isLength({min:6})
        .withMessage('password must be at least 6 char long'),

]

const forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
]
const resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({min:6})
        .withMessage('Password must be at least 6 characters long')
]


export {userAddressRegisterValidator,userSignUpValidator,userSignUpTokenValidator,userSignInValidator,forgotPasswordValidator,resetPasswordValidator}