import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
  addGroupMembersApi,
  chatsSend,
  createGroupApi,
  listChats,
  pinChatApi,
  removeGroupMemberApi,
  uploadGrpImgApi,
  getGroupById
} from "../services/chatServices";

const initialState = {
  listChat: [],
  listChatPage: "",
  inquiryProduct: null,
  receiverId: null,
  chatUser: null,
  onIncomingChatUser: null,
  gettingSingleGroup: null,
  newChatList: []
};

export const chatsOfList = createAsyncThunk(
  "user/listchats",
  async (payload) => {
    return await listChats(payload);
  }
);
export const chatSend = createAsyncThunk("user/chatssend", async (payload) => {
  return await chatsSend(payload);
});

export const pinChat = createAsyncThunk("user/pinchat", async (payload) => {
  return await pinChatApi(payload);
});

export const createGroup = createAsyncThunk(
  "group/creategroup",
  async (payload) => {
    return await createGroupApi(payload);
  }
);

export const addGroupMembers = createAsyncThunk(
  "group/addmembers",
  async (payload) => {
    return await addGroupMembersApi(payload);
  }
);
export const removeGroupMember = createAsyncThunk(
  "group/addmembers",
  async (payload) => {
    return await removeGroupMemberApi(payload);
  }
);

export const uploadGrpImg = createAsyncThunk(
  "group/uploadgroupprofileimage",
  async (payload) => {
    return await uploadGrpImgApi(payload);
  }
);

export const getSingleGroup = createAsyncThunk("group/getGroup", async (payload) => {
  return await getGroupById(payload);
});

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setInquiryProduct: (state, action) => {
      state.inquiryProduct = action.payload;
    },
    setReceiverId: (state, action) => {
      state.receiverId = action.payload;
    },
    setCurrentChatUser: (state, action) => {
      state.chatUser = action.payload;
    },
    setSocketChatUser: (state, action) => {
      state.socketChatUser = action.payload;
    },
    setNewChatLists(state, action) {
      state.newChatList = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(chatsOfList.fulfilled, (state, action) => {
      state.listChatPage = action?.payload?.data?.Data;
      if (action?.payload?.data?.Data?.page === 1) {
        state.listChat = action?.payload?.data?.Data?.docs;
      } else {
        state.listChat = state.listChat.concat(
          action?.payload?.data?.Data?.docs
        );
      }
    });
    builder.addCase(getSingleGroup.fulfilled, (state, action) => {
      state.gettingSingleGroup = action?.payload?.data?.Data;
    });
  },
});

export default chatSlice.reducer;
export const { setInquiryProduct, setReceiverId, setCurrentChatUser, setSocketChatUser, setNewChatLists } = chatSlice.actions;

export const selectListChatPage = (state) => state.chat.listChatPage;

export const useListChatPage = () => {
  const listChatPage = useSelector(selectListChatPage);
  return useMemo(() => listChatPage, [listChatPage]);
};
export const selectListChat = (state) => state.chat.listChat;

export const useListChat = () => {
  const listChat = useSelector(selectListChat);
  return useMemo(() => listChat, [listChat]);
};

export const selectInquiryProduct = (state) => state.chat.inquiryProduct;

export const useInquiryProduct = () => {
  const product = useSelector(selectInquiryProduct);
  return useMemo(() => product, [product]);
};

export const selectReceiverId = (state) => state.chat.receiverId;

export const useReceiverId = () => {
  const receiverId = useSelector(selectReceiverId);
  return useMemo(() => receiverId, [receiverId]);
};

export const selectCurrentChatUser = (state) => state.chat.chatUser;

export const useCurrentChatUser = () => {
  const currentChatUser = useSelector(selectCurrentChatUser);
  return useMemo(() => currentChatUser, [currentChatUser]);
};

export const selectOnIncomingChat = (state) => state.chat;

export const useOnIncomingChat = () => {
  const onIncomingChatUser = useSelector(selectOnIncomingChat);
  return useMemo(() => onIncomingChatUser, [onIncomingChatUser]);
};

export const selectSingleGroup = (state) => state.chat.gettingSingleGroup;
export const useSingleGroup = () => {
  const gettingSingleGroup = useSelector(selectSingleGroup);
  return useMemo(() => gettingSingleGroup, [gettingSingleGroup]);
};

export const selectNewChatList = (state) => state.chat.newChatList;
export const useNewChatList = () => {
  const newChatList = useSelector(selectNewChatList);
  return useMemo(() => newChatList, [newChatList]);
};


