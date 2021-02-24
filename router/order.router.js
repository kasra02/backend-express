import express from 'express'
const orderRouter = express.Router()
import {Create,List,Read,RemoveAll,RemoveSingle,updateOrderToPaid,updateOrderToDelivered,ListMy} from '../controller/order.controller.js'
import runValidation from '../validators/index.js'
import middlewareObject from "../middleware/authMiddleware.js";

orderRouter.post('/create',middlewareObject.isLoggedIn,Create)

orderRouter.get('/read/:id',middlewareObject.isLoggedIn,Read)

orderRouter.get('/update/:id/pay',middlewareObject.isLoggedIn,updateOrderToPaid)

orderRouter.get('/update/:id/deliever',middlewareObject.isLoggedIn,updateOrderToDelivered)

orderRouter.get('/list',middlewareObject.isAdmin,List)

orderRouter.get('/myorders',middlewareObject.isLoggedIn,ListMy)


export default orderRouter
