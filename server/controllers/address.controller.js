import AddressModel from "../models/address.model.js";
import UserModel from '../models/user.model.js'
import auth from '../middleware/auth.js'

export const addAddressController = async (request , response) => {
    try {

        const userId = request.userId //middleware

        const { address_line , city , state , country , pincode , mobile } = request.body

        const createAddress = new AddressModel({
            address_line ,
            city,
            state,
            country,
            pincode,
            mobile,
            userId : userId
        })

        const saveAddress = await createAddress.save()

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId , {
            $push : {
                address_details : saveAddress._id
            }
        })

        return response.json({
            message : "Address Created Successfully",
            data : saveAddress,
            error : false,
            success : true
        })

        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getAddressDetails = async (request , response) => {
    try {
        
        const userId = request.userId 
        
        const data = await AddressModel.find( {userId : userId } ).sort({createdAt : -1 })
        
        return response.json({
            message : "List of address",
            data : data,
            error : false,
            success : true
        })

    } catch (error) {
       return response.status(500).json({
        message : ErrorEvent.message || error ,
        error : true,
        success : false
       })
    }
}

export const updateAddressController = async (request , response) => {
    try {

        const userId = request.userId
        const { _id , address_line , city, state, country, pincode, mobile} = request.body
        
        const updateAddress = await AddressModel.updateOne( { _id : _id , userId : userId} , {
            address_line , 
            city ,
            state , 
            country , 
            pincode , 
            mobile
        })

        return response.json({
            message : 'Address Updated Successfully',
            data : updateAddress, 
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteAddressController = async (request , response) => {
    try {

        const userId = request.userId

        const { _id } = request.body 

        const disableAddress = await AddressModel.updateOne({ _id : _id  , userId} , {
            status : false
        })

        return response.json({
            message : "Address remove",
            data : disableAddress,
            error : false,
            success : true
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}