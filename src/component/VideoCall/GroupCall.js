import React, { useContext, useRef, useState, useEffect } from "react";
import Peer from 'simple-peer';
import { useParams } from "react-router-dom";
import socket from '../../socket';
import { Context } from "../../createContext";
//import { useSocket } from "../../redux/Slice/socketSlice";
import { setInitialMediaStatus, setMyMicStatus, setMyVideoStatus, useUserMediaStatus, setLocalStream} from "../../redux/Slice/videoCallSlice";
import {  useCurrentCallProfile } from "../../redux/Slice/callSlice";
import { Secondary } from "../../redux/services/toastServices";
import store from "../../redux/store";
import { useProfileGets } from "./../../redux/Slice/profileSlice";
import VideoCard from './VideoCard';
import BottomBar from './BottomBar';

function GroupCall({ memberIds, memberExitGroup, isVideoCall = false }) {
    //const { socket } = useSocket();
    const profileGets = useProfileGets();

    const friendsProfile = useCurrentCallProfile();
    const userMediaStatus = useUserMediaStatus();
    const channelID = friendsProfile && friendsProfile?._id;
    const localDisplayName = profileGets && profileGets?.fullName;
    const currentUser = profileGets && profileGets?.fullName;
    const [peers, setPeers] = useState([]);
    const [userVideoAudio, setUserVideoAudio] = useState({
        localUser: { video: true, audio: true },
    });
    const [videoDevices, setVideoDevices] = useState([]);
    const [displayChat, setDisplayChat] = useState(false);
    const [screenShare, setScreenShare] = useState(false);
    const [showVideoDevices, setShowVideoDevices] = useState(false);
    const [joinedUserCount, setJoinedUserCount] = useState(0);
    const peersRef = useRef([]);
    const userVideoRef = useRef(null);
    const screenTrackRef = useRef();
    const userStream = useRef(null);
    const roomId = friendsProfile?._id;


    useEffect(() => {
        // Get Video Devices
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const filtered = devices.filter((device) => device.kind === 'videoinput');
            setVideoDevices(filtered);
        });

        // Set Back Button Event
        //window.addEventListener('popstate', goToBack);
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
        // Connect Camera & Mic
        console.log(isVideoCall);
        console.log(constraints);
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                userVideoRef.current.srcObject = stream;
                userStream.current = stream;
                console.log("mysocket", socket);
                socket.emit('FF-join-room', { roomId, userName: currentUser });
                socket.on('FF-user-join', (users) => {
                    // all users
                    console.log("users", users);
                    const peers = [];
                    users.forEach(({ userId, info }) => {
                        let { userName, video, audio } = info;

                        if (userName !== currentUser) {
                            const peer = createPeer(userId, socket.id, stream);

                            peer.userName = userName;
                            peer.peerID = userId;

                            peersRef.current.push({
                                peerID: userId,
                                peer,
                                userName,
                            });
                            peers.push(peer);

                            setUserVideoAudio((preList) => {
                                return {
                                    ...preList,
                                    [peer.userName]: { video, audio },
                                };
                            });
                        }
                    });

                    setPeers(peers);
                    setJoinedUserCount(peers.length);
                });

                socket.on('FF-receive-call', ({ signal, from, info }) => {
                    console.log("yes receive the call")
                    console.log("yes receive the call", signal);
                    let { userName, video, audio } = info;
                    const peerIdx = findPeer(from);

                    if (!peerIdx) {
                        const peer = addPeer(signal, from, stream);

                        peer.userName = userName;

                        peersRef.current.push({
                            peerID: from,
                            peer,
                            userName: userName,
                        });
                        setPeers((users) => {
                            return [...users, peer];
                        });
                        setUserVideoAudio((preList) => {
                            return {
                                ...preList,
                                [peer.userName]: { video, audio },
                            };
                        });
                    }
                });

                socket.on('FF-call-accepted', ({ signal, answerId }) => {
                    const peerIdx = findPeer(answerId);
                    peerIdx.peer.signal(signal);
                });

                socket.on('FF-user-leave', ({ userId, userName }) => {
                    console.log("leave use", userId + - + userName);
                    setJoinedUserCount((prevCount) => {
                        if (prevCount === 1) {
                            const stream = userVideoRef.current.srcObject;
                            if (stream) {
                                const tracks = stream.getTracks();
                                tracks.forEach(track => track.stop());
                            }
                            goToBack();
                        }
                        //console.log(prevCount);
                        return prevCount - 1;

                    });
                    const peerIdx = findPeer(userId);
                    peerIdx.peer.destroy();
                    setPeers((users) => {
                        users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
                        return [...users];
                    });
                    peersRef.current = peersRef.current.filter(({ peerID }) => peerID !== userId );
                    //setJoinedUserCount((prevCount) => prevCount - 1);
                });
            });

        socket.on('FF-toggle-camera', ({ userId, switchTarget }) => {
            console.log(userId)
            console.log("switchTarget", switchTarget)
            const peerIdx = findPeer(userId);

            setUserVideoAudio((preList) => {
                let video = preList[peerIdx.userName].video;
                let audio = preList[peerIdx.userName].audio;

                if (switchTarget === 'video') video = !video;
                else audio = !audio;

                return {
                    ...preList,
                    [peerIdx.userName]: { video, audio },
                };
            });
        });

        return () => {
           // socket.disconnect();
        };
        // eslint-disable-next-line
    }, []);

    function createPeer(userId, caller, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on('signal', (signal) => {
            console.log('signal', signal);
            console.log('userId', userId);
            console.log('caller', caller);
            socket.emit('FF-call-user', {
                userToCall: userId,
                from: caller,
                signal,
            });
        });
        peer.on('disconnect', () => {
            peer.destroy();
        });

        return peer;
    }

    function addPeer(incomingSignal, callerId, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on('signal', (signal) => {
            socket.emit('FF-accept-call', { signal, to: callerId });
        });

        peer.on('disconnect', () => {
            peer.destroy();
        });

        peer.signal(incomingSignal);

        return peer;
    }

    function findPeer(id) {
        return peersRef.current.find((p) => p.peerID === id);
    }


    function createUserVideo(peer, index, arr) {
        return (
            <VideoCard key={index} isVideoCall={isVideoCall} peer={peer} number={arr.length} />
        );
    }

    function writeUserName(userName, index) {
        if (userVideoAudio.hasOwnProperty(userName)) {
            if (!userVideoAudio[userName].video) {
                return <p key={userName}>{userName}</p>;
            }
        }
    }

    // BackButton
    const goToBack = (e) => {
        if (e) {
            e.preventDefault();
        }
        console.log("goto back");
        socket.emit('FF-leave-room', { roomId, leaver: currentUser });
        // Destroy all peer connections and release resources
        peersRef.current.forEach(({ peer }) => {
            console.log(peer);
            peer.destroy();
        });

        // Clear the list of peers
        setPeers([]);

        // Optionally, stop the user's media stream
        const stream = userVideoRef.current.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        // if (userStream.current) {
        //     userStream.current.getTracks().forEach(track => track.stop());
        // }
         console.log(joinedUserCount)
        memberExitGroup(joinedUserCount);
    };

    const toggleCamera = (e) => {
        const target = 'video';

        setUserVideoAudio((preList) => {
            let videoSwitch = preList['localUser'].video;
            let audioSwitch = preList['localUser'].audio;

            if (target === 'video') {
                const userVideoTrack = userVideoRef.current.srcObject.getVideoTracks()[0];
                videoSwitch = !videoSwitch;
                userVideoTrack.enabled = videoSwitch;
            }

            return {
                ...preList,
                localUser: { video: videoSwitch, audio: audioSwitch },
            };
        });

        socket.emit('BE-toggle-camera-audio', { roomId, switchTarget: target });
    };

    const toggleAudio = (e) => {
        const target = 'audio';

        setUserVideoAudio((preList) => {
            let videoSwitch = preList['localUser'].video;
            let audioSwitch = preList['localUser'].audio;

            if (target === 'audio') {
                const userAudioTrack = userVideoRef.current.srcObject.getAudioTracks()[0];
                audioSwitch = !audioSwitch;

                if (userAudioTrack) {
                    userAudioTrack.enabled = audioSwitch;
                } else {
                    userStream.current.getAudioTracks()[0].enabled = audioSwitch;
                }
            }

            return {
                ...preList,
                localUser: { video: videoSwitch, audio: audioSwitch },
            };
        });

        socket.emit('BE-toggle-camera-audio', { roomId, switchTarget: target });
    };

    function endGroupCall() {
        // Inform the server that the user is leaving
        socket.emit('FF-leave-room', { roomId, leaver: currentUser });

        // Destroy all peer connections and release resources
        peersRef.current.forEach(({ peer }) => {
            peer.destroy();
        });

        // Clear the list of peers
        setPeers([]);

        // Optionally, stop the user's media stream
        if (userVideoRef.current) {
            userVideoRef.current.srcObject.getTracks().forEach((track) => {
                track.stop();
            });
            //userStream.current.getTracks().forEach(track => track.stop());
        }

        memberExitGroup(5);
    }

    useEffect(() => {
        return () => {

        };
    }, [profileGets, socket]);


    return (
        <div id="video-pop" className="mytest absolute top-full shadow-one right-5 z-50 space-y-5 bg-[#c1c1c1] min-w-[375px] rounded-lg overflow-hidden open fix-open">
                <div className="flex h-screen">
                    <div className={`w-full lg:w-1/2 ${!isVideoCall ? 'border' : ''}`}>
                        <div id="localVideoContainer" className="relative w-full h-full bg-gray">
                            <video className="w-full h-full object-cover" playsInline muted autoPlay ref={userVideoRef}/>
                            <div className="absolute top-2 left-2 text-white">
                                {currentUser}
                                <i className="icon-mic-off mx-2 hidden "></i>
                                <i className="icon-video-off mx-2 hidden"></i>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div id="videos" className="flex flex-wrap">
                            {peers &&
                            peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
                        </div>
                    </div>

                </div>
            <div className="flex space-x-3 justify-center call-btns">
            <BottomBar
                isVideoCall={isVideoCall}
                toggleCamera={toggleCamera}
                toggleAudio={toggleAudio}
                userVideoAudio={userVideoAudio['localUser']}
                goToBack={goToBack}
            /></div>
            {/*<div className="flex space-x-3 justify-center call-btns">*/}
                {/*<p>{userVideoAudio['localUser'].audio}-{userVideoAudio['localUser'].video}</p>*/}
          {/*<span onClick={toggleCameraAudio('video')}*/}
                {/*className="cursor-pointer text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg">*/}
            {/*{userVideoAudio.video ? (<i className="icon-video-on" aria-hidden="true"></i>) : (<i className="icon-video-off" aria-hidden="true"></i>)}*/}
          {/*</span>*/}
                {/*<span onClick={toggleCameraAudio('audio')}*/}
                      {/*className="cursor-pointer text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">*/}
            {/*{userVideoAudio.audio ? (<i className="icon-mic-on" aria-hidden="true"></i>) : (<i className="icon-mic-off" aria-hidden="true"></i>)}*/}
          {/*</span>*/}
                {/*<span*/}
                    {/*className="cursor-pointer text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red text-chatlook-gray rounded-lg hover:bg-chatlook-red"*/}
                    {/*onClick={() => endGroupCall()}>*/}
            {/*<i className="icon-disconnect-call text-white" aria-hidden="true"></i>*/}
          {/*</span>*/}
            {/*</div>*/}
        </div>
    );
}

export default GroupCall;
