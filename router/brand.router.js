import express from 'express'
const brandRouter = express.Router()
import {Create,List,Read,RemoveAll,RemoveSingle} from '../controller/brand.controller.js'
import runValidation from '../validators/index.js'
import middlewareObject from "../middleware/authMiddleware.js";

brandRouter.post('/create',Create)

brandRouter.get('/list',List)

brandRouter.get('/brand/:slug',Read)

export default brandRouter
