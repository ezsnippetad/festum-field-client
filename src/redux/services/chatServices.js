import {
  ADD_MEMBERS,
  CHATS_SEND,
  CHATS_STATUS_DELIVERED,
  CHATS_STATUS_SEEN,
  CREATE_GROUP,
  LIST_CHATS,
  PIN_CHAT,
  REMOVE_MEMBER,
  UPLOAD_GROUP_IMG,
  GET_SINGLE_GROUP
} from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const listChats = (payload) => {
  return apiInstance.post(LIST_CHATS, payload, { headers: authHeader() });
};

export const chatsSend = (payload) => {
  return apiInstance.post(CHATS_SEND, payload, { headers: authHeader() });
};

export const chatsMessageDelivered = (payload) => {
  return apiInstance.post(CHATS_STATUS_DELIVERED, payload, { headers: authHeader() });
};

export const chatsMessageSeen = (payload) => {
    return apiInstance.post(CHATS_STATUS_SEEN, payload, { headers: authHeader() });
};

export const pinChatApi = (payload) => {
  return apiInstance.post(PIN_CHAT, payload, { headers: authHeader() });
};

export const createGroupApi = (payload) => {
  return apiInstance.post(CREATE_GROUP, payload, { headers: authHeader() });
};

export const addGroupMembersApi = (payload) => {
  return apiInstance.post(ADD_MEMBERS, payload, { headers: authHeader() });
};

export const removeGroupMemberApi = (payload) => {
  return apiInstance.post(REMOVE_MEMBER, payload, { headers: authHeader() });
};

export const uploadGrpImgApi = (payload) => {
  return apiInstance.post(UPLOAD_GROUP_IMG, payload, { headers: authHeader() });
};

export const getGroupById = (payload) => {
    return apiInstance.post(GET_SINGLE_GROUP, payload, { headers: authHeader() });
};
