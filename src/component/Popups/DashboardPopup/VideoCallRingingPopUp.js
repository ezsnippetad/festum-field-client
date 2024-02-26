import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useProfileGets } from "../../../redux/Slice/profileSlice";
import { useFriendRequestFromId } from "../../../redux/Slice/requestSlice";
import socket from '../../../socket';
//import { useSocket } from "../../../redux/Slice/socketSlice";
import { setVideoPortalOpen, setMyMicStatus, useUserMediaStatus, setLocalStream} from "../../../redux/Slice/videoCallSlice";
import { setCurrentCall, useCurrentCall, useCurrentCallProfile, useGroupCallStarted, chatCallStart, chatCallEnd } from "../../../redux/Slice/callSlice";
import { useCurrentChatUser } from "../../../redux/Slice/chatSlice";
import store from "../../../redux/store";
import User from "../../../assets/images/user.png";
export default function VideoCallRingingPopUp({ handleClose }) {
    const { id } = useParams();
    const [isMinimized, setIsMinimized] = useState(false);
    const dispatch = useDispatch();
    const profileGets = useProfileGets();
    const friendsProfile = useCurrentCallProfile();
    const isGroupCall = useGroupCallStarted();
    //const { socket } = useSocket();
    let memberIds = friendsProfile?.members?.map((item) => item._id._id);
    const userId = profileGets?._id;
    const userMediaStatus = useUserMediaStatus();
    const useCurrentCallData = useCurrentCall();
    const channelID = friendsProfile?._id?.toUpperCase();
    const endCallTimeout = 30000;

    if (!memberIds) {
        memberIds = [userId, friendsProfile?._id];
    }

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

    const endVoiceCall = useCallback(async () => {
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

    const toggleSize = () => {
        setIsMinimized(!isMinimized);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            endVoiceCall();
        }, endCallTimeout);

        const handleCallAccepted = (message) => {
            console.log("test event ringing", message);
            if (message.event === 'onCallAccepted') {
                //alert("call here")
                dispatch(setCurrentCall(message?.data?.callid));
                dispatch(setVideoPortalOpen(true));
                handleClose(true);
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
        };

        if (profileGets?.channelID && socket) {
            socket.on(profileGets.channelID, handleCallAccepted);
        }


        return () => {
            if (profileGets?.channelID && socket) {
                clearTimeout(timeoutId);
                socket.off(profileGets.channelID, handleCallAccepted);
                const localStream = store.getState()?.videoCall?.localStream;
                if (localStream) {
                    localStream.getTracks().forEach((track) => track.stop());
                    store.dispatch(setLocalStream(null));
                }
            }
        };
    }, [profileGets?.channelID, socket, userId, friendsProfile?._id, endVoiceCall]);

    return (
        <>
        <div id="call-pop"
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
                <h4 className="text-chatlook-gray font-light">Ringing...</h4>
            </div>
            <div className="flex space-x-3 justify-center call-btns">
          <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg">
            <i className="icon-video-on" aria-hidden="true"></i>
          </span>
                {/*<span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">*/}
            {/*<i className="icon-speaker" aria-hidden="true"></i>*/}
          {/*</span>*/}
                <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
            <i className="icon-mic-off" aria-hidden="true"></i>
          </span>
                <span
                    className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red text-chatlook-gray rounded-lg hover:bg-chatlook-red"
                    onClick={endVoiceCall}
                >
            <i className="icon-disconnect-call text-white" aria-hidden="true"></i>
          </span>
            </div>
            <span onClick={toggleSize} className={`text-xl text-chatlook-gray absolute right-5 top-0 cursor-pointer ${isMinimized ? 'icon-zoom-out' : ' icon-full-screen'}`}
            ></span>
        </div>
        </>
    );
}
