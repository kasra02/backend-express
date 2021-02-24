import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";
import Cart from '../models/cart.model.js'


// create products array to store the info of each product in the cart
async function productsFromCart(cart) {
    let products = []; // array of objects
    for (const item of cart.items) {
        let foundProduct = (
            await Product.findById(item.productId).populate("category")
        ).toObject();
        foundProduct["qty"] = item.qty;
        foundProduct["totalPrice"] = item.price;
        products.push(foundProduct);
    }
    return products;
}


export const Read = asyncHandler(async (req, res) => {
    try {
        let cart_user
        if(req.user){
            cart_user = await Cart.findOne({user:req.user._id})
        }
        if(req.user && cart_user){
            req.session.cart = cart_user
            return res.send({cart:cart_user})
        }

        if (!req.session.cart) {
            throw new Error('cart is empty')
        }

        if(req.session.cart){
            const cart = req.session.cart
            const products = await productsFromCart(req.session.cart)
            return res.send({cart:cart,products:products})
        }

    } catch (error) {
        throw new Error(`${error}`)
    }
})

export const List = asyncHandler(async (req, res) => {
    try {

        res.send({msg: "List"})

    } catch (error) {
        throw new Error(`${error}`)
    }
})

export const Create = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id
        let user_cart;
        if (req.user) {
            user_cart = await Cart.findOne({user: req.user._id});
        }
        let cart;
        if ((req.user && !user_cart && req.session.cart) || (!req.user && req.session.cart)) {
            cart = await new Cart(req.session.cart);
        } else if (!req.user || !user_cart) {
            cart = new Cart({});
        } else {
            cart = user_cart
        }

        const product = await Product.findById(productId);

        const itemIndex = cart.items.findIndex((p) => p.productId == productId)

        if (itemIndex > -1) {
            if(parseInt(cart.items[itemIndex].qty+1) <= parseInt(product.countInStock)){
                cart.items[itemIndex].qty += 1
                cart.items[itemIndex].price = cart.items[itemIndex].qty * product.price
                cart.totalQty++;
                cart.totalCost += product.price;
            }else{
                throw new Error('no quatity')
            }
        }
        else {
            cart.items.push({
                productId: productId,
                qty: 1,
                price: product.price,
                name: product.name
            })
            cart.totalQty += 1
            cart.totalCost += product.price
        }
        if (req.user) {
            cart.user = req.user._id
            const saveCart = await cart.save();

        }
        req.session.cart = cart
        res.send({msg: cart})
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export const Reduce = asyncHandler(async (req, res) => {

    try {
        const productId = req.params.id
        let cart
        if(req.user){
            cart = await Cart.findOne({user:req.user._id})
        }
        else if(req.session.cart){
            cart = await new Cart(req.session.cart)
        }
        const itemIndex = cart.items.findIndex((p) => p.productId == productId)

        if(itemIndex>-1){
            const product = await Product.findById(productId);
            cart.items[itemIndex].qty -= 1
            cart.items[itemIndex].price -= product.price
            cart.totalQty -- ;
            cart.totalCost -= product.price;
            if(cart.items[itemIndex].qty <= 0 ){
                await cart.items.remove({_id:cart.items[itemIndex]._id})
            }
            req.session.cart = cart;
            if (req.user) {
                await cart.save();
            }
            if(cart.totalQty <= 0){
                req.session.cart = null;
                await Cart.findByIdAndRemove(cart._id)
            }
        }
        res.send({msg:cart})
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export const RemoveSingle = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id
        let cart;
        if(req.user){
            cart = await Cart.findOne({ user: req.user._id });
        }
        else{
            cart = await new Cart(req.session.cart);
        }

        if(cart == null ){
            throw new Error('cart is empty')
        }

        let itemIndex = cart.items.findIndex((p) => p.productId == productId);

        if(itemIndex>-1){
            //find the product to find its price
            cart.totalQty -= cart.items[itemIndex].qty;
            cart.totalCost -= cart.items[itemIndex].price;
            await cart.items.remove({_id:cart.items[itemIndex]._id})
        }
        req.session.cart = cart;
        if (req.user) {
            await cart.save();
        }
        if(cart.totalQty<=0){
            req.session.cart = null;
            await Cart.findByIdAndRemove(cart._id);
        }
        res.send({msg: cart})
    } catch (error) {
        throw new Error(`${error}`)
    }
})

export const RemoveAll = asyncHandler(async (req, res) => {
    try {
        let cart
        if(req.user){
            cart = await Cart.findOne({user:req.user._id})
        }
        else if(req.session.cart){
            cart = await new Cart(req.session.cart)
        }
        if(!cart){
            throw new Error('there is not cart')
        }

        const cartDeleted = await Cart.remove({_id:cart._id})

        req.session.cart = null

        res.send({msg: 'RemoveAll'})
    } catch (error) {
        throw new Error(`${error}`)
    }
})





