import express from 'express'
const cartRouter = express.Router()
import middlewareObject from "../middleware/authMiddleware.js";
import {Create,List,Read,RemoveAll,Reduce,RemoveSingle} from '../controller/cart.controller.js'
import runValidation from '../validators/index.js'


cartRouter.get('/add-to-cart/:id',Create)

cartRouter.get('/shopping-cart',Read)

cartRouter.get('/reduce/:id', Reduce)

cartRouter.get('/remove/all', RemoveAll)

cartRouter.get('/remove/:id', RemoveSingle)







// cartRouter.get('/list',List)
//
// cartRouter.get('/brand/:slug',Read)

export default cartRouter
