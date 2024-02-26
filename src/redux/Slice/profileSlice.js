import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
// import { sendOtp, verifyOtp } from "../../redux/services/authServices";
import {
  authorizedPermissions,
  getBusinessCategoriesServices,
  getBusinessList,
  getBusinessById,
    removeBusiness,
  getBusinessProfile,
  getProfile,
  setBrochure,
  setBusinessProfile,
  setBusinessProfilePick,
  setProfile,
  setProfilePicture,
  uplaodbusinessBrochureServices,
  uplaodbusinessPhotosServices,
  uplaodbusinessVideosServices,
  removebusinessBrochure,
  removebusinessPhoto,
  removebusinessVideo
} from "../services/profileServices";
import { Secondary } from "../services/toastServices";

const initialState = {
  profileGets: {},
  businessProfileGets: "",
  businessLists: null,
  businessCategoriesList: []
};

export const profileGet = createAsyncThunk("user/getprofile", async () => {
  try {
    return await getProfile();
  } catch (error) {
    Secondary(error.response.data.Message);
    localStorage.removeItem("token");
    // window.location.href = "/login";
    return error.response.data;
  }
});
export const profileSet = createAsyncThunk("user/setprofile",
  async (payload) => { return await setProfile(payload); },
);
export const profilePictureSet = createAsyncThunk("user/setprofilepicture",
  async (payload) => { return await setProfilePicture(payload); },
);
export const businessList = createAsyncThunk("user/getbusinesslist",
  async () => { console.log("yes"); return await getBusinessList(); },
);
export const businessGetById = createAsyncThunk("user/gebusinessbyid",
    async (id) => {return await getBusinessById(id);},
);
export const businessRemove = createAsyncThunk("user/removebusinessbyid",
    async (id) => {return await removeBusiness(id);},
);
export const businessProfileGet = createAsyncThunk("user/getbusinessprofile",
  async () => { return await getBusinessProfile(); },
);
export const businessProfileSet = createAsyncThunk(
  "user/setbusinessprofile",
  async (payload) => {
    return await setBusinessProfile(payload);
  },
);
export const businessProfilePickSet = createAsyncThunk(
  "user/setbusinessprofilepick",
  async (payload) => {
    return await setBusinessProfilePick(payload);
  },
);
export const getBusinessCategories = createAsyncThunk(
  "user/getbusinesscategories",
  async () => {
    return await getBusinessCategoriesServices();
  },
);
export const brochureSet = createAsyncThunk(
  "user/setbrochure",
  async (payload) => {
    return await setBrochure(payload);
  },
);
export const authorizedPermissionsSet = createAsyncThunk(
  "user/authorizedpermissions",
  async (payload) => {
    return await authorizedPermissions(payload);
  },
);
export const uplaodbusinessBrochure = createAsyncThunk(
  "user/uplaodbusinessBrochure",
  async (payload) => {
    return await uplaodbusinessBrochureServices(payload);
  },
);
export const uplaodbusinessPhotos = createAsyncThunk(
  "user/uplaodbusinessPhotos",
  async (payload) => {
    return await uplaodbusinessPhotosServices(payload);
  },
);
export const uplaodbusinessVideo = createAsyncThunk(
  "user/uplaodbusinessVideo",
  async (payload) => {
    return await uplaodbusinessVideosServices(payload);
  },
);

export const removeBusinessBrochure = createAsyncThunk("user/removebusinessBrochure",
    async (payload) => {return await removebusinessBrochure(payload);},
);
export const removeBusinessPhotos = createAsyncThunk("user/removebusinessPhotos",
    async (payload) => {return await removebusinessPhoto(payload);},
);
export const removeBusinessVideo = createAsyncThunk("user/removebusinessVideo",
    async (payload) => {return await removebusinessVideo(payload);},
);

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileGet.fulfilled, (state, action) => {
      state.profileGets = action?.payload?.data?.Data;
    });
    builder.addCase(businessProfileGet.fulfilled, (state, action) => {
      state.businessProfileGets = action?.payload?.data?.Data;
    });
    builder.addCase(businessList.fulfilled, (state, action) => {
      console.log("action", action)
      state.businessLists = action?.payload?.data?.Data;
    });
    builder.addCase(getBusinessCategories.fulfilled, (state, action) => {
      state.businessCategoriesList = action?.payload?.data?.Data;
    });
  },
});

export default profileSlice.reducer;

export const selectProfileGets = (state) => state.profile.profileGets;

export const useProfileGets = () => {
  const profileGets = useSelector(selectProfileGets);
  return useMemo(() => profileGets, [profileGets]);
};

export const selectBusinessProfileGet = (state) => state.profile.businessProfileGets;

export const useBusinessProfileGets = () => {
  const businessProfileGets = useSelector(selectBusinessProfileGet);
  return useMemo(() => businessProfileGets, [businessProfileGets]);
};

export const selectBusinessLists = (state) => state.profile.businessLists;

export const useBusinessLists = () => {
  const businessLists = useSelector(selectBusinessLists);
  return useMemo(() => businessLists, [businessLists]);
};
export const selectBusinessCategories = (state) => state.profile.businessCategoriesList;

export const useBusinessCategories = () => {
  const businessCategoriesList = useSelector(selectBusinessCategories);
  return useMemo(() => businessCategoriesList, [businessCategoriesList]);
};