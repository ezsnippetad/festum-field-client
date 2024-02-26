import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
//import { sendOtp, verifyOtp } from "../../redux/services/authServices";
//import { getProfile } from "../services/profileServices";
import {
  allFriendsRequest,
  receivedFriendsRequests,
  removeFriendRequest,
  searchFriendRequestServices,
  sendFriendRequests,
  sentFriendRequests,
  updateFriendRequest,
  getFriendById,
  searchGroupRequestServices,
  unfrindBlockMyFriend,
  blockListServices,
  unBlockMyFriendServices
} from "../services/requestServices";

const initialState = {
  friendsRequests: [],
  receivedRequests: [],
  sentRequests: [],
  friendsLists: [],
  myFriendsList: [],
  mySearchFriendsList: [],
  myGroupsList: [],
  mySearchGroupsList: [],
  gettingSingleFriend: null
};

export const friendsRequest = createAsyncThunk(
  "user/allfriendsrequest",
  async (payload) => {
    return await allFriendsRequest(payload);
  }
);
export const friendsRequestsReceived = createAsyncThunk(
  "user/receivedfriendsrequests",
  async (payload) => {
    return await receivedFriendsRequests(payload);
  }
);
export const friendsRequestsSearch = createAsyncThunk(
  "user/searchedfriendsrequests",
  async (payload) => {
    return await searchFriendRequestServices(payload);
  }
);
export const gropusRequestsSearch = createAsyncThunk(
  "user/searchedfriendsrequests",
  async (payload) => {
    return await searchGroupRequestServices(payload);
  }
);
export const friendRequestsSent = createAsyncThunk(
  "user/sentfriendrequests",
  async (payload) => {
    return await sentFriendRequests(payload);
  }
);
export const friendRequestsSend = createAsyncThunk(
  "user/sendfriendrequest",
  async (payload) => {
    return await sendFriendRequests(payload);
  }
);
export const friendRequestsUpdate = createAsyncThunk(
  "user/updatefriendrequests",
  async (payload) => {
    return await updateFriendRequest(payload);
  }
);
export const friendBlockorUnfriend = createAsyncThunk(
  "user/updatefriendrequests",
  async (payload) => {
    return await unfrindBlockMyFriend(payload);
  }
);
export const unBlockMyFriend = createAsyncThunk(
  "user/unblockMydfriend",
  async (payload) => {
    return await unBlockMyFriendServices(payload);
  }
);
export const blockList = createAsyncThunk(
  "user/updatefriendrequests",
  async (payload) => {
    return await blockListServices(payload);
  }
);
export const friendRequestRemove = createAsyncThunk(
  "user/removefrinedRequest",
  async (payload) => {
    return await removeFriendRequest(payload);
  }
);
export const getSingleFriend = createAsyncThunk("user/getFriend", async (payload) => {
  return await getFriendById(payload);
});

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  reducers: {
    setMyNewFriedList(state, action) {
      state.myFriendsList = [...action.payload]
    },
    setMySearchFriendsList(state, action) {
      state.mySearchFriendsList = action.payload
    },
    clearmYFriendList(state) {
      state.myFriendsList = []
    },
    setMyNewGroupList(state, action) {
      state.myGroupsList = [...action.payload]
    },
    setMySearchGroupsList(state, action) {
      state.mySearchGroupsList = action.payload
    },
    clearmYGroupList(state) {
      state.myGroupsList = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(friendsRequest.fulfilled, (state, action) => {
      state.friendsRequests = action?.payload?.data?.Data;
    });
    builder.addCase(friendsRequestsReceived.fulfilled, (state, action) => {
      state.receivedRequests = action?.payload?.data?.Data;
    });
    builder.addCase(friendRequestsSent.fulfilled, (state, action) => {
      state.sentRequests = action?.payload?.data?.Data;
    });
    builder.addCase(friendsRequestsSearch.fulfilled, (state, action) => {
      state.friendsLists = action?.payload?.data?.Data?.docs
    });
    builder.addCase(getSingleFriend.fulfilled, (state, action) => {
      state.gettingSingleFriend = action?.payload?.data?.Data
    });
  },
});

export default requestSlice.reducer;
export const { setMyNewFriedList, setMySearchFriendsList, clearmYFriendList, setMyNewGroupList, setMySearchGroupsList, clearmYGroupList } = requestSlice.actions

export const selectFriendsRequests = (state) => state.request.friendsRequests;

export const useFriendsRequests = () => {
  const friendsRequests = useSelector(selectFriendsRequests);
  return useMemo(() => friendsRequests, [friendsRequests]);
};

export const useFriendRequestFromId = (friendId) => {
  const friendsRequests = useSelector(selectFriendsRequests);
  return friendsRequests.docs?.find((item) => item._id === friendId);
};

export const selectReceivedRequests = (state) => state.request.receivedRequests;

export const useReceivedRequests = () => {
  const receivedRequests = useSelector(selectReceivedRequests);
  return useMemo(() => receivedRequests, [receivedRequests]);
};

export const selectSentRequests = (state) => state.request.sentRequests;

export const useSentRequests = () => {
  const sentRequests = useSelector(selectSentRequests);
  return useMemo(() => sentRequests, [sentRequests]);
};

const selectFrindsList = (state) => state.request.friendsLists

export const useFriendsList = () => {
  const friends = useSelector(selectFrindsList)
  return useMemo(() => friends, [friends])
}

const selectFriendsList = (state) => state.request.myFriendsList
export const useMyFriendsList = () => {
  const myFriendsList = useSelector(selectFriendsList)
  return useMemo(() => myFriendsList, [myFriendsList])
}

const selectSearchFriendsList = (state) => state.request.mySearchFriendsList
export const useMySearchFriendsList = () => {
  const mySearchFriendsList = useSelector(selectSearchFriendsList)
  return useMemo(() => mySearchFriendsList, [mySearchFriendsList])
}
const selectGroupList = (state) => state.request.myGroupsList
export const useMyGroupList = () => {
  const myGroupsList = useSelector(selectGroupList)
  return useMemo(() => myGroupsList, [myGroupsList])
}
const selectSearchGroupsList = (state) => state.request.mySearchGroupsList
export const useMySearchGroupsList = () => {
  const mySearchGroupsList = useSelector(selectSearchGroupsList)
  return useMemo(() => mySearchGroupsList, [mySearchGroupsList])
}
const selectSingleFriend = (state) => state.request.gettingSingleFriend
export const useSingleFriend = () => {
  const gettingSingleFriend = useSelector(selectSingleFriend)
  return useMemo(() => gettingSingleFriend, [gettingSingleFriend])
}
