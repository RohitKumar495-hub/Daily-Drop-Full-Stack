import { Router } from 'express'
import auth from '../middleware/auth.js'
import { 
            addAddressController, 
            deleteAddressController, 
            getAddressDetails, 
            updateAddressController 
        } 
    from '../controllers/address.controller.js'

const addressRouter = Router()

addressRouter.post("/create" , auth , addAddressController)
addressRouter.get('/get' , auth , getAddressDetails)
addressRouter.put('/update' , auth , updateAddressController)
addressRouter.delete('/disable' , auth , deleteAddressController)

export default addressRouter