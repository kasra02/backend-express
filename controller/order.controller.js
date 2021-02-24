import Order from "../models/order.model.js";
import Cart from '../models/cart.model.js'
import asyncHandler from "express-async-handler";
import _ from 'lodash'
import slugify from "slugify";
import Product from "../models/product.model.js";


export const Read = asyncHandler(async (req, res) => {
    const order = await Order.findOne({user:req.user._id})
        .populate('user', 'name email')
    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})






// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const List = asyncHandler(async (req, res) => {
    const {limit,skip} = _.isEmpty(req.query) ? {limit:10,skip:0}  : req.query;
    try {
        const orders = await Order.find({})
            .limit(parseInt(limit))
            .skip(parseInt(skip))
        if(!orders){
            throw new Error('their is no order :) ')
        }
        res.json(orders)

    } catch (error) {
        throw new Error(`${error}`)
    }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private/User
export const ListMy = asyncHandler(async (req, res) => {
    const {limit,skip} = _.isEmpty(req.query) ? {limit:10,skip:0}  : req.query;
    try {
        const orders = await Order.find({user:req.user._id})
            .limit(parseInt(limit))
            .skip(parseInt(skip))
        if(!orders){
            throw new Error('their is no order :) ')
        }
        res.json(orders)

    } catch (error) {
        throw new Error(`${error}`)
    }
})

export const RemoveSingle = asyncHandler(async (req, res) => {
    try {
        res.send({msg: 'RemoveSingle'})
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export const Create = asyncHandler(async (req, res) => {

    try {
        const user = req.user
        if(_.isEmpty(user.shippingAddress)){
            throw new Error('shipping address is vital')
        }
        console.log(user);
        const cart = await Cart.findOne({user: req.user._id})
        if(!cart){
            throw new Error('no cart')
        }
        const orderItems = cart.items
        const shippingAddress = user.shippingAddress
        const itemsPrice = parseInt(cart.totalCost)
        const taxPrice = (itemsPrice * 10)
        const shippingPrice = 10
        const totalPrice = parseInt(itemsPrice) + shippingPrice + parseInt(taxPrice)

        for(let item of  orderItems) {
            const qty = item.qty
            const productId = item.productId
            const product = await Product.findOne({_id: productId}).select('countInStock')
            product.countInStock -= qty
            if(product.countInStock<=0){
                throw new Error('no quatity')
            }
            const newProduct = await product.save()
        }

        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()

        if(createdOrder){
            await cart.remove()
        }

        res.status(201).json(createdOrder)

    }

    catch (error) {
    throw new Error(`${error}`)
    }
})


export const updateOrderToPaid = asyncHandler(async(req,res)=>{
    try{
        const order = await Order.findOne({_id:req.params.id})
        if(!order){
            throw new Error('there is no order')
        }
        if(order){
            order.isPaid = true
            order.paidAt = Date.now()

            const updatedOrder = await order.save()
            if(!updatedOrder){
                throw new Error('cannot update')
            }
            res.json(updatedOrder)
        }
    }
    catch (e) {
        res.status(404)
        throw new Error(`${e} with updating order to pay`)
    }
})

export const updateOrderToDelivered  = asyncHandler(async(req,res)=>{
    try{
        const order = await Order.findOne({_id:req.params.id})
        if(!order){
            throw new Error('there is no order')
        }
        if(!order.isPaid){
            throw new Error('order should be paid before send')
        }
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        if(!updatedOrder){
            throw new Error('can not update order to deliever')
        }

        res.json(updatedOrder)
    }
    catch (e) {
        res.status(404)
        throw new Error(`${e} with updating order to pay`)
    }
})



export const RemoveAll = asyncHandler(async (req, res) => {
    try {
        res.send({msg: 'RemoveAll'})
    } catch (error) {
        throw new Error(`${error}`)
    }
})


