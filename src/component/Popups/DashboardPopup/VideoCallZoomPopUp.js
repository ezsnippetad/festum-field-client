import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useProfileGets } from "../../../redux/Slice/profileSlice";
import { useFriendRequestFromId } from "../../../redux/Slice/requestSlice";
import socket from '../../../socket';
//import { useSocket } from "../../../redux/Slice/socketSlice";
import { setMyMicStatus, setMyVideoStatus, useUserMediaStatus, setLocalStream } from "../../../redux/Slice/videoCallSlice";
import { setCurrentCall, setCallAccepted, setCurrentCallProfile, useGroupVideoCall, useCurrentCall, useCurrentCallProfile, useGroupCallStarted, chatCallStart, chatCallEnd } from "../../../redux/Slice/callSlice";
import { useCurrentChatUser} from "../../../redux/Slice/chatSlice";
import store from "../../../redux/store";
import { useQuery } from "../../../utils";
import GroupVideoCall from "../../VideoCall/GroupVideoCall";
import GroupCall from "../../VideoCall/GroupCall";

export default function VideoCallZoomPopUp({ handleClose }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profileGets = useProfileGets();
  const friendsProfile = useCurrentCallProfile();
  //const { socket } = useSocket();
  let memberIds = friendsProfile?.members?.map((item) => item._id._id);
  const userId = profileGets?._id;
  const userMediaStatus = useUserMediaStatus();
  const useCurrentCallData = useCurrentCall();
  const channelID = friendsProfile?._id?.toUpperCase();
  const isGroupCall = useGroupCallStarted();
  const isGroupVideoCall = useGroupVideoCall();
  if (!memberIds) {
    memberIds = [userId, friendsProfile?._id];
  }

  // useEffect(() => {
  //   console.log("memberIds", memberIds);
  // }, []);

  const endVideoCall = useCallback(async () => {
        if (useCurrentCallData !== null) {
            const payload = {
                callid: useCurrentCallData
            }
            try {
                const response = await dispatch(chatCallEnd(payload)).unwrap();
                if (response?.data?.IsSuccess) {
                    dispatch(setCurrentCall(null));
                    dispatch(setCurrentCallProfile(null));
                    dispatch(setCallAccepted(false));
                    socket.emit("endCall", {
                        id: friendsProfile?._id,
                    });
                    handleClose(true);
                }
            } catch (error) {
                console.log(error);
            }

        } else {
            socket.emit("endCall", {
                id: friendsProfile?._id,
            });
            const localStream = store.getState()?.videoCall?.localStream;
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
                store.dispatch(setLocalStream(null));
            }
            handleClose(true);
        }

  }, [dispatch, profileGets, socket, userId, useCurrentCallData]);

  const startVideoCallAction = async (data) => {
         console.log("Video Call Start Data");
         console.log(data);
         console.log("Video Call Start Data");
        //alert('Video Call Start API');
        try {
            const response = await dispatch(chatCallStart(data)).unwrap();
            console.log('Video Call Accept start response');
            console.log(response?.data?.Data);
            console.log('call id');
            console.log(response?.data?.Data?._id);
            if (response?.data?.IsSuccess) {
                dispatch(setCurrentCall(response?.data?.Data?._id));
            }
        } catch (error) {
            console.log(error);
        }
  }

  useEffect(() => {
      const handleVideoCallAccepted = (message) => {
          console.log("test event in video call", message);
          // if (message.event === 'incomingCall') {
          //     console.log(message.data);
          //     const startCallData ={
          //         from: userId, //user id
          //         to: friendsProfile?._id, // user or group id
          //         isVideoCall: message.data.isVideoCall,
          //         isGroupCall: message.data.isGroupCall,
          //         isAudioCall: true,
          //         status: ""
          //     };
          //     //startVideoCallAction(startCallData);
          // }
          if (message.event === 'onCallEnded') {
              const localStream = store.getState()?.videoCall?.localStream;
              if (localStream) {
                  localStream.getTracks().forEach((track) => track.stop());
                  store.dispatch(setLocalStream(null));
              }
              handleClose(true);
          }
          if (message.event === 'onMemberExitGroupCall') {
              handleClose(true);
          }
      };

      if (profileGets?.channelID && socket) {
          socket.on(profileGets.channelID, handleVideoCallAccepted);
      }

      return () => {
          if (profileGets?.channelID && socket) {
              socket.off(profileGets.channelID, handleVideoCallAccepted);
              // const localStream = store.getState()?.videoCall?.localStream;
              // if (localStream) {
              //     localStream.getTracks().forEach((track) => track.stop());
              //     store.dispatch(setLocalStream(null));
              // }
          }
      };
  }, [profileGets?.channelID, socket, userId, friendsProfile?._id, startVideoCallAction])

  function micToggle(isMicOn) {
    const localStream = store.getState()?.videoCall?.localStream;
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = isMicOn;
    });
    store.dispatch(
      setMyMicStatus({
        userId: profileGets._id,
        status: isMicOn,
        channelID: channelID,
        socket: socket,
      })
    );
  }

  function videoToggle(isVideoOn) {
    const localStream = store.getState()?.videoCall?.localStream;
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = isVideoOn;
    });
    store.dispatch(
      setMyVideoStatus({
        userId: profileGets._id,
        status: isVideoOn,
        channelID: channelID,
        socket: socket,
      })
    );
  }
    const handleGroupLeavePopup = (data) => {
        if (data === 1) {
            endVideoCall();
        } else {
            handleClose(true);
        }
    };

  return (
    <>
    {isGroupCall ? <GroupCall memberIds={memberIds} memberExitGroup={handleGroupLeavePopup} isVideoCall={isGroupVideoCall}/> :
        <div id="video-pop"
             className="mytest absolute top-full shadow-one right-5 z-50 space-y-5 bg-[#c1c1c1] min-w-[375px] rounded-lg py-10 overflow-hidden open fix-open">
            <GroupVideoCall isVideoCall={true}/>
    <div className="flex space-x-3 justify-center call-btns">
          <span onClick={() => videoToggle(!userMediaStatus[userId] ?.isVideoOn)}
                className="cursor-pointer text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg">
            {userMediaStatus[userId] ?.isVideoOn ? (<i className="icon-video-on" aria-hidden="true"></i>) : (<i className="icon-video-off" aria-hidden="true"></i>)}
          </span>
        <span onClick={() => micToggle(!userMediaStatus[userId] ?.isMicOn)}
              className="cursor-pointer text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
            {userMediaStatus[userId] ?.isMicOn ? (<i className="icon-mic-on" aria-hidden="true"></i>) : (<i className="icon-mic-off" aria-hidden="true"></i>)}
          </span>
        <span
            className="cursor-pointer text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red text-chatlook-gray rounded-lg hover:bg-chatlook-red"
            onClick={endVideoCall}>
            <i className="icon-disconnect-call text-white" aria-hidden="true"></i>
          </span>
    </div>
    </div>}

    </>
  );
}
