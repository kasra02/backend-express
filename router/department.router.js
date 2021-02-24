import express from 'express'

import {Create,List,RemoveAll,RemoveSingle,departmentWithProduct,readAllDepartment,readSingleDepartment,readAllDepartmentWithSub} from '../controller/department.controller.js'
import passport from "../config/passport.js";
// import {userSignUpValidator,userSignInValidator} from '../validators/auth.validator.js'
import runValidation from '../validators/index.js'

const departmentRouter = express.Router()

departmentRouter.get('/list', List)

departmentRouter.post('/create', Create)

departmentRouter.delete('/all', RemoveAll)

departmentRouter.get('/get-alldepartments', readAllDepartment)

departmentRouter.get('/get-alldepartments-with-sub', readAllDepartmentWithSub)

departmentRouter.get('/get-category-page/:slug', departmentWithProduct)

departmentRouter.get('/get-department', readSingleDepartment)

export default departmentRouter