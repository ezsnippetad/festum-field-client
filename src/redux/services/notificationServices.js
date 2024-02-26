import {
  CREATENEWNOTIFICATION,
  DELETESINGLENOTIFICATION,
  GETNOTIFICATIONBYID,
  NOTIFICATIONLIST,
  SETNOTIFICATIONBANNER,
  UPDATENOTIFIATION,
} from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const createNewNotification = (payload) => {
  return apiInstance.post(CREATENEWNOTIFICATION, payload, {
    headers: authHeader(),
  });
};

export const setNotificationBanner = (payload) => {
  return apiInstance.post(SETNOTIFICATIONBANNER, payload, {
    headers: authHeader(),
  });
};

export const updateNotification = (payload) => {
  return apiInstance.post(UPDATENOTIFIATION, payload, {
    headers: authHeader(),
  });
};
export const deleteNotification = (payload) => {
  return apiInstance.post(DELETESINGLENOTIFICATION, payload, {
    headers: authHeader(),
  });
};

export const getNotificationById = (payload) => {
  return apiInstance.get(GETNOTIFICATIONBYID, {
    params: payload,
    headers: authHeader(),
  });
};

export const notificationList = (payload) => {
  return apiInstance.post(NOTIFICATIONLIST, payload, { headers: authHeader() });
};
