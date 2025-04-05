import Axios from './Axios'
import SummaryAPI from '../common/SummaryApi'
import AxiosToastError from './AxiosToastError'


const fetchUserDetails = async () => {
    try{

        const response = await Axios({
            ...SummaryAPI.userDetails
        })

        return response.data

    }catch (error){
        AxiosToastError(error)
    }
}

export default fetchUserDetails