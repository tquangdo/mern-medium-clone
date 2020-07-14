import axios from 'axios'
import * as configConst from '../constants/ConfigConst'

let callAPI = (endpoint_arg, method_arg = 'GET', body_arg) => {
    return axios({
        method: method_arg,
        url: `${configConst.API_URL}/${endpoint_arg}`,
        data: body_arg
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data)
        } else if (error.request) {
            console.log(error.request)
        }
        alert('Error!!! ' + error.message)
    })
}
export default callAPI