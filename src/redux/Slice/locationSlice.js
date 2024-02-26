import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";
// import { useMemo } from "react";
import { friendsFindByLocation } from "../services/locationServices";

const initialState = {};

export const findFriendsByLocation = createAsyncThunk(
  "user/friendsfindbylocation",
  async (payload) => {
    return await friendsFindByLocation(payload);
  },
);

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(listOfNotification.fulfilled, (state, action) => {
    //   state.notificationslist = action?.payload?.data?.Data;
    //   console.log(action?.payload?.data?.Data, "action?.payload?.data?.Data;");
    // });
    // builder.addCase(notificationGetById.fulfilled, (state, action) => {
    //   state.notificationGetByIds = action?.payload?.data?.Data;
    //   console.log(action?.payload?.data?.Data, "action?.payload?.data?.Data;");
    // });
  },
});

export default locationSlice.reducer;

// export const selectNotificationslist = (state) => state.notification.notificationslist;

// export const useNotificationslist = () => {
//   const notificationslist = useSelector(selectNotificationslist);
//   return useMemo(() => notificationslist, [notificationslist]);
// };
