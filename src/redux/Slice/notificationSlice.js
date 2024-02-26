import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getProfile } from "../services/profileServices";
// import { updateProduct } from "../services/productServices";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
  createNewNotification,
  deleteNotification,
  getNotificationById,
  notificationList,
  setNotificationBanner,
  updateNotification,
} from "../services/notificationServices";

const initialState = {
  notificationslist: {},
  notificationGetByIds: {},
  notifications: {
    page: 1,
    limit: 10,
    search: "",
    sortfield: "title",
    sortoption: 1,
  },
};

export const newNotificationCreate = createAsyncThunk(
  "user/createnewnotification",
  async (payload) => {
    return await createNewNotification(payload);
  },
);
export const notificationBannerSet = createAsyncThunk(
  "user/setnotificationbanner",
  async (payload) => {
    return await setNotificationBanner(payload);
  },
);
export const notificationUpdate = createAsyncThunk(
  "user/updatenotification",
  async (payload) => {
    return await updateNotification(payload);
  },
);
export const notificationDelete = createAsyncThunk(
  "user/deletenotification",
  async (payload) => {
    return await deleteNotification(payload);
  },
);

export const notificationGetById = createAsyncThunk(
  "user/getnotificationbyid",
  async (payload) => {
    return await getNotificationById(payload);
  },
);
export const listOfNotification = createAsyncThunk(
  "user/notificationlist",
  async (payload) => {
    return await notificationList(payload);
  },
);

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    getNotifications: (state, action) => {
      const notifications = {
        page: action?.payload?.page
          ? action?.payload?.page
          : state?.notifications?.page,
        limit: action?.payload?.limit
          ? action?.payload?.limit
          : state?.notifications?.limit,
        search: action?.payload?.search
          ? action?.payload?.search
          : state?.notifications?.search,
        sortfield: action?.payload?.sortfield
          ? action?.payload?.sortfield
          : state?.notifications?.sortfield,
        sortoption: action?.payload?.sortoption
          ? action?.payload?.sortoption
          : state?.notifications?.sortoption,
      };
      state.notifications = { ...notifications };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listOfNotification.fulfilled, (state, action) => {
      state.notificationslist = action?.payload?.data?.Data;
    });
    builder.addCase(notificationGetById.fulfilled, (state, action) => {
      state.notificationGetByIds = action?.payload?.data?.Data;
    });
  },
});

export const { getNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

export const selectNotificationslist = (state) =>
  state.notification.notificationslist;

export const useNotificationslist = () => {
  const notificationslist = useSelector(selectNotificationslist);
  return useMemo(() => notificationslist, [notificationslist]);
};

export const selectNotificationGetId = (state) =>
  state.notification.notificationGetByIds;

export const useNotificationGetId = () => {
  const notificationGetByIds = useSelector(selectNotificationGetId);
  return useMemo(() => notificationGetByIds, [notificationGetByIds]);
};

export const selectNotification = (state) => state.notification.notifications;

export const useNotification = () => {
  const notifications = useSelector(selectNotification);
  return useMemo(() => notifications, [notifications]);
};
