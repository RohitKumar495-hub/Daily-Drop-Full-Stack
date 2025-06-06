import ProductModel from '../models/product.model.js'

export const createProductController = async (request , response) => {
    try {

        const { name , image , category , subCategory , unit , stock , price , discount , description , more_fields } = request.body

        if(!name || !image[0] || !category[0] || !subCategory[0] || !unit || !price || !description ){
            return response.status(400).json({
                message : "Enter requried fields",
                error : true,
                success : false
            })
        }

        const product = new ProductModel({
            name , 
            image , 
            category , 
            subCategory , 
            unit , 
            stock , 
            price , 
            discount , 
            description , 
            more_fields
        })

        const saveProduct = await product.save()

        return response.json({
            message : "Product Created Successfully",
            data : saveProduct,
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

export const getProductController = async (request , response) => {
    try {

        let { page , limit , search } = request.body

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}
        
        const skip = (page - 1) * limit
        
        const [data , totalCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil(totalCount / limit),
            data : data
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductByCategory = async (request , response) => {
    try {

        const { id } = request.body

        if(!id){
            return response.status(400).json({
                message : "Provide category id",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.find({
            category : {$in : id}
        }).limit(15)

        return response.json({
            message : "Category Product list",
            data : product,
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

export const getProductByCategoryAndSubCategory = async (request , response) => {
    try {

        const { categoryId , subCategoryId , page , limit } = request.body

        if(!categoryId || !subCategoryId){
            return response.status(400).json({
                message : "Provide categoryId and subCategoryId",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = {
            category : {$in : categoryId},
            subCategory : {$in : subCategoryId} 
        }

        const skip = (page - 1) * limit

        const [data , dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : 'Product list',
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
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

export const getProductDetails = async (request , response) => {
    try {

        const { productId } = request.body

        if(!productId) {
            return response.json({
                message : "Pls provide productId",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.findOne({ _id : productId })

        return response.json({
            message : "product details",
            data : product,
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

export const updateProductDetails = async (request , response) => {
    try {

        const { _id } = request.body

        if(!_id) {
            return response.status(400).json({
                message : "Provide product id",
                error : true,
                success : false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id : _id} , {
            ...request.body
        })

        return response.json({
            message : "Updated Successfully",
            data : updateProduct,
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

export const deleteProductDetails = async (request , response) => {
    try {

        const { _id } = request.body

        if(!_id) {
            return response.status(400).json({
                message : "Pls provide id",
                error : true,
                success : false
            })
        }

        const deleteProduct = await ProductModel.findByIdAndDelete({ _id : _id })

        return response.json({
            message : "Deleted Successfully",
            data : deleteProduct,
            error : false,
            success : true
        })
        
    } catch (error) {
        return response.status(500).json(
            {
                message : error.message || error,
                error : true,
                success : false
            }
        )
    }
}

export const searchProduct = async (request , response) => {
    try {

        let { search , page , limit }  = request.body

        if(!page) {
            page = 1
        }

        if(!limit) {
            limit = 12
        }

        const query = search ? {
            $text : {
                $search : search 
            }
        } : {}

        const skip = (page - 1)*limit

        const [data , dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt : -1 }).skip(skip).limit(limit).populate('category  subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
           message : "Product data",
           data : data,
           totalCount : dataCount,
           page : page,
           limit : limit,
           totalPage : Math.ceil(dataCount/limit), 
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