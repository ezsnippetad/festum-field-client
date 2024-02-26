import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStopwatch } from 'react-timer-hook';
import { useDispatch, useSelector } from "react-redux";
import { useProfileGets } from "../../../redux/Slice/profileSlice";
import { useFriendRequestFromId } from "../../../redux/Slice/requestSlice";
import socket from '../../../socket';
//import { useSocket } from "../../../redux/Slice/socketSlice";
import { setMyMicStatus, useUserMediaStatus, setLocalStream} from "../../../redux/Slice/videoCallSlice";
import { setCallAccepted, setCurrentCall, useCallAccepted, useCurrentCall, useCurrentCallProfile, useGroupCallStarted, chatCallStart, chatCallEnd } from "../../../redux/Slice/callSlice";
import { useCurrentChatUser } from "../../../redux/Slice/chatSlice";
import store from "../../../redux/store";
import GroupVideoCall from "../../VideoCall/GroupVideoCall";
import GroupCall from "../../VideoCall/GroupCall";

export default function VoiceCallPopUp({handleClose}) {
  const { id } = useParams();
  const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, reset} = useStopwatch({ autoStart: false });
  const [startCallTimer, setStartCallTimer] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dispatch = useDispatch();
  const profileGets = useProfileGets();
  const friendsProfile = useCurrentCallProfile();
  const isGroupCall = useGroupCallStarted();
  //const { socket } = useSocket();
  let memberIds = friendsProfile?.members?.map((item) => item._id._id);
  const userId = profileGets?._id;
  const userMediaStatus = useUserMediaStatus();
  const useCallAcceptedData = useCallAccepted();
  const useCurrentCallData = useCurrentCall();
  const channelID = friendsProfile?._id?.toUpperCase();
  const endCallTimeout = 30000;

  if (!memberIds) {
    memberIds = [userId, friendsProfile?._id];
  }

  const toggleSize = () => {
        setIsMinimized(!isMinimized);
  };

  function micToggle(isMicOn) {
      const localStream = store.getState()?.videoCall?.localStream;
      localStream.getAudioTracks().forEach((track) => {
          track.enabled = isMicOn;
      });
      store.dispatch(
          setMyMicStatus({
              userId: profileGets?._id,
              status: isMicOn,
              channelID: channelID,
              socket: socket,
          })
      );
  }

  const formatTime = (time) => {
        return String(time).padStart(2, '0')
  }

  const endVoiceCall = useCallback(async () => {
      if (useCurrentCallData !== null) {
          const payload = {
              callid: useCurrentCallData
          }
          try {
              const response = await dispatch(chatCallEnd(payload)).unwrap();
              if (response?.data?.IsSuccess) {
                  dispatch(setCurrentCall(null));
                  dispatch(setCallAccepted(false));
                  reset();
                  setStartCallTimer(false);
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
      const localStream = store.getState()?.videoCall?.localStream;
      if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
          store.dispatch(setLocalStream(null));
      }
  }, [dispatch, profileGets, socket, userId, useCurrentCallData]);

  useEffect(() => {
      const timeoutId = setTimeout(() => {
          if(!useCallAcceptedData) {
              alert("data");
              endVoiceCall();
          }
      }, endCallTimeout);

        const handleCallAccepted = (message) => {
            console.log("test event in voice call", message);
            if (message.event === 'onCallAccepted') {
                //alert("call accepted in voicecallpopup")
                dispatch(setCurrentCall(message?.data?.callid));
                dispatch(setCallAccepted(true));
                start();
                setStartCallTimer(true);
                clearTimeout(timeoutId);
            }

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
            socket.on(profileGets.channelID, handleCallAccepted);
            if (useCallAcceptedData) {
                start();
                setStartCallTimer(true);
            }
        }

        return () => {
            if (profileGets?.channelID && socket) {
                ///clearTimeout(timeoutId);
                socket.off(profileGets.channelID, handleCallAccepted);
                // const localStream = store.getState()?.videoCall?.localStream;
                // if (localStream) {
                //     localStream.getTracks().forEach((track) => track.stop());
                //     store.dispatch(setLocalStream(null));
                // }
            }
            clearTimeout(timeoutId);
        };
    }, [profileGets?.channelID, socket, userId, friendsProfile?._id, useCurrentCallData, endVoiceCall]);

    const handleGroupLeavePopup = useCallback((data) => {
        //alert(data);
    }, []);

  return (
    <>
    {isGroupCall ? <GroupCall memberIds={memberIds} memberExitGroup={handleGroupLeavePopup} isVideoCall={false}/> :
      <div
        id="call-pop"
        className={`${isMinimized ? 'absolute top-full shadow-one right-5 z-20 space-y-5 bg-white min-w-[375px] rounded-lg py-10 open fix-open' : 'absolute top-0 translate-y-2 shadow-one right-5 z-20 space-y-5 bg-white min-w-[375px] rounded-lg py-10 open'}`}
      >
        <div className="w-28 h-28 border-4 border-white bg-slate-200 rounded-full mx-auto overflow-hidden flex justify-center">
            {friendsProfile?.profileimage ? (
                <img
                src={`https://festumfield.s3.ap-south-1.amazonaws.com/${friendsProfile?.profileimage}`}
                className="object-cover w-full h-full"
                alt="user"
                />
                ) : (
                <div className="icon-user h-full w-full text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"></div>
                )}
        </div>
        <div className="user-name text-center space-y-2">
          <h3 className="">{friendsProfile?.fullName ? friendsProfile?.fullName : friendsProfile?.name}</h3>
            {startCallTimer ? (
                <p className="text-center pt-[15px] inline-block text-chatlook-dark justify-center">
                    <span className="text-base text-chatlook-dark px-0.5">
                        {formatTime(hours)}
                    </span>
                    :
                    <span className="text-base text-chatlook-dark px-0.5">
                        {formatTime(minutes)}
                    </span>
                    :
                    <span className="text-base text-chatlook-dark px-0.5">
                        {formatTime(seconds)}
                    </span>
                </p>
            ) : (<h4 className="text-chatlook-gray font-light">Ringing...</h4>)}

        </div>
              <GroupVideoCall isVideoCall={false} />
        <div className="flex space-x-3 justify-center call-btns">
          {/* <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg" onClick={() => setIsVoiceCallZoomPopUpOpen(true)}>
                        <i className="icon-video-calling" aria-hidden="true"></i>
                    </span> */}
          {/* <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
            <i className="icon-speaker" aria-hidden="true"></i>
          </span> */}
          <span
            onClick={() => micToggle(!userMediaStatus[userId]?.isMicOn)}
            className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg cursor-pointer"
          >
            {userMediaStatus[userId]?.isMicOn ? (
              <i className="icon-mic-on" aria-hidden="true"></i>
            ) : (
              <i className="icon-mic-off" aria-hidden="true"></i>
            )}
          </span>
          <span
            onClick={endVoiceCall}
            className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red text-chatlook-gray rounded-lg hover:bg-chatlook-red"
          >
            <i className="icon-disconnect-call text-white" aria-hidden="true"></i>
          </span>
        </div>
        <span onClick={toggleSize} className={`text-xl text-chatlook-gray absolute right-5 top-0 cursor-pointer ${isMinimized ? 'icon-zoom-out' : ' icon-full-screen'}`}
        ></span>
      </div>}
    </>
  );
}
