import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { useSelector } from "react-redux";
//import { useMemo } from "react";

import {  deliverMessageServices, seenMessageServices } from "../services/messageServices";

const initialState = {

};

export const deliverMessage = createAsyncThunk("user/delevermessage", async (payload) => {
    return await deliverMessageServices(payload);
});
export const seenMessage = createAsyncThunk("user/seenmessage", async (payload) => {
    return await seenMessageServices(payload);
});




const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {
    },
    // extraReducers: (builder) => {
    //     builder.addCase(callsOfList.fulfilled, (state, action) => {
    //         state.listCallPage = action?.payload?.data?.Data;
    //     });
    // },
});

export default messageSlice.reducer;
// export const {  } = messageSlice.actions;


// export const selectCallAccepted = (state) => state.call.isCallAccepted;

// export const useCallAccepted = () => {
//     const callAccepted = useSelector(selectCallAccepted);
//     return useMemo(() => callAccepted, [callAccepted]);
// };
