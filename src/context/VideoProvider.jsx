import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Peer from "simple-peer";
import { useProfileGets } from "../redux/Slice/profileSlice";
import socket from '../socket';
//import { useSocket } from "../redux/Slice/socketSlice";
import { CenterInfo, Secondary } from "../redux/services/toastServices";

const VideoContext = createContext();

export const useVideo = () => {
  const video = useContext(VideoContext);
  return video;
};

const VideoProvider = ({ children }) => {
  //const { socket } = useSocket();
  const profileGets = useProfileGets();

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [chat, setChat] = useState([]);
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [userName, setUserName] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [myVdoStatus, setMyVdoStatus] = useState(true);
  const [userVdoStatus, setUserVdoStatus] = useState();
  const [myMicStatus, setMyMicStatus] = useState(true);
  const [userMicStatus, setUserMicStatus] = useState();
  const [msgRcv, setMsgRcv] = useState("");
  const [screenShare, setScreenShare] = useState(false);
  const [isVideoCallZoomPopUpOpen, setIsVideoCallZoomPopUpOpen] =
    useState(false);
  const [isVoiceCallPopUpOpen, setIsVoiceCallPopUpOpen] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // if (localStorage.getItem("name")) {
    //     setName(localStorage.getItem("name"));
    // }
    // socket.on("me", (id) => setMe(id));

    socket.on("endCall", () => {
      //CenterInfo("Call ended.");
        setCallEnded(true);
    });

    socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
      console.log("updateUserMedia", currentMediaStatus);
      if (currentMediaStatus !== null || currentMediaStatus !== undefined) {
        switch (type) {
          case "video":
            setUserVdoStatus(currentMediaStatus);
            break;
          case "mic":
            setUserMicStatus(currentMediaStatus);
            break;
          default:
            //setUserMicStatus(currentMediaStatus[0]);
            //setUserVdoStatus(currentMediaStatus[1]);
            break;
        }
      }
    });

    socket.on("callUser", ({ from, name: callerName, signal, isVideoCall }) => {
      console.log("receiving call from; ", {
        from,
        name: callerName,
        signal,
        isVideoCall,
      });
      // AudioRef?.current?.play()
      setOtherUser(from);
      setCall({
        isReceivingCall: true,
        from,
        name: callerName,
        signal,
        isVideoCall,
      });
    });
  }, []);

  useEffect(() => {
    if (profileGets?.channelID) {
      setMe(profileGets.channelID);
    }
  }, [profileGets?.channelID]);

  const initializeMySteam = async ({enableVideo = true, enableAudio = true} = {}) => {
    console.log("enableVideo", enableVideo, "enableAudio", enableAudio);
    navigator.mediaDevices.getUserMedia({ video: enableVideo, audio: enableAudio }).then((currentStream) => {
        console.log("Set Stream Own Side");
        setStream(currentStream);
        console.log("Audio tracks: ", currentStream.getAudioTracks());
        myVideo.current.srcObject = currentStream;
   }).catch((e) => {
        Secondary(`Camera or Mic is not available or permission denied. Please try with other device.`);
        setIsVideoCallZoomPopUpOpen(false);
        setIsVoiceCallPopUpOpen(false);
        console.error("Device access error: ", e);
    });
  };

  const answerCall = () => {
    //setCallAccepted(true);
    setOtherUser(call.from);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: { iceServers: [{ urls: "stun:stun.festumevento.com:8443" }] },
    });

    peer.on("signal", (data) => {
      console.log("answerCall signal", data);
      //alert("answerCall signal", data);
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        userName: name,
        type: "both",
        myMediaStatus: [myMicStatus, myVdoStatus],
      });
    });

    peer.on("stream", (currentStream) => {
      console.log("receiving stream from user side", currentStream);
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    console.log(connectionRef.current);
  };

  const callUser = (from, to, isVideoCall = true) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: { iceServers: [{ urls: "stun:stun.festumevento.com:8443" }] },
    });
    console.log("call user : ", from, "-->", to);
    setOtherUser(to);
    peer.on("signal", (data) => {
      console.log("callUser signal", data);
      socket.emit("callUser", {
        userToCall: to,
        signalData: data,
        from,
        name,
        isVideoCall,
      });
    });

    peer.on("stream", (currentStream) => {
      console.log("callUser receiving stream from user video", currentStream);
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", ({ signal, userName }) => {
      console.log("callAccepted", signal, userName);
      //alert("callAccepted", signal, userName);
      //setCallAccepted(true);
      setUserName(userName);
      peer.signal(signal);
      socket.emit("updateMyMedia", {
        type: "both",
        currentMediaStatus: [myMicStatus, myVdoStatus],
      });
    });

    connectionRef.current = peer;
    console.log("callUser connectionRef.current", connectionRef.current);
  };

  const updateVideo = () => {
    setMyVdoStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "video",
        currentMediaStatus: !currentStatus,
      });
      stream.getVideoTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  };

  const updateMic = () => {
    setMyMicStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "mic",
        currentMediaStatus: !currentStatus,
      });
      stream.getAudioTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  };

  //full screen
  const fullScreen = (e) => {
    const elem = e.target;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current?.destroy();
    socket.emit("endCall", { id: otherUser });
    // AudioRef?.current?.pause()
    window.location.reload();
  };

  const leaveCall1 = () => {
    socket.emit("endCall", { id: otherUser });
  };

  return (
    <VideoContext.Provider
      value={{
        call,
        callAccepted,
        initializeMySteam,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        setMe,
        callUser,
        leaveCall,
        answerCall,
        chat,
        setChat,
        setMsgRcv,
        otherUser,
        setOtherUser,
        leaveCall1,
        userName,
        myVdoStatus,
        setMyVdoStatus,
        userVdoStatus,
        setUserVdoStatus,
        updateVideo,
        myMicStatus,
        userMicStatus,
        updateMic,
        screenShare,
        fullScreen,
        isVideoCallZoomPopUpOpen,
        setIsVideoCallZoomPopUpOpen,
        setIsVoiceCallPopUpOpen,
        isVoiceCallPopUpOpen,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
