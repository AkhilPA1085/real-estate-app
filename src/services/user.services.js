import { LOGIN_USER, SIGNUP_USER } from "@/routes/routes";
import axios from "axios"

export async function userSignup(data){
    try{
        const res = await axios.post(SIGNUP_USER,data);
        return res.data;
    }catch(error){
        console.log(error)
    }
};

export async function userLogin(data){
    try {
        const response = await axios.post(LOGIN_USER,data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}