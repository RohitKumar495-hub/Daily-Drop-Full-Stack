import { Router } from 'express'
import { 
    registerUserController, 
    verifEmailController , 
    loginController, 
    logoutController, 
    uploadAvatar, 
    updateUserDetails, 
    forgotPasswordController, 
    verifyForgotPasswordOtp, 
    resetPassword, 
    refreshToken, 
    userDetails
} from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const userRouter = Router()

userRouter.post('/register' , registerUserController)
userRouter.post('/verify-email' , verifEmailController)
userRouter.post('/login' , loginController)
userRouter.get('/logout' , auth , logoutController)
userRouter.put('/upload-avatar' , auth , upload.single('avatar'), uploadAvatar)
userRouter.put('/update-user' , auth , updateUserDetails)
userRouter.put('/forgot-password' , forgotPasswordController)
userRouter.put('/verify-forgot-password-otp' , verifyForgotPasswordOtp)
userRouter.put('/reset-password' , resetPassword)
userRouter.post('/refresh-token' , refreshToken)
userRouter.get('/user-details'  , auth ,  userDetails)


export default userRouter