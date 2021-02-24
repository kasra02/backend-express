import express from 'express'
const productRouter = express.Router()
import {Create,List,Read,RemoveAll,RemoveSingle,readSingleDepartment,UpdateQty,UpdateStatus} from '../controller/product.controller.js'
import runValidation from '../validators/index.js'
import middlewareObject from "../middleware/authMiddleware.js";

productRouter.route('/create').post(middlewareObject.isAdmin,Create)

productRouter.route('/list').get(List)

productRouter.route('/read/:slug').get(Read)

productRouter.put('/update/qty/:productId',middlewareObject.isAdmin,UpdateQty)

productRouter.put('/update/status/:productId',middlewareObject.isAdmin,UpdateStatus)

export default productRouter
