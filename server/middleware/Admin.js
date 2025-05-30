import UserModel from '../models/user.model.js'

const Admin = async (request , response , next) => {
    try {

        const userId = request.userId
        const user = await UserModel.findById(userId)

        if(user.role !== 'ADMIN'){
            return response.status(400).json({
                message : "Permission Denied",
                error : true,
                success : false
            })
        }

        next()

    } catch (error) {
        return response.status(500).json({
            message : "Permission Denied",
            error : true,
            success : false
        })
    }
}

export default Admin