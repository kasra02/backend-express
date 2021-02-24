import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";
import _ from 'lodash'
import slugify from "slugify";


export const Read = asyncHandler(async (req,res)=>{
    try{

        res.send({"Read"})

    }
    catch (error) {
        throw new Error(`${error}`)
    }
})




export const List = asyncHandler(async (req,res)=>{
    try{

        res.send({msg:"List"})

    }
    catch (error) {
        throw new Error(`${error}`)
    }
})

export const Create = asyncHandler(async (req,res)=>{
    try{

        res.send({msg:'Create'})
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

