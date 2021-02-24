import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String
    },
    brand:{
        type:ObjectId,
        ref:'Brand'
    },
    productDetailEssential:[
        {
            name:String,
            value:String
        }
    ],
    productDetailTable:[
        {
            name:String,
            value:String
        }
    ],
    about:[
        {
            type:String
        }
    ],
    body:{
        type:String
    },
    mTitle:{
        type:String
    },
    mDesc:{
        type:String
    },
    mKeywords:{
        type:String
    },
    image: {
        type: String,
    },
    imageAssets: [
        {
            type:String
        }
    ],
    rating: {
        type: Number,
        default: 5,
    },
    numReviews: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        default: 0,
    },
    countInStock: {
        type: Number,
        default: 0,
    },
    status:{
        type:String,
        enum:['onSale','stopSale','callUs'],
        default:'onSale'
    },
    department:{
        type:ObjectId,
        ref:'Department'
    }
},{
    timestamps: true,
});


// Defines the model that we will use in the app
const Product = mongoose.model('Product', ProductSchema);

export default Product