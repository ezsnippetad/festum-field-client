import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
//import { io } from "socket.io-client";

const initialState = {
  onlineUsers: {},
};

const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export default socketSlice.reducer;
export const { setOnlineUsers } = socketSlice.actions;

// const selectSocket = (state) => state.socketStore.socket;
//
// export const useSocket = () => {
//   const socket = useSelector(selectSocket);
//   return useMemo(() => {
//     return { socket };
//   }, [socket]);
// };

const selectOnlineUsers = (state) => state.socketStore.onlineUsers;

export const useOnlineUsers = () => {
  const onlineUsers = useSelector(selectOnlineUsers);
  return useMemo(() => {
    return onlineUsers;
  }, [onlineUsers]);
};
