import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const initialState = { friendListSideBar: false };

const sidebarslices = createSlice({
    name: "sidebarslices",
    initialState,
    reducers: {
        setFriendListSidebar(state, action) {
            state.friendListSideBar = action.payload
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(friendsRequest.fulfilled, (state, action) => {
    //         state.friendsRequests = action?.payload?.data?.Data;
    //     });
    // },
});

export default sidebarslices.reducer;
export const { setFriendListSidebar } = sidebarslices.actions

export const selectFriendsRequests = (state) => state.sideBars.friendListSideBar;
export const useFriendListSideBar = () => {
    const friendListSideBar = useSelector(selectFriendsRequests);
    return useMemo(() => friendListSideBar, [friendListSideBar]);
};