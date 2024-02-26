import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { sendOtp, verifyOtp } from "../../redux/services/authServices";

const getDefaultUser = () => {
  let user = localStorage.getItem("token");
  if (user && user !== "undefined") {
    return JSON.parse(user);
  } else {
    return null;
  }
};

const initialState = {
  countryCodes: "",
  otps: "",
  verifyOtps: localStorage.getItem("token") ? getDefaultUser() : "",
  userLogin: {},
  userLoginKey: {}
};

export const otpSend = createAsyncThunk("user/sendotp", async (payload) => {
  return await sendOtp(payload);
});

export const otpVerify = createAsyncThunk("user/verifyotp", async (payload) => {
  return await verifyOtp(payload);
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserLogin(state, action) {
      state.userLogin = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(otpSend.fulfilled, (state, action) => {
      state.userLoginKey = action.payload.data.Data
    });
    builder.addCase(otpVerify.fulfilled, (state, action) => {
      state.verifyOtps = action?.payload?.data?.Data?.token ? action?.payload?.data?.Data?.token : {};
    });
  },
});
export const { setUserLogin } = authSlice.actions

export default authSlice.reducer;

export const selectOtps = (state) => state.auth.userLoginKey;

export const useOtp = () => {
  const userLoginKey = useSelector(selectOtps)
  return useMemo(() => userLoginKey, [userLoginKey]);
};


export const selectLoginUser = (state) => state.auth.userLogin;
export const useLoginUser = () => {
  const userLogin = useSelector(selectLoginUser)
  return useMemo(() => userLogin, [userLogin]);
};

export const selectVerifyOtps = (state) => state.auth.verifyOtps;

export const useVerifyOtp = () => {
  const verifyOtps = useSelector(selectVerifyOtps);

  localStorage.setItem(
    "token",
    verifyOtps ? JSON.stringify(verifyOtps) : undefined,
  );
  return useMemo(() => verifyOtps, [verifyOtps]);
};
