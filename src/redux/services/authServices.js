import { SENDOTP, VERIFYOTP } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const sendOtp = (payload) => {
  return apiInstance.post(SENDOTP, payload);
};
export const verifyOtp = (payload) => {
  return apiInstance.post(VERIFYOTP, payload);
};
