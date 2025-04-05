import SummaryAPI from "../../client/src/common/SummaryApi"
import Axios from "../../client/src/utils/Axios"

const uploadImage = async (image) => {
    try {

        const formData = new FormData()
        formData.append('image' , image)

        const response = await Axios({
            ...SummaryAPI.uploadImage,
            data : formData
        })

        return response

    } catch (error) {
        return error 
    }

}

export default uploadImage