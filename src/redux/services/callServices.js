import {
    LIST_CALL_HISTORY,
    CALL_START,
    CALL_ACCEPT,
    CALL_END
} from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const listCallHistory = (payload) => {
    return apiInstance.post(LIST_CALL_HISTORY, payload, { headers: authHeader() });
};

export const callStart = (payload) => {
    return apiInstance.post(CALL_START, payload, { headers: authHeader() });
};

export const callAccept = (payload) => {
    return apiInstance.post(CALL_ACCEPT, payload, { headers: authHeader() });
};

export const callEnd = (payload) => {
    return apiInstance.post(CALL_END, payload, { headers: authHeader() });
};

