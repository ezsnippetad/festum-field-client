import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import socket from '../../../socket';
import store from "../../../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TeamsRingtone from "../../../assets/teams.mp3";
import { useFriendsRequests, getSingleFriend } from "../../../redux/Slice/requestSlice";
import { getSingleGroup } from "../../../redux/Slice/chatSlice";
//import { useSocket } from "../../../redux/Slice/socketSlice";
import { setVideoPortalOpen, setVoicePortalOpen, setLocalStream} from "../../../redux/Slice/videoCallSlice";
import { setCallAccepted, setCurrentCallProfile, setGroupCallStarted, setCurrentCall, useCurrentCall, useCurrentCallProfile, chatCallAccept, chatCallEnd } from "../../../redux/Slice/callSlice";
import { useProfileGets } from "../../../redux/Slice/profileSlice";

export default function IncomingCall({incomingCallData, setIsIncomingCallPopupOpen}) {
  const { fromId, name, isVideoCall, isGroupCall, groupId } = incomingCallData;
  const profileGets = useProfileGets();
    const friendsProfile = useCurrentCallProfile();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { socket } = useSocket();
  const [profile, setProfile] = useState();
  const useCurrentCallData = useCurrentCall();
  const AudioRef = useRef();

  const getFromProfile = async () => {
        if(isGroupCall) {
            const payload = {
                groupid: groupId
            }
            try {
                const response = await dispatch(getSingleGroup(payload)).unwrap();
                setProfile(response?.data?.Data);
                dispatch(setCurrentCallProfile(response?.data?.Data));
            } catch (error) {
                console.log(error);
            }
        } else {
            const payload = {
                friendid: fromId
            }
            try {
                const response = await dispatch(getSingleFriend(payload)).unwrap();
                setProfile(response?.data?.Data);
                dispatch(setCurrentCallProfile(response?.data?.Data));
            } catch (error) {
                console.log(error);
            }
        }

    }
  useEffect(() => {
      getFromProfile();
  }, [])

  useEffect(() => {
    AudioRef?.current?.play();

    return () => {
      AudioRef?.current?.pause();
    };
  }, []);

   const callAcceptAction = useCallback(async () => {
        // console.log("Call Start Data");
        console.log(useCurrentCallData);
        const payload = {
            callid: useCurrentCallData
        }
        try {
            const response = await dispatch(chatCallAccept(payload)).unwrap();
            if (response?.data?.IsSuccess) {
                dispatch(setGroupCallStarted(isGroupCall));
                dispatch(setCallAccepted(true));
                setIsIncomingCallPopupOpen(false);
                if (isGroupCall) {
                  navigate(`/dashboard/chats/chatdetails/${groupId}?type=group`);
                } else {
                  navigate(`/dashboard/chats/chatdetails/${fromId}`);
                }
                if (isVideoCall) {
                  dispatch(setVideoPortalOpen(true));
                } else {
                  dispatch(setVoicePortalOpen(true));
                }
            } else {
                alert(response?.data?.Message);
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, useCurrentCallData]);

  const endIncomingCall = useCallback(async () => {
        console.log(useCurrentCallData);
        if (useCurrentCallData !== null) {
            const payload = {
                callid: useCurrentCallData
            }
            try {
                const response = await dispatch(chatCallEnd(payload)).unwrap();
                if (response?.data?.IsSuccess) {
                    dispatch(setCurrentCall(null));
                    socket.emit("endCall", {
                        id: friendsProfile?._id,
                    });
                    const localStream = store.getState()?.videoCall?.localStream;
                    if (localStream) {
                        localStream.getTracks().forEach((track) => track.stop());
                        store.dispatch(setLocalStream(null));
                    }
                    setIsIncomingCallPopupOpen(false);
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
            setIsIncomingCallPopupOpen(false);
        }
        const localStream = store.getState()?.videoCall?.localStream;
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            store.dispatch(setLocalStream(null));
        }
    }, [dispatch, socket, useCurrentCallData]);

  return (
    <div className="absolute top-[72px] translate-y-2 shadow-one right-5 z-20 space-y-5 bg-white min-w-[375px] rounded-lg">
      <audio src={TeamsRingtone} loop ref={AudioRef} />
      <div className="md:w-[376px] bg-white p-8 rounded-[15px] mx-auto">
        <div className="w-28 h-28 border-4 border-white bg-slate-200 rounded-full mx-auto overflow-hidden flex justify-center">
            {profile?.profileimage ? (
                <img
                    src={`https://festumfield.s3.ap-south-1.amazonaws.com/${profile?.profileimage}`}
                    className="object-cover w-full h-full"
                    alt="user"
                />
            ) : (
                <div className="icon-user h-full w-full text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"></div>
            )}
        </div>
        <div className="user-name text-center space-y-2">
          <h3 className="">{name}</h3>
          <h4 className="text-chatlook-gray font-light">Incoming Call...</h4>
        </div>
        <div className="flex space-x-6 justify-center call-btns mt-12">
          <span className="text-2xl w-12 h-12 flex items-center justify-center shadow  bg-green-500 text-chatlook-gray cursor-pointer rounded-lg"
            onClick={() => {
                console.log('emit answerCall Call function');
               //  socket.emit("answerCall", {
               //      memberIds: null,
               //      fromId: fromId,
               //      name: name,
               //      isVideoCall: isVideoCall,
               //      isGroupCall: isGroupCall,
               //      groupId: groupId ? groupId : null,
               // });
                callAcceptAction();
            }}
          >
            <i className="icon-call-receive text-white" aria-hidden="true"></i>
          </span>
          <span
            onClick={() => {endIncomingCall();}}
            className="text-xl w-12 h-12 flex items-center justify-center bg-chatlook-red text-chatlook-gray cursor-pointer rounded-lg"
          >
            <i className="icon-disconnect-call text-white" aria-hidden="true"></i>
          </span>
        </div>
        {/*<span*/}
          {/*className="icon-full-screen text-xl absolute right-5 top-5 cursor-pointer"*/}
          {/*onclick="addFunction1('upcomming-pop', 'fix-open')"*/}
        {/*></span>*/}
        {/*<span*/}
          {/*className="icon-zoom-out text-xl absolute right-5 top-5 cursor-pointer hidden"*/}
          {/*onclick="removeFunction('upcomming-pop', 'fix-open')"*/}
        {/*></span>*/}
      </div>
    </div>
  );
}

