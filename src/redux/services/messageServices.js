import {DELIVER_MESSAGE, SEEN_MESSAGE } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";





export const deliverMessageServices = (payload) => {
    return apiInstance.post(DELIVER_MESSAGE, payload, {
        headers: authHeader(),
    });
};
export const seenMessageServices = (payload) => {
    return apiInstance.post(SEEN_MESSAGE, payload, {
        headers: authHeader(),
    });
};
