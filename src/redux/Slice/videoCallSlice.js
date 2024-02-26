import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const initialState = {
  userMediaStatus: {
    /**
     * @Example initial structure of userMediaStatus
     * set video and audio on / off status for all group members.
   
        "64be4ea91f9a96392c3002f6":{
            isVideoOn:true,
            isMicOn:true
        }
    
     */
  },
  localStream: null,
  // peerConnections: {},
  isVideoRingingPortalOpen: false,
  isVoicePortalOpen: false,
  isVideoPortalOpen: false,
};

const videoCallSlice = createSlice({
  name: "videoCallSlice",
  initialState,
  reducers: {
    setInitialMediaStatus: (state, action) => {
      state.userMediaStatus = {
        ...state.userMediaStatus,
        ...action.payload,
      };
    },
    deleteMediaStatus: (state, action) => {
      delete state.userMediaStatus[action.payload];
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setPeerConnections: (state, action) => {
      state.peerConnections = action.payload;
    },
    setMediaStatus: (state, action) => {
      state.userMediaStatus = action.payload;

      // Object.entries(action.payload).forEach(([userId, val]) => {
      //   const userMuteIcon = document.querySelector(
      //     `#remoteVideo_${userId} .icon-mic-off`
      //   );
      //
      //   const userVideoIcon = document.querySelector(
      //     `#remoteVideo_${userId} .icon-video-off`
      //   );
      //
      //   if (val.isMicOn) {
      //     userMuteIcon.classList.add("hidden");
      //   } else {
      //     userMuteIcon.classList.remove("hidden");
      //   }
      //
      //   if (val.isVideoOn) {
      //     userVideoIcon.classList.add("hidden");
      //   } else {
      //     userVideoIcon.classList.remove("hidden");
      //   }
      // });
    },
    setMyVideoStatus: (state, action) => {
      const prevUserMediaStatus = state.userMediaStatus[
        action.payload.userId
      ] ?? {
        isVideoOn: true,
        isMicOn: true,
      };

      state.userMediaStatus = {
        ...state.userMediaStatus,
        [action.payload.userId]: {
          ...prevUserMediaStatus,
          isVideoOn: action.payload.status,
        },
      };

      // emit event for other video call members
      const socket = action.payload.socket;
      socket.emit("webrtcUpdateUserMedia", {
        userMediaStatus: state.userMediaStatus,
        channelID: action.payload.channelID,
      });

      // if video is on, hide video off icon else show it
      // const videoOffIcon = document.querySelector(
      //   "#localVideoContainer .icon-video-off"
      // );
      // if (action.payload.status) {
      //   videoOffIcon.classList.add("hidden");
      // } else {
      //   videoOffIcon.classList.remove("hidden");
      // }
    },
    setMyMicStatus: (state, action) => {
      const prevUserMediaStatus = state.userMediaStatus[
        action.payload.userId
      ] ?? {
        isVideoOn: true,
        isMicOn: true,
      };

      state.userMediaStatus = {
        ...state.userMediaStatus,
        [action.payload.userId]: {
          ...prevUserMediaStatus,
          isMicOn: action.payload.status,
        },
      };

      // emit event for other video call members
      const socket = action.payload.socket;
      socket.emit("webrtcUpdateUserMedia", {
        userMediaStatus: state.userMediaStatus,
        channelID: action.payload.channelID,
      });

      // add mute icon beside user name label
      // const micOffIcon = document.querySelector(
      //   "#localVideoContainer .icon-mic-off"
      // );
      // // if mic is on, hide mic off icon else show it
      // if (action.payload.status) {
      //   micOffIcon.classList.add("hidden");
      // } else {
      //   micOffIcon.classList.remove("hidden");
      // }
    },
    setVideoRingingPortalOpen: (state, action) => {
      state.isVideoRingingPortalOpen = action.payload;
    },
    setVoicePortalOpen: (state, action) => {
      state.isVoicePortalOpen = action.payload;
    },
    setVideoPortalOpen: (state, action) => {
      state.isVideoPortalOpen = action.payload;
    },
  },
});

export default videoCallSlice.reducer;
export const {
  setInitialMediaStatus,
  setMyVideoStatus,
  setMyMicStatus,
  setMediaStatus,
  deleteMediaStatus,
  setLocalStream,
  // setPeerConnections,
  setVideoRingingPortalOpen,
  setVoicePortalOpen,
  setVideoPortalOpen,
} = videoCallSlice.actions;

export const selectUserMediaStatus = (state) => state.videoCall.userMediaStatus;

export const useUserMediaStatus = () => {
  const userMediaStatus = useSelector(selectUserMediaStatus);
  return useMemo(() => userMediaStatus, [userMediaStatus]);
};

const selectPeerConnections = (state) => state.videoCall.peerConnections;

export const usePeerConnections = () => {
  const peerConnections = useSelector(selectPeerConnections);
  return useMemo(() => peerConnections, [peerConnections]);
};

const selectVideoRingingPortalOpen = (state) => state.videoCall.isVideoRingingPortalOpen;

export const useVideoRingingPortalOpen = () => {
    const isVideoRingingPortalOpen = useSelector(selectVideoRingingPortalOpen);
    return useMemo(() => isVideoRingingPortalOpen, [isVideoRingingPortalOpen]);
};

const selectVoicePortalOpen = (state) => state.videoCall.isVoicePortalOpen;

export const useVoicePortalOpen = () => {
  const isVoicePortalOpen = useSelector(selectVoicePortalOpen);
  return useMemo(() => isVoicePortalOpen, [isVoicePortalOpen]);
};

const selectVideoPortalOpen = (state) => state.videoCall.isVideoPortalOpen;

export const useVideoPortalOpen = () => {
  const isVideoPortalOpen = useSelector(selectVideoPortalOpen);
  return useMemo(() => isVideoPortalOpen, [isVideoPortalOpen]);
};
