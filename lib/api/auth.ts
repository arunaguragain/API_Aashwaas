import axios from "./axios"; 
import {API} from "./endpoints";
// registerData:  any -> can be scheme object
export const registerUser = async( registerData: any) => {
    try{
        const response = await axios.post(
            API.AUTH.REGISTER, // backend route path
            registerData // Data to send to backend (req.body)
        );
        return response.data;// respose ko body,
        //what is returned from backend - controller
       
    } catch (err: Error | any) {
        // if 4xx ot 5xx counts as error
        throw new Error
        (
            err.response?.data?.message // from backend
            || err.message // general error message
            || "Registration failed" //fallback message
 
        );
    }
}
 
export const loginUser = async( loginData: any) => {
    try{
        const response = await axios.post(
            API.AUTH.LOGIN, // backend route path
            loginData // Data to send to backend (req.body)
        );
        return response.data;// respose ko body,
        //what is returned from backend - controller
       
    } catch (err: Error | any) {
        // if 4xx ot 5xx counts as error
        throw new Error
        (
            err.response?.data?.message // from backend
            || err.message // general error message
            || "Login failed" //fallback message
 
        );
    }
}
 