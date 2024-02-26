import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import Modal from "../Common/Modals/Modal";
import IncomingCall from "../component/Popups/DashboardPopup/IncomingCall";
import VideoCallRingingPopUp from "../component/Popups/DashboardPopup/VideoCallRingingPopUp";
import VideoCallZoomPopUp from "../component/Popups/DashboardPopup/VideoCallZoomPopUp";
import VoiceCallPopUp from "../component/Popups/DashboardPopup/VoiceCallPopUp";
import { Context } from "../createContext";
import { useProfileGets } from "../redux/Slice/profileSlice";
import {
  friendsRequestsSearch,
  gropusRequestsSearch,
  setMyNewFriedList,
  setMyNewGroupList,
  useFriendsRequests,
} from "../redux/Slice/requestSlice";
import socket from '../socket';
import { setOnlineUsers } from "../redux/Slice/socketSlice";
import { setCurrentCall } from "../redux/Slice/callSlice";
import {
  setVideoRingingPortalOpen,
  setVideoPortalOpen,
  setVoicePortalOpen,
  setLocalStream,
  useVideoRingingPortalOpen,
  useVideoPortalOpen,
  useVoicePortalOpen,
  setMediaStatus,
} from "../redux/Slice/videoCallSlice";
import { useCurrentCallProfile } from "../redux/Slice/callSlice";
import { setSocketChatUser } from "../redux/Slice/chatSlice";
import { deleverMessage, deliverMessage } from "../redux/Slice/messageSlice";

const SocketContext = createContext(null);
export const SocketProvider = (props) => {
  const profileGets = useProfileGets();
  const dispatch = useDispatch();
 // const { socket } = useSocket();
  //const friendsRequests = useFriendsRequests();
  const friendsProfile = useCurrentCallProfile();
  const [incomingCallData, setIncomingCallData] = useState(null);
  const [isIncomingCallPopupOpen, setIsIncomingCallPopupOpen] = useState(false);

  const isVideoRingingPortalOpen = useVideoRingingPortalOpen();
  const isVideoPortalOpen = useVideoPortalOpen();
  const isAudioPortalOpen = useVoicePortalOpen();

  const localStream = useSelector(state => state.videoCall.localStream);
  const groupIds = friendsProfile?.members?.map((item) => item._id._id);
  //console.log(groupIds);


  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected with server socket");
      console.log(`Connected with socket ID: ${socket.id}`);
    });

    if (profileGets?.channelID) {
      socket.emit("init", {
        channelID: profileGets?.channelID,
      });
      socket.on(profileGets?.channelID, (parentkey) => {
        ////console.log("yes socket event is received based on chhanelID");
        //console.log("listen in socketProvider", parentkey);

        if (parentkey.event === "onCallStarted") {
          dispatch(setCurrentCall(parentkey?.data?.callid));
        }

        if (parentkey.event === "onCallEnded") {
          dispatch(setCurrentCall(null));
          const localStream = store.getState()?.videoCall?.localStream;

          if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            store.dispatch(setLocalStream(null));
          }
        }

        if (parentkey.event === "onGroupCallStarted") {
          dispatch(setCurrentCall(parentkey?.data?.callid));
        }

        // if (parentkey.event === "onIncomingChat") {
        //   dispatch(deliverMessage({ messageid: parentkey?.data?._id }))
        // }
      });
    }

    socket.on("incomingCall", (incomingCallData) => {
      console.log("-------IncomingCallData---------");
        console.log(incomingCallData);
      console.log("-------IncomingCallData---------");
      setIsIncomingCallPopupOpen(true);
      setIncomingCallData(incomingCallData);
    });

    socket.on("endCall", () => {
      const localStream = store.getState()?.videoCall?.localStream;
      if (localStream) {
         localStream.getTracks().forEach((track) => track.stop());
         dispatch(setLocalStream(null));
      }
      setIsIncomingCallPopupOpen(false);
      dispatch(setVideoPortalOpen(false));
      dispatch(setVideoPortalOpen(false));
      // @TODO: figure out better way to end call
      //window.location.reload();
    });

    socket.on("webrtcUpdateUserMedia", (message) => {
      // const { userMediaStatus, channelID } = message;
      const { userMediaStatus } = message;
      dispatch(setMediaStatus(userMediaStatus));
    });

    socket.on("userConnected", ({ channelID, onlineUsers }) => {
      //console.log("userConnected", onlineUsers);
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("offline", ({ userId, onlineUsers }) => {
      //console.log("offline", onlineUsers);
      dispatch(setOnlineUsers(onlineUsers));
    });
  }, [profileGets?.channelID, socket]);

  useEffect(() => {
    //console.log("groupIds in socketProvider", groupIds);
    // if (groupIds?.length > 0) {
    //   socket.emit("joinGroups", {
    //     groupIds,
    //   });
    // }
  }, [groupIds, friendsProfile]);

  const handleCloseVideoRingingPopup = useCallback((data) => {
    dispatch(setVideoRingingPortalOpen(false));
  }, []);

  const handleCloseVideoPopup = useCallback((data) => {
      const localStream = store.getState()?.videoCall?.localStream;
      if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
          dispatch(setLocalStream(null));
      }
      dispatch(setVideoPortalOpen(false));
      //window.location.reload();
  }, [localStream, dispatch]);

  const handleCloseVoicePopup = useCallback((data) => {
    dispatch(setVoicePortalOpen(false));
  }, []);

  return (
    <SocketContext.Provider value={""}>
      {props.children}
      <Modal isOpen={isIncomingCallPopupOpen}>
        <IncomingCall
          incomingCallData={incomingCallData}
          setIsIncomingCallPopupOpen={setIsIncomingCallPopupOpen}
        />
      </Modal>
      <Modal isOpen={isVideoRingingPortalOpen}>
        <VideoCallRingingPopUp handleClose={handleCloseVideoRingingPopup} />
      </Modal>
      <Modal isOpen={isVideoPortalOpen}>
        <VideoCallZoomPopUp handleClose={handleCloseVideoPopup} />
      </Modal>
      {isAudioPortalOpen && (
        <VoiceCallPopUp handleClose={handleCloseVoicePopup} />
      )}
    </SocketContext.Provider>
  );
};
