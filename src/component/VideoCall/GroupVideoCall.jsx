import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from '../../socket';
import { Context } from "../../createContext";
//import { useSocket } from "../../redux/Slice/socketSlice";
import { setInitialMediaStatus, setLocalStream} from "../../redux/Slice/videoCallSlice";

import {  useCurrentCallProfile } from "../../redux/Slice/callSlice";
import { Secondary } from "../../redux/services/toastServices";
import store from "../../redux/store";
import { useProfileGets } from "./../../redux/Slice/profileSlice";

function GroupVideoCall({ isVideoCall = false }) {
 // const { socket } = useSocket();
  const profileGets = useProfileGets();
  const peerConnections = {};

  const friendsProfile = useCurrentCallProfile();

  const channelID = friendsProfile?._id;
  const localDisplayName = profileGets.fullName;
  // console.log("profileGets", profileGets);
  //console.log("friendsProfile", friendsProfile);
  // console.log("peerConnection", peerConnections);
  // console.log("channelID", channelID);
  // console.log("isVideoCall", isVideoCall);

    function start() {
        document
            .getElementById("localVideoContainer")
            .appendChild(makeLabel(profileGets.fullName));

        let constraints = {
            video: {
                width: { max: 320 },
                height: { max: 240 },
                frameRate: { max: 30 },
            },
            audio: true,
        };

        if (!isVideoCall) {
            constraints = {
                video: false,
                audio: true,
            };
        }

        // set up local video stream
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    store.dispatch(setLocalStream(stream));
                    document.getElementById("localVideo").srcObject = stream;
                })
                .catch(errorHandler)
                // set up websocket and message all existing clients
                .then(() => {
                   console.log("test")
                    let initialState = {
                        [profileGets._id]: {
                            isVideoOn: isVideoCall,
                            isMicOn: true,
                        },
                    };
                    store.dispatch(setInitialMediaStatus(initialState));
                    socket.on("webrtcMessage", (message) => {
                        console.log("webrtcMessage", message);
                        gotMessageFromServer(message);
                    });
                    //   socket.on("connect", (event) => {
                    socket.emit("webrtcMessage", {
                        displayName: profileGets.fullName,
                        uuid: profileGets._id,
                        dest: "all",
                        channelID: channelID,
                    });
                    //   });
                })
                .catch(errorHandler);
        } else {
            alert("Your browser does not support getUserMedia API");
        }
    }


    function gotMessageFromServer(message) {
    //console.log("call function gotMessageFromServer", message);
    let signal = message;
    let peerUuid = signal.uuid;

    // Ignore messages that are not for us or from ourselves
    if (peerUuid == profileGets?._id || (signal.dest != profileGets?._id && signal.dest != "all")){
      console.log("call header if");
       return;
    }

    if (signal.displayName && signal.dest == "all") {
        console.log("call signal dest all");
      // set up peer connection object for a newcomer peer
      setUpPeer(peerUuid, signal.displayName);
      socket.emit("webrtcMessage", {
        displayName: localDisplayName,
        uuid: profileGets?._id,
        dest: peerUuid,
        channelID: channelID,
      });
    } else if (signal.displayName && signal.dest == profileGets?._id) {
          console.log("call signal dest profile");
      // initiate call if we are the newcomer peer
      setUpPeer(peerUuid, signal.displayName, true);
    } else if (signal.sdp) {
          console.log("call signal dest sdp");
         // setUpPeer(peerUuid, signal.displayName, true);
      peerConnections[peerUuid].pc
        .setRemoteDescription(new RTCSessionDescription(signal.sdp))
        .then(function () {
          // Only create answers in response to offers
            console.log("signal", signal);
          if (signal.sdp.type == "offer") {
            peerConnections[peerUuid].pc.createAnswer().then((description) => createdDescription(description, peerUuid))
              .catch(errorHandler);
          }
        })
        .catch(errorHandler);
    } else if (signal.ice) {
      peerConnections[peerUuid].pc
        .addIceCandidate(new RTCIceCandidate(signal.ice))
        .catch(errorHandler);
    }
  }

  function setUpPeer(peerUuid, displayName, initCall = false) {
    let peerConnectionConfig = {
      iceServers: [
        { urls: "stun:stun.stunprotocol.org:3478" },
        { urls: "stun:stun.l.google.com:19302" },
      ],
    };

    try {
      peerConnections[peerUuid] = {
        displayName: displayName,
        pc: new RTCPeerConnection(peerConnectionConfig),
      };
      peerConnections[peerUuid].pc.onicecandidate = (event) =>
        gotIceCandidate(event, peerUuid);
      peerConnections[peerUuid].pc.ontrack = (event) =>
        gotRemoteStream(event, peerUuid);
      peerConnections[peerUuid].pc.oniceconnectionstatechange = (event) =>
        checkPeerDisconnect(event, peerUuid);

      const localStream = store.getState()?.videoCall?.localStream;
      console.log("mylocalStream in setUpPeer", localStream);
      peerConnections[peerUuid].pc.addStream(localStream);
      //   if (!isVideoCall) {
      //       // Add only audio track to the RTCPeerConnection
      //       const audioTrack = localStream.getAudioTracks()[0];
      //       if (audioTrack) {
      //           peerConnections[peerUuid].pc.addTrack(audioTrack, localStream);
      //       } else {
      //           console.error("No audio track found in the local media stream");
      //       }
      //   } else {
      //       // Add the entire media stream to the RTCPeerConnection
      //       peerConnections[peerUuid].pc.addStream(localStream);
      //   }
        // Use addTrack instead of addStream
        // localStream.getTracks().forEach(track => {
        //     track.enabled = true;
        //     peerConnections[peerUuid].pc.addTrack(track, localStream);
        // });
    } catch (e) {
        console.log("e setUpPeer", e)
      //Secondary("Video Stream Error.");
    }

    if (initCall) {
      peerConnections[peerUuid].pc
        .createOffer()
        .then((description) => createdDescription(description, peerUuid))
        .catch(errorHandler);
    }
  }

  function gotIceCandidate(event, peerUuid) {
    if (event.candidate != null) {
      console.log("candidate not null")
      socket.emit("webrtcMessage", {
        ice: event.candidate,
        uuid: profileGets._id,
        dest: peerUuid,
        channelID: channelID,
      });
    }
  }

  function createdDescription(description, peerUuid) {
    console.log(`peer description,  ${description}`);
    console.log(`got description, peer ${peerUuid}`);
    peerConnections[peerUuid].pc.setLocalDescription(description).then(function () {
        socket.emit("webrtcMessage", {
          sdp: peerConnections[peerUuid].pc.localDescription,
          uuid: profileGets?._id,
          dest: peerUuid,
          channelID: channelID,
        });
      })
      .catch(errorHandler);
  }

  function gotRemoteStream(event, peerUuid) {
    if (document.getElementById("remoteVideo_" + peerUuid)) {
      return;
    }

    console.log(`got remote stream, peer ${peerUuid}`);
    //assign stream to new HTML video element
    let vidElement = document.createElement("video");
    vidElement.setAttribute("autoplay", "");
    vidElement.setAttribute("class", "videoContainer w-full h-full object-cover");
    // vidElement.setAttribute("muted", "");

    console.log("Remote event.streams[0]", event.streams[0]);
    if (isVideoCall) {
        // Access and add audio track to the peer connection
        let audioTrack = event.streams[0]?.getAudioTracks()[0];
        console.log("Audio Track", audioTrack);
        if (audioTrack) {
            audioTrack.enabled = true;
            peerConnections[peerUuid].pc.addTrack(audioTrack);
        }

        // Access and add video track to the peer connection
        let videoTrack = event.streams[0]?.getVideoTracks()[0];
        console.log("Video Track", videoTrack);
        if (videoTrack) {
            peerConnections[peerUuid].pc.addTrack(videoTrack);
        }
        vidElement.srcObject = event.streams[0];
    } else {
        let audioTrack = event.streams[0]?.getAudioTracks()[0];
        console.log("Audio Track", audioTrack);
        if (audioTrack) {
            audioTrack.enabled = true;
            peerConnections[peerUuid].pc.addTrack(audioTrack);
        }
        vidElement.srcObject = event.streams[0];
    }

    console.log("vidElement", vidElement);
    let vidContainer = document.createElement("div");
    vidContainer.setAttribute("id", "remoteVideo_" + peerUuid);
    vidContainer.setAttribute("class", "videoContainer w-full h-full object-cover");
    vidContainer.appendChild(vidElement);
    vidContainer.appendChild(makeLabel(peerConnections[peerUuid].displayName));
    document.getElementById("videos").appendChild(vidContainer);

    updateLayout();

    store.dispatch(
      setInitialMediaStatus({
        [peerUuid]: {
          isVideoOn: true,
          isMicOn: true,
        },
      })
    );
  }

  function checkPeerDisconnect(event, peerUuid) {
    let state = peerConnections[peerUuid].pc.iceConnectionState;
    console.log(`connection with peer ${peerUuid} ${state}`);
    if (state === "failed" || state === "closed" || state === "disconnected") {
        delete peerConnections[peerUuid];
        const parentElement = document.getElementById('videos');
        const childElement = document.getElementById("remoteVideo_" + peerUuid);
        if (parentElement && childElement) {
            parentElement.removeChild(childElement);
        }
      updateLayout();
    }
  }

  function updateLayout() {
    // update CSS grid based on number of diplayed videos
    let rowHeight = "98vh";
    let colWidth = "98vw";

    let numVideos = Object.keys(peerConnections).length + 1; // add one to include local video
     console.log("numVideos", numVideos);
    if (numVideos > 1 && numVideos <= 4) {
      // 2x2 grid
      rowHeight = "48vh";
      colWidth = "48vw";
    } else if (numVideos > 4) {
      // 3x3 grid
      rowHeight = "32vh";
      colWidth = "32vw";
    }

    document.documentElement.style.setProperty(`--rowHeight`, rowHeight);
    document.documentElement.style.setProperty(`--colWidth`, colWidth);
  }

  function makeLabel(label) {
    let vidLabel = document.createElement("div");
    vidLabel.appendChild(document.createTextNode(label));
    vidLabel.setAttribute("class", "absolute top-2 left-2 text-white");
    vidLabel.innerHTML += `<i class="icon-mic-off mx-2 hidden " ></i>`;
    vidLabel.innerHTML += `<i class="icon-video-off mx-2 hidden" ></i>`;
    return vidLabel;
  }

  function errorHandler(error) {
    console.error(error);
  }

  useEffect(() => {
    socket.on("webrtcUpdateUserMedia", (payload) => {
      console.log("payload", payload);
    });
    if (profileGets?._id && socket) {
      start();
    }
    // else {
    //   personalProfileGetApi();
    // }

      return () => {
          // Clean up peer connections and DOM elements
          Object.keys(peerConnections).forEach(peerUuid => {
              peerConnections[peerUuid].pc.close();
              delete peerConnections[peerUuid];
              const childElement = document.getElementById("remoteVideo_" + peerUuid);
              if (childElement) {
                  childElement.parentNode.removeChild(childElement);
              }
          });
      };
  }, [profileGets, socket]);

  useEffect(() => {
    return () => {
      socket.off("webrtcMessage");
      socket.off("webrtcUpdateUserMedia");
    };
  }, []);

  return (
    <div className={`${isVideoCall ? "" : "hidden"}`}>
        <div className="flex h-screen">
            <div className="w-1/2">
                <div id="localVideoContainer" className="relative w-full h-full bg-black">
                    <video className="w-full h-full object-cover" id="localVideo" muted autoPlay></video>
                </div>
            </div>
            <div className="w-1/2">
                <div id="videos" className="relative w-full h-full bg-black">
                </div>
            </div>
        </div>
    </div>
  );
}

export default GroupVideoCall;
