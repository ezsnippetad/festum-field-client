import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { listCallHistory, callStart, callAccept, callEnd} from "../services/callServices";

const initialState = {
    listCall: [],
    listCallPage: "",
    isCallAccepted: false,
    currentCall: null,
    currentCallProfile: null,
    isGroupCallStarted: false,
    isGroupVideoCall: true
};

export const callsOfList = createAsyncThunk("user/listcall", async (payload) => {
    return await listCallHistory(payload);
});

export const chatCallStart = createAsyncThunk("user/callstart", async (payload) => {
    return await callStart(payload);
});

export const chatCallAccept = createAsyncThunk("user/callaccept", async (payload) => {
    return await callAccept(payload);
});

export const chatCallEnd = createAsyncThunk("user/callend", async (payload) => {
    return await callEnd(payload);
});


const callSlice = createSlice({
    name: "callSlice",
    initialState,
    reducers: {
        setCallAccepted: (state, action) => {
            state.isCallAccepted = action.payload;
        },
        setCurrentCall: (state, action) => {
            state.currentCall = action.payload;
        },
        setCurrentCallProfile: (state, action) => {
            state.currentCallProfile = action.payload;
        },
        setGroupCallStarted: (state, action) => {
            state.isGroupCallStarted = action.payload;
        },
        setGroupVideoCall: (state, action) => {
            state.isGroupVideoCall = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(callsOfList.fulfilled, (state, action) => {
            //state.listCallPage = action?.payload?.data?.Data;
            // if (action?.payload?.data?.Data?.page === 1) {
            //     state.listCall = action?.payload?.data?.Data?.docs;
            // } else {
                state.listCall = action?.payload?.data?.Data?.docs;
            //}
        });
    },
});

export default callSlice.reducer;
export const { setCallAccepted, setCurrentCall, setCurrentCallProfile, setGroupCallStarted, setGroupVideoCall } = callSlice.actions;

export const selectListCallPage = (state) => state.call.listCallPage;

export const useListCallPage = () => {
    const listCallPage = useSelector(selectListCallPage);
    return useMemo(() => listCallPage, [listCallPage]);
};
export const selectListCall = (state) => state.call.listCall;

export const useListCall = () => {
    const listCall = useSelector(selectListCall);
    return useMemo(() => listCall, [listCall]);
};

export const selectCallAccepted = (state) => state.call.isCallAccepted;

export const useCallAccepted = () => {
    const callAccepted = useSelector(selectCallAccepted);
    return useMemo(() => callAccepted, [callAccepted]);
};

export const selectCurrentCall = (state) => state.call.currentCall;

export const useCurrentCall = () => {
    const currentCallId = useSelector(selectCurrentCall);
    return useMemo(() => currentCallId, [currentCallId]);
};

export const selectCurrentCallProfile = (state) => state.call.currentCallProfile;

export const useCurrentCallProfile = () => {
    const currentCallProfile = useSelector(selectCurrentCallProfile);
    return useMemo(() => currentCallProfile, [currentCallProfile]);
};

export const selectGroupCallStarted = (state) => state.call.isGroupCallStarted;

export const useGroupCallStarted = () => {
    const currentGroupCallStarted = useSelector(selectGroupCallStarted);
    return useMemo(() => currentGroupCallStarted, [currentGroupCallStarted]);
};

export const selectGroupVideoCall = (state) => state.call.isGroupVideoCall;

export const useGroupVideoCall = () => {
    const currentGroupVideoCall = useSelector(selectGroupVideoCall);
    return useMemo(() => currentGroupVideoCall, [currentGroupVideoCall]);
};