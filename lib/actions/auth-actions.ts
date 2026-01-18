"use server"
 
import { success } from "zod";
import { loginUser, registerUser } from "../api/auth";
import { setUserData, setAuthToken } from "../cookie";
 
 
export const handleRegister = async(fromData: any) => {
    try{
        //handle data from component from
        const result =  await registerUser(fromData);
        //handle how to send data back to component
        if(result.success){
            return{
                success: true,
                message: "Registration successful",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Registration failed"
        }
    }catch(err: Error | any){
        return {
            success: false, message: err.message || "Registration failed"
        }
    }
}
 
 
export const handleLogin = async(fromData: any) => {
    try{
        //handle data from component from
        const result =  await loginUser(fromData);
        //handle how to send data back to component
        if(result.success){
            await setAuthToken(result.token)
            await setUserData(result.data)
           
            return{
                success: true,
                message: "Login successful",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Login failed"
        }
    }catch(err: Error | any){
        return {
            success: false, message: err.message || "Login failed"
        }
    }
}
 