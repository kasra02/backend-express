import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";
import _ from 'lodash'
import slugify from "slugify";
import smartTrim from "../helpers/blog.js";
import {stripHtml} from 'string-strip-html'


const trimmedBody = (body,num) =>( stripHtml(body.substring(0, num)).result)


export const Read = asyncHandler(async (req,res)=>{
    try{
        const product = await Product.findOne({slug:req.params.slug})
        if(!product){
            throw new Error('no product')
        }
        res.send({"product":product})

    }
    catch (error) {
        throw new Error(`${error}`)
    }
})




export const List = asyncHandler(async (req,res)=>{
    try{
        const product = await Product.find({})
            .populate('brand','name')

        res.send({'product':product})

    }
    catch (error) {
        throw new Error(`${error}`)
    }
})

export const Create = asyncHandler(async (req,res)=>{
    try{
        const {productDetailTable,name,Rkeywords,
            productDetailEssential,brand,
            Rslug,countInStock,price,imageAssets,image,rating,department,
            about,RTitle,RDesc,body} = req.body

        let newProduct = await Product.create({})

        const slug = slugify(Rslug)


        // meta stuff
        const mTitle = RTitle ? RTitle : smartTrim(name,60,'','...')
        const mDesc = RDesc ? RDesc : trimmedBody(body,150)
        const mKeywords = Rkeywords

        // extending create object with new values from req.body
        const product = _.extend(newProduct,{productDetailEssential,productDetailTable,
            name, slug, brand, about,countInStock,price,imageAssets,image,rating, mTitle, mDesc,department, mKeywords})

        // saving to db
        const Nproduct = await product.save()

        if(!Nproduct){
            throw new Error('something is wrong with saving')
        }

        res.send({"product":Nproduct})
    }
    catch (error) {
        throw new Error(`${error}`)
    }
})

export const UpdateQty = asyncHandler(async (req,res)=>{
    try{
        const {qty} = req.body
        const {productId} = req.params
        const product = await Product.findById(productId).select('countInStock')
        if(!product){
            throw new Error('no product found')
        }
        product.countInStock += qty
        await product.save()
        res.send({msg:'added'})
    }
    catch (error) {
        throw new Error(`${error}`)
    }
})

export const UpdateStatus = asyncHandler(async (req,res)=>{
    try{
        const {status} = req.body
        const {productId} = req.params
        const product = await Product.findById(productId).select('status')
        if(!product){
            throw new Error('no product found')
        }
        product.status = status
        await product.save()
        res.send({msg:'updated'})
    }
    catch (error) {
        throw new Error(`${error}`)
    }
})

export const RemoveAll = asyncHandler(async (req,res)=>{
    try{
        res.send({msg:'error'})
    }
    catch (error) {
        throw new Error(`${error}`)
    }
})
export const RemoveSingle = asyncHandler(async (req,res)=>{
    try{
        res.send({msg:'error'})
    }
    catch (error) {
        throw new Error(`${error}`)
    }
})
export const readSingleDepartment = asyncHandler(async (req,res)=>{
    try{
        res.send({msg:'error'})
    }
    catch (error) {
        throw new Error(`${error}`)
    }
})
