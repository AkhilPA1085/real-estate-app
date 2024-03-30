import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  USER_DETAILS_FROM_TOKEN,
} from "@/routes/routes";
import axios from "axios";

export async function userSignup(data) {
  try {
    const res = await axios.post(SIGNUP_USER, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function userLogin(data) {
  try {
    const response = await axios.post(LOGIN_USER, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function userLogout() {
  try {
    const response = await axios.get(LOGOUT_USER);
    return response.data;
  } catch (error) {
    console.log("axios", error);
  }
}

export async function getUserDetailsFromToken() {
  try {
    const response = await axios.get(USER_DETAILS_FROM_TOKEN);
    return response;
  } catch (error) {
    return error;
  }
}
