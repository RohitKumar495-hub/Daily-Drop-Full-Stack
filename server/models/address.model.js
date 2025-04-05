import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line : {
        type : String,
        default : ""
    },
    city : {
        type: String,
        default : ""
    },
    state : {
        type : String,
        default : ""
    },
    pincode : {
        type : String,
        default : ""
    },
    country : {
        type : String,
        default : ""
    },
    mobile : {
        type : Number,
        default : null
    },
    status : {
        type : Boolean,
        default : true
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        default : ""
    }

} , {
    timestamps : true
})

const addressModel = mongoose.model('address' , addressSchema)

export default addressModel;