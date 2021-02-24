import {mainAuthorSendMailer} from '../config/mailer.js'
import asyncHandler from 'express-async-handler'
import Department from '../models/Department.model.js'
import dotenv from 'dotenv'
import _ from 'lodash'
import Product from '../models/product.model.js'
import slugify from "slugify";
dotenv.config()

export const Create = asyncHandler(async (req,res)=>{
    try{
        const {name,parent} = req.body
        console.log(parent);
        const departments = await Department.find({name})

        if(departments.length>0){
            throw new Error('there is a deparment')
        }
        const slug = slugify(name.toLowerCase())
        let newDepartment = await Department.create({
            name,
            slug
        })
        if(!newDepartment){
            throw new Error('canot create')
        }
        if(parent){
            // newDepartment.parents.push(parent)
            newDepartment.parents=parent
        }
        newDepartment = await newDepartment.save()
        res.send({newDepartment})
    }
    catch (e) {
        res.status(401)
        throw new Error(`${e}`)
    }
})


export const List = asyncHandler(async (req,res)=>{
    try{
        const departments = await Department.find({})

        if(departments.length==0){
            throw new Error('there is no department')
        }

        res.send({"departments":departments})
    }

    catch (e) {
        res.status(401)
        throw new Error(`${e}`)
    }
})

export const RemoveAll = asyncHandler(async (req,res)=>{
    try{
        const {deletedCount} = await Department.deleteMany({})

        res.send({"departments":`${deletedCount} items deleted`})
    }

    catch (e) {
        res.status(401)
        throw new Error(`${e}`)
    }
})

export const RemoveSingle = asyncHandler(async (req,res)=>{
    try{


    }

    catch (e) {
        res.status(401)
        throw new Error(`${e}`)
    }
})

export const readSingleDepartment = asyncHandler(async (req,res)=>{
    try{
        const pg = req.query.pg
        console.log(pg);
        const departments = await Department.find({parents:{$eq:[]}})
        if(!departments){
            throw new Error('no department')
        }
        res.json(departments)

    }

    catch (e) {
        res.status(401)
        throw new Error(`${e}`)
    }
})


export const readAllDepartment = asyncHandler(async (req,res)=>{
    try{
        const departments = await Department.find({parents:{$eq:[]}})
        if(!departments){
            throw new Error('no department')
        }
        res.send({msg:departments})

    }

    catch (e) {
        res.status(401)
        throw new Error(`${e}`)
    }
})

export const readAllDepartmentWithSub = asyncHandler(async (req,res)=>{
    try{
        const departments = await Department.find({parents:{$eq:[]}})

        const subMap = departments.map(d=>(
            {_id:d._id,name:d.name}
        ))

        let resi = []
        for (let {_id,name} of subMap) {
            const subCategory = [... await Department.find({parents:{$in:_id.toString()}})]
            resi.push({name:name,subCategory:subCategory})
        }

        if(!departments){
            throw new Error('no department')
        }

        res.json(resi)
    }
    catch (e) {
        res.status(401)
        throw new Error(`${e}`)
    }
})

export const departmentWithProduct = asyncHandler(async (req,res)=>{
    try{
        const q = req.params.slug.toString()
        const departments = await Department.findOne({slug:q})
        const products = await Product.find({department:departments._id})
        if(!departments){
            throw new Error('no category found')
        }
        res.json({departments, products})
    }
    catch (e) {
        res.status(401)
        throw new Error(`${e}`)
    }
})


















































