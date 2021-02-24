import Brand from "../models/brand.model.js";
import asyncHandler from "express-async-handler";
import _ from 'lodash'
import slugify from "slugify";

// name,slug,imagePath,description
export const Read = asyncHandler(async (req,res)=>{
    try{

        res.send({msg:"Read"})

    }
    catch (error) {
        throw new Error(`${error}`)
    }
})
export const List = asyncHandler(async (req,res)=>{
    try{
        const brands = await Brand.find({})
        if(!brands){
            throw new Error('thier is no brand')
        }
        res.send({'brands':brands})

    }
    catch (error) {
        throw new Error(`${error}`)
    }
})
export const Create = asyncHandler(async (req,res)=>{
    try{
        const {name,slug,imagePath,description} = req.body
        let brand = new Brand({})
        const NewSlug = slugify(slug)
        brand = _.extend(brand,{name,slug:NewSlug,imagePath,description})
        const newBrand = await brand.save()
        res.send({msg:'newBrand'})
    }
    catch (error) {
        throw new Error(`${error}`)
    }
})
export const RemoveAll = asyncHandler(async (req,res)=>{
    try{
        res.send({msg:'RemoveAll'})
    }
    catch (error) {
        throw new Error(`${error}`)
    }
})
export const RemoveSingle = asyncHandler(async (req,res)=>{
    try{
        res.send({msg:'RemoveSingle'})
    }
    catch (error) {
        throw new Error(`${error}`)
    }
})

