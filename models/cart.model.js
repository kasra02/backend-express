import mongoose from "mongoose";
import {nanoid} from "nanoid";

const CartSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            qty: {
                type: Number,
                default: 0,
            },
            price: {
                type: Number,
                default: 0,
            },
            name: {
                type: String,
            }
        },
    ],
    totalQty: {
        type: Number,
        default: 0,
        required: true,
    },
    totalCost: {
        type: Number,
        default: 0,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    }
},{
    timestamps:true
});


// Defines the model that we will use in the app
const Cart = mongoose.model('Cart', CartSchema);

export default Cart