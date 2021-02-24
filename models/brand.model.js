import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

// name,slug,imagePath,description
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
        unique:true
    },
    imagePath:{
        type:String
    },
    description:{
        type: String,
    }
});


// Defines the model that we will use in the app
const Brand = mongoose.model('Brand', BrandSchema);

export default Brand