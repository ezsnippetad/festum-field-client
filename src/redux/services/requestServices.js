import {
  ALLFRIENDSREQUEST,
  RECEIVEDFRIENDSREQUEST,
  REMOVE_REQUEST,
  SEARCHFRIENDREQUEST,
  SENDFRIENDREQUESTS,
  SENTFRIENDREQUESTS,
  UPDATEFRIENDREQUEST,
  GET_SINGLE_FRIENDS,
  MYGROUPS,
  UNFRIENDORBLOCK,
  BLOCK_LIST,
  UNBLOCK_MYFRIEND
} from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const allFriendsRequest = (payload) => {
  return apiInstance.post(ALLFRIENDSREQUEST, payload, {
    headers: authHeader(),
  });
};

export const receivedFriendsRequests = (payload) => {
  return apiInstance.post(RECEIVEDFRIENDSREQUEST, payload, {
    headers: authHeader(),
  });
};
export const searchFriendRequestServices = (payload) => {
  return apiInstance.post(SEARCHFRIENDREQUEST, payload, {
    headers: authHeader(),
  });
};
export const searchGroupRequestServices = (payload) => {
  return apiInstance.post(MYGROUPS, payload, {
    headers: authHeader(),
  });
};
export const sentFriendRequests = (payload) => {
  return apiInstance.post(SENTFRIENDREQUESTS, payload, {
    headers: authHeader(),
  });
};
export const sendFriendRequests = (payload) => {
  return apiInstance.post(SENDFRIENDREQUESTS, payload, {
    headers: authHeader(),
  });
};
export const updateFriendRequest = (payload) => {
  return apiInstance.post(UPDATEFRIENDREQUEST, payload, {
    headers: authHeader(),
  });
};
export const unfrindBlockMyFriend = (payload) => {
  return apiInstance.post(UNFRIENDORBLOCK, payload, {
    headers: authHeader(),
  });
};
export const unBlockMyFriendServices = (payload) => {
  return apiInstance.post(UNBLOCK_MYFRIEND, payload, {
    headers: authHeader(),
  });
};
export const blockListServices = (payload) => {
  return apiInstance.post(BLOCK_LIST, payload, {
    headers: authHeader(),
  });
};
export const removeFriendRequest = (payload) => {
  return apiInstance.post(REMOVE_REQUEST, payload, {
    headers: authHeader(),
  });
};
export const getFriendById = (payload) => {
  return apiInstance.post(GET_SINGLE_FRIENDS, payload, {
    headers: authHeader(),
  });
};
