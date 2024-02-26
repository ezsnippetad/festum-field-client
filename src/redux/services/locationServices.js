import { FRIENDSFINDBYLOCATION } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const friendsFindByLocation = (payload) => {
  return apiInstance.post(FRIENDSFINDBYLOCATION, payload, {
    headers: authHeader(),
  });
};
