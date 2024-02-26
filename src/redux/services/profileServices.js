import {
  AUTHORIZED_PERMISSIONS,
  GETBUSINESSLIST,
  GETBUSINESSBYID,
  REMOVEBUSINESS,
  GETBUSINESSPROFILE,
  GETPROFILE,
  GET_BUSINESS_CATEGORIES,
  SETBROCHURE,
  SETBUSINESSPROFILE,
  SETBUSINESSPROFILEPICK,
  SETPROFILE,
  SETPROFILEPICTURE,
  UPLOAD_BUSINESS_BROCHURE,
  UPLOAD_BUSINESS_PHOTOS,
  UPLOAD_BUSINESS_VIDEO,
  REMOVE_BUSINESS_BROCHURE,
  REMOVE_BUSINESS_PHOTOS,
  REMOVE_BUSINESS_VIDEO
} from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const getBusinessList = () => {
  return apiInstance.get(GETBUSINESSLIST, { headers: authHeader() });
};
export const getProfile = () => {
  return apiInstance.get(GETPROFILE, { headers: authHeader() });
};
export const setProfile = (payload) => {
  return apiInstance.post(SETPROFILE, payload, { headers: authHeader() });
};
export const setProfilePicture = (payload) => {
  return apiInstance.post(SETPROFILEPICTURE, payload, {
    headers: authHeader(),
  });
};
export const getBusinessProfile = () => {
  return apiInstance.get(GETBUSINESSPROFILE, { headers: authHeader() });
};
export const getBusinessById = (payload) => {
    return apiInstance.post(GETBUSINESSBYID, payload, {
        headers: authHeader(),
    });
};
export const removeBusiness = (payload) => {
    return apiInstance.post(REMOVEBUSINESS, payload, {headers: authHeader(),});
};
export const setBusinessProfile = (payload) => {
  return apiInstance.post(SETBUSINESSPROFILE, payload, {
    headers: authHeader(),
  });
};
export const setBusinessProfilePick = (payload) => {
  return apiInstance.post(SETBUSINESSPROFILEPICK, payload, {
    headers: authHeader(),
  });
};
export const getBusinessCategoriesServices = () => {
  return apiInstance.get(GET_BUSINESS_CATEGORIES, { headers: authHeader() });
};
export const setBrochure = (payload) => {
  return apiInstance.post(SETBROCHURE, payload, { headers: authHeader() });
};
export const authorizedPermissions = (payload) => {
  return apiInstance.post(AUTHORIZED_PERMISSIONS, payload, {
    headers: authHeader(),
  });
};
export const uplaodbusinessBrochureServices = (payload) => {
    return apiInstance.post(UPLOAD_BUSINESS_BROCHURE, payload, {
        headers: authHeader(),
    });
};
export const uplaodbusinessPhotosServices = (payload) => {
    return apiInstance.post(UPLOAD_BUSINESS_PHOTOS, payload, {
        headers: authHeader(),
    });
};
export const uplaodbusinessVideosServices = (payload) => {
    return apiInstance.post(UPLOAD_BUSINESS_VIDEO, payload, {
        headers: authHeader(),
    });
};
export const removebusinessBrochure = (payload) => {
    return apiInstance.post(REMOVE_BUSINESS_BROCHURE, payload, {headers: authHeader(),});
};
export const removebusinessPhoto = (payload) => {
    return apiInstance.post(REMOVE_BUSINESS_PHOTOS, payload, {headers: authHeader(),});
};
export const removebusinessVideo = (payload) => {
    return apiInstance.post(REMOVE_BUSINESS_VIDEO, payload, {headers: authHeader(),});
};


