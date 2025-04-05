import express from 'express' // using to handle APIs request and response
import cors from 'cors' // using to hanlde errors when using the APIs on frontend and backend
import dotenv from 'dotenv' // using to make a specific file to take URLs at a separate file
dotenv.config() // using so that urls from the .env file adds to the process.env.URL_Name so that we don't need to write it as hardcore everytime
import cookieParser from 'cookie-parser' // using to parse the cookie on the frontend
import morgan from 'morgan' // using because it shows the detailed about logs of APIs wheter there is an error or not
import helmet from 'helmet' // using to make our code safe from the maclious code injecting by the hackers
import connectDB from './config/connectDB.js' // using module type then also add to extension of file
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.route.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.rote.js'
import orderRouter from './route/order.route.js'

const app = express()
app.use(cors({
    credentials:true, // able to access the cookies on the client side 
    origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT // making a port and also giving the condition if the port is busy then use any avaliable port 

app.get('/' , (req , res) => {
    res.json({
        message:'server is running ' + PORT
    })
})

app.use('/api/user' , userRouter)
app.use('/api/category' , categoryRouter)
app.use('/api/file' , uploadRouter)
app.use('/api/subcategory' , subCategoryRouter)
app.use('/api/product' , productRouter)
app.use("/api/cart" , cartRouter)
app.use('/api/address' , addressRouter)
app.use('/api/order' , orderRouter)


connectDB().then(() => {
    app.listen(PORT , () => {
        console.log("Server is running" , PORT)
    })
})

