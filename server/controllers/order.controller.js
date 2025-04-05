import OrderModel from '../models/order.model.js'
import CartProductModel from '../models/cartProduct.model.js'
import mongoose from 'mongoose'
import UserModel from '../models/user.model.js'
import Stripe from '../config/stripe.js'


export const PriceWithDiscount = (price , dis = 1) => {
    const discountAmount = Math.ceil(( Number(price) * Number(dis) )/ 100)
    const actualPrice = Number(price) - Number(discountAmount)
    return actualPrice
}

export async function cashOnDeliveryController(request , response) {
    try {

        const userId = request.userId
        
        const { list_items , totalAmt , addressId , subTotalAmt  } = request.body

        if(!list_items || !totalAmt || !addressId || !subTotalAmt) {
            return response.status(400).json({
                message : "Please enter necesseary details",
                error : true,
                success : false
            })
        }

        const payload = list_items.map(el => {
            return ({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id,
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image,
                },
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId,
                subTotalAmt : subTotalAmt,
                totalAmt : totalAmt 
            })
        })

        const generateOrder = await OrderModel.insertMany(payload)

        // remove from the cart
        const removerCartItems = await CartProductModel.deleteMany({userId : userId})
        const updateInUser = await UserModel.updateOne({_id : userId} , {
            shopping_cart : []
        })

        return response.json({
            message : "Order Succesfully",
            data : generateOrder,
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

export async function paymentController(request , response) {
 try {

    const userId = request.userId // auth middleware

    const { list_items , totalAmt , addressId , subTotalAmt  } = request.body

    const user = await UserModel.findById(userId)

    const line_items = list_items.map(item => {
        return {
            price_data : {
                currency : 'inr',
                product_data : {
                    name : item.productId.name,
                    images : item.productId.image[0],
                    metadata : {
                        productId : item.productId._id
                    }
                },
                unit_amount : PriceWithDiscount(item.productId.price , item.productId.discount) * 100
            },
            adjustable_quantity : {
                enabled : true,
                minimum : 1
            },
            quantity : item.quantity
        }
    })

    const params = {
        submit_type : 'pay',
        mode : 'payment',
        payment_method_types : ['card'],
        customer_email : user.email,
        metadata : {
            userId : userId,
            addressId : addressId 
        },
        line_items : line_items,
        success_url : `${process.env.FRONTEND_URL}/success`,
        cancel_url : `${process.env.FRONTEND_URL}/cancel`
    }

    const session = await Stripe.checkout.sessions.create(params)

    return response.status(200).json(session)

    
 } catch (error) {
    return response.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
 }   
}

const getOrderProductItems = async ({ lineItems , userId , addressId , paymentId , paymentStatus }) => {
    const productList = []

    if(lineItems?.data?.length) {
        for(const item of lineItems.data){
            const product = await Stripe.products.retrieve(item.price.product)
            
            const payload = {
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : product.metadata.productId,
                product_details : {
                    name : product.name,
                    image : product.images,
                },
                paymentId : paymentId,
                payment_status : paymentStatus,
                delivery_address : addressId,
                subTotalAmt : Number(item.amount_total / 100),
                totalAmt : Number(item.amount_total / 100)
            }

            productList.push(payload)
        }
    }

    return productList
}

// http://localhost:8080/api/order/webhook

export async function webhookStripe(request , response) {
    const event = request.body

    const endPointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

    console.log("event" , event)

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object
            const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
            const userId = session.metadata.userId
            const orderProduct = await getOrderProductItems(
                {
                    lineItems : lineItems,
                    userId : userId,
                    addressId : session.metadata.addressId,
                    paymentId : session.payment_intent,
                    paymentStatus : session.payment_status
                })
            
            const order = await OrderModel.insertMany(orderProduct)

            if(order){
                const removeCartItems = await UserModel.findByIdAndUpdate(userId , {
                    shopping_cart : []
                })

                const removeCartProductDB = await CartProductModel.deleteMany({ userId : userId })
            }

            break
        
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    response.json({recieved : true});
} 

export async function getOrderDetailsController(request , response){
    try {

        const userId = request.userId // middleware

        const orderList = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')
        
        return response.json({
            message : "Order List",
            data : orderList,
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