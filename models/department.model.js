import mongoose from "mongoose";
import {nanoid} from "nanoid";

const DepartmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        // unique:true,
        required:true
    },
    count:{
        type:Number,
    },
    parents: {
        type:Array
    },

});


// Defines the model that we will use in the app
const Department = mongoose.model('Department', DepartmentSchema);

export default Department