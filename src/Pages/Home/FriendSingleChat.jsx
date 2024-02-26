import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import HeaderDashboard from "../../Common/HeaderDashboard";
import Modal from "../../Common/Modals/Modal";
//import Product from "../../assets/images/product.png";
import { Context } from "../../createContext";
import { profileGet, useProfileGets } from "../../redux/Slice/profileSlice";
import { friendsRequestsSearch, getSingleFriend, gropusRequestsSearch, setMyNewFriedList, setMyNewGroupList, useFriendsRequests, useMyFriendsList, useMyGroupList, useSingleFriend } from "../../redux/Slice/requestSlice";
import socket from '../../socket';
import moment from "moment";
import ImagePicker from "../../Common/ImagePicker";
import MsgContainers from "../../component/Chat/MsgContainers";
import InputEmoji from 'react-input-emoji'
import {
    chatSend,
    chatsOfList,
    getSingleGroup,
    setInquiryProduct,
    setNewChatLists,
    setReceiverId,
    useCurrentChatUser,
    useInquiryProduct,
    useListChat,
    useListChatPage,
    useNewChatList,
    useReceiverId,
} from "../../redux/Slice/chatSlice";
import { useOnlineUsers } from "../../redux/Slice/socketSlice";
import { setVideoRingingPortalOpen, setVideoPortalOpen, setVoicePortalOpen } from "../../redux/Slice/videoCallSlice";
import { setCurrentCall, setGroupVideoCall, setGroupCallStarted, setCurrentCallProfile, useCurrentCall, useCurrentCallProfile, useGroupCallStarted, chatCallStart, chatCallEnd } from "../../redux/Slice/callSlice";
import { Secondary } from "../../redux/services/toastServices";
import store from "../../redux/store";
import { useQuery } from "../../utils";
import { seenMessage } from "../../redux/Slice/messageSlice";
// import { seenMessage } from "../../redux/Slice/messageSlice";
// import { allFriendsRequest } from "../../redux/services/requestServices";

function FriendSingleChat() {
    const { id } = useParams();
    const profileGets = useProfileGets();
    //const { socket } = useSocket();
    const onlineUsers = useOnlineUsers();
    const isUserOnline = onlineUsers[id?.toUpperCase()] !== undefined;
    const friendId = localStorage.getItem("friendsId")
    const dispatch = useDispatch();
    const listChatPage = useListChatPage();
    const listChat = useListChat();
    const inquiryProduct = useInquiryProduct();
    const [singleChatPagination, setSinglePagePagination] = useState({ page: 1, limit: 20 });
    const [sendMsg, setSendMsg] = useState("");
    const [image, setImage] = useState();
    const [isTyping, setIsTyping] = useState(false);
    const [replyMsg, setReplyMsg] = useState(null);
    const { rightSidebarToggle } = useContext(Context);
    const [stateForNewChatList, setStateForNewChatlist] = useState([])
    console.log('stateForNewChatList', stateForNewChatList)
    const scrollContainerRef = useRef();
    const receiverId = useReceiverId();
    const newChatList = useNewChatList()
    const friendsProfile = useSingleFriend()
    const profileGettingFunction = useCallback(async () => {
        dispatch(getSingleFriend({ friendid: friendId }))
    }, [friendId])
    const chatsList = useCallback(async () => {
        let payload = { page: 1, limit: 20, to: friendId }
        try {
            const response = await dispatch(chatsOfList(payload)).unwrap();
            console.log('response', response)
            setStateForNewChatlist([...response?.data?.Data?.docs])

        } catch (error) {
            console.log('error', error)
        }
    }, [friendId]);

    useEffect(() => {
        profileGettingFunction()
        chatsList()

    }, [friendId])

    // useEffect(() => {
    //     dispatch(setNewChatLists([...stateForNewChatList]))
    // }, [stateForNewChatList])

    const isGroup = useQuery()["type"] === "group";
    const allFriendsRequest = async () => {
        const payload = {
            page: 1,
            limit: 50,
            search: "",
        };
        const response = await dispatch(friendsRequestsSearch(payload)).unwrap();
        dispatch(setMyNewFriedList([...response?.data?.Data]))
    }
    let todayVisible = false;
    function todayIndicatior(chatVal) {
        if (moment(chatVal.createdAt).format("L") === moment().format("L") && !todayVisible) {
            todayVisible = true;
            return (
                <div className="relative w-full flex justify-center py-2">
                    <div className=" w-fit px-3 rounded-md bg-chatlook-grayLight">Today</div>
                </div>
            );
        } else {
            return <></>;
        }
    }


    useEffect(() => {
        function typeReceiveHandler(data) {
            if (data?.from === friendId) {
                setIsTyping(true);
            }
            setTimeout(() => {
                setIsTyping(false);
            }, 1000);
        }
        socket.on("typingReceive", (data) => {
            typeReceiveHandler(data);
        });
    }, [profileGets.channelID]);

    const videoCallPermission =
        (Boolean(friendsProfile?.permissions?.videocall) &&
            Boolean(friendsProfile?.permissions?.videocall)) ||
        isGroup;
    const voiceCallPermission =
        (Boolean(friendsProfile?.permissions?.audiocall) &&
            Boolean(friendsProfile?.permissions?.audiocall)) ||
        isGroup;

    const scrollToBottom = () => {
        // scrollContainerRef.current?.scrollIntoView({ behavior: "auto" });
        const lastElement = scrollContainerRef?.current?.lastElementChild;
    }

    const handleScroll = (event) => {
        // setScrollTop(event.currentTarget.scrollTop);
        if (event.currentTarget.scrollTop == 0) {
            if (listChatPage?.totalPages > singleChatPagination?.page) {
                setSinglePagePagination({
                    ...singleChatPagination,
                    page: singleChatPagination.page + 1,
                });
            }
        }
    };

    const chatMessageSend = async () => {
        if (!isValidMsg()) return;
        try {
            let formData = new FormData();
            if (image) {
                formData.append("file", image[0]);
            }
            if (inquiryProduct) {
                formData.append("product", inquiryProduct._id);
            }
            formData.append("to", id);
            formData.append("message", sendMsg);
            if (replyMsg?._id) {
                formData.append("context", replyMsg?._id);
            }

            const response = await dispatch(chatSend(formData)).unwrap();
            if (response.data.IsSuccess) {
                chatsList()
                setSendMsg("");
                setImage();
                setReplyMsg(null);
                dispatch(setInquiryProduct());
                allFriendsRequest();
            } else {
                Secondary(response.Message);
            }
        } catch (error) {
            Secondary("SOMETHING WENT WRONG.");
        }
    };
    const seenApiFunc = async (messageId, data) => {
        // const response = await dispatch(seenMessage({
        //   messageid: messageId
        // }))
        // await chatsList()
    }




    useEffect(() => {
        const handleMessageOnComming = (parentkey) => {
            if (parentkey.event === "onIncomingChat") {
                console.log('parentkey', parentkey)
                setStateForNewChatlist((pre) => ([...pre, parentkey?.data]))
                // setSinglePagePagination({ page: 1, limit: 30 });
                dispatch(seenMessage({ messageid: parentkey?.data?._id })).then((response) => {
                    console.log('response', response)
                })
            }
        }
        if (profileGets?.channelID && socket) {
            socket.on(profileGets?.channelID, handleMessageOnComming);
        }
        return () => {
            socket.off(profileGets?.channelID, handleMessageOnComming)
        }
    }, [profileGets?.channelID, socket]);



    useEffect(() => {
        const handleMessageStatus = (parentkey) => {
            console.log('parentkey', parentkey)
            if (parentkey.event === "messageDelivered") {
                console.log('messageDelivered', parentkey.data)

            }
            if (parentkey.event === "messageSeen") {
                console.log('messageSeen', parentkey.data)

            }
        }
        if (profileGets?.channelID && socket) {
            socket.on(profileGets?.channelID, handleMessageStatus);
        }
        return () => {
            socket.off(profileGets?.channelID, handleMessageStatus)
        }
    }, [profileGets?.channelID, socket]);

    const authorisetionPermissionFunc = async () => {
        const payload = {
            page: 1,
            limit: 50,
            search: "",
        };
        const response = await dispatch(
            friendsRequestsSearch(payload)
        ).unwrap();
        await dispatch(getSingleFriend({ friendid: id }))
        dispatch(setMyNewFriedList([...response?.data?.Data]));
    }

    useEffect(() => {
        const handleAuthorisePermission = (parentkey) => {

            if (parentkey.event === "onAuthorizedPermissionsUpdate") {
                console.log('parentkey', parentkey)
                authorisetionPermissionFunc()
            }
        }
        if (profileGets?.channelID && socket) {
            socket.on(profileGets?.channelID, handleAuthorisePermission);
        }
        return () => {
            socket.off(profileGets?.channelID, handleAuthorisePermission)
        }
    }, [profileGets?.channelID, socket]);


    useEffect(() => {
        allFriendsRequest();
        dispatch(profileGet())
    }, []);

    function isValidMsg() {
        return sendMsg.trim() !== "" || Boolean(image) || Boolean(inquiryProduct);
    }

    const startCallAction = useCallback(async (isVideoCall) => {
        try {
            const payload = {
                from: profileGets?._id,
                to: friendsProfile?._id, // user or group id
                isVideoCall: isVideoCall,
                isGroupCall: isGroup,
                isAudioCall: isVideoCall ? false : true,
                status: ""
            }
            const response = await dispatch(chatCallStart(payload)).unwrap();
            if (response?.data?.IsSuccess) {
                dispatch(setCurrentCall(response?.data?.Data?._id));
            } else {
                alert(response?.data?.Message);
            }
        } catch (error) {
        }
    }, [dispatch, profileGets, friendsProfile]);
    return (
        <>
            <HeaderDashboard />
            <main className="w-full overflow-auto">

                <div className="relative flex flex-col justify-between h-full">
                    <div className="w-full flex items-center sticky top-0 z-20 bg-white py-5 px-12">
                        {/* <!-- profile-btn  --> */}
                        <div className="flex items-center space-x-3 cursor-pointer"
                            onClick={() =>
                                rightSidebarToggle(
                                    isGroup ? "groupprofile" : "userprofile"
                                )
                            }
                        >
                            <div className="w-14 h-14 rounded-full bg-slate-200 flex overflow-hidden">
                                {friendsProfile?.profileimage ? (
                                    <img className="object-cover w-full h-full rounded-full" src={`https://festumfield.s3.ap-south-1.amazonaws.com/${friendsProfile?.profileimage}`} alt="Profile pic" />
                                ) : (
                                    <div className="flex items-center justify-center object-cover w-full h-full overflow-hidden text-2xl rounded-full icon-user text-chatlook-gray"></div>
                                )}
                            </div>
                            <div>
                                <h4 className="mt-1 text-2xl xl:text-3xl text-chatlook-dark font-bold capitalize">
                                    {friendsProfile?.fullName ? friendsProfile?.fullName : friendsProfile?.nickName || friendsProfile?.name}
                                </h4>
                                <span className="text-chatlook-sky text-sm block">
                                    {!isGroup ?
                                        (isTyping
                                            ? "Typing..."
                                            : isUserOnline
                                                ? "Online"
                                                : "Offline") : <div className="text-chatlook-sky text-sm block font-bold">{`$...`}</div>}
                                </span>
                            </div>
                        </div>
                        {/* <!-- video & call btn  --> */}
                        <div className="flex items-center space-x-3 ml-auto relative">
                            {friendsProfile?.is_business_profile_created && (
                                <span
                                    className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky shadow rounded-full text-[#8094ae] cursor-pointer"
                                    onClick={() => rightSidebarToggle("product")}
                                >
                                    <i className="icon-store text-white"></i>
                                </span>
                            )}
                            <span
                                className={`text-xl w-10 h-10 flex items-center justify-center bg-chatlook-${videoCallPermission ? "sky" : "grayLight"
                                    } shadow rounded-full text-[#8094ae] cursor-${videoCallPermission ? "pointer" : "not-allowed"
                                    } `}
                                onClick={async () => {
                                    const videoPermission = await navigator.permissions.query({ name: "camera" });
                                    const audioPermission = await navigator.permissions.query({ name: "microphone" });
                                    if (videoPermission.state === "granted" && audioPermission.state === "granted") {
                                        if (videoCallPermission) {
                                            // callUser({ isVideoCall: true });
                                            dispatch(setGroupCallStarted(isGroup));
                                            dispatch(setCurrentCallProfile(friendsProfile));
                                            dispatch(setVideoRingingPortalOpen(true));
                                        } else {
                                            Secondary('You have no permission.');
                                        }
                                    } else {
                                        Secondary('Please allow camera & microphone access.');
                                    }
                                }}
                            >
                                <i className="icon-video-on text-white"></i>
                            </span>

                            <span
                                className={`text-xl w-10 h-10 flex items-center justify-center bg-chatlook-${voiceCallPermission ? "sky" : "grayLight"
                                    } shadow rounded-full text-[#8094ae] cursor-${voiceCallPermission ? "pointer" : "not-allowed"
                                    } relative`}
                                onClick={async () => {
                                    const audioPermission = await navigator.permissions.query({ name: "microphone" });
                                    if (audioPermission.state === "granted") {
                                        if (voiceCallPermission) {
                                            // callUser({ isVideoCall: false });
                                            dispatch(setGroupCallStarted(isGroup));
                                            dispatch(setCurrentCallProfile(friendsProfile));
                                            if (isGroup) {
                                                dispatch(setVideoRingingPortalOpen(true));
                                                dispatch(setGroupVideoCall(false));
                                            } else {
                                                dispatch(setVoicePortalOpen(true));
                                            }
                                        } else {
                                            Secondary('You have no permission.');
                                        }
                                    } else {
                                        Secondary('Please allow microphone access.');
                                    }
                                }}
                            >
                                <i
                                    className="icon-phone-calling text-white"
                                    aria-hidden="true"
                                ></i>
                            </span>
                        </div>
                    </div>
                    {/* <!-- chat-area  --> */}
                    {
                        <div
                            onScroll={handleScroll}
                            className="chat-holdr h-full overflow-hidden"
                        >
                            <div className="chatting-bar h-full">
                                <div className="w-full mx-auto flex flex-col-reverse h-full overflow-y-auto space-y-3 mt-auto px-6 pb-5">
                                    {stateForNewChatList?.length !== 0 &&
                                        stateForNewChatList?.map((chatVal) => {
                                            return (
                                                <MsgContainers
                                                    key={chatVal._id}
                                                    setReplyMsg={setReplyMsg}
                                                    todayIndicatior={todayIndicatior}
                                                    chatVal={chatVal}
                                                />
                                            );
                                        })}
                                    {/* <ScrollToBottom /> */}
                                    <div ref={scrollContainerRef} />
                                </div>
                            </div>
                        </div>
                    }
                    {/* <!-- chat-input  --> */}
                    {inquiryProduct && (
                        <div>
                            <div
                                onClick={() => {
                                    dispatch(setInquiryProduct(null));
                                }}
                            >
                                X
                            </div>
                            <div className="w-fit flex items-stretch bg-[#5AC8D2]/20 p-2">
                                <div className="w-full max-w-[75px] max-h-[75px]">
                                    {inquiryProduct.images.length > 0 ? <img
                                        src={`https://festumfield.s3.ap-south-1.amazonaws.com/${inquiryProduct.images[0]}`}
                                        className="object-cover w-full h-full"
                                        alt=""
                                    /> :
                                        <div
                                            src=""
                                            className="object-cover w-full h-full bg-gray-300 rounded text-center text-xs pt-4"
                                            alt=""
                                        > No image </div>
                                    }
                                </div>
                                <div className="flex flex-col w-full pl-3 space-y-2">
                                    <strong className="block mb-1">
                                        {inquiryProduct.name}
                                    </strong>
                                    <span className="block text-[#888888] text-sm mt-0 mb-1">
                                        {inquiryProduct.description}
                                    </span>
                                    <span className="block text-[#5AC8D2] m-0">
                                        ${inquiryProduct.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {image && (
                        <div className="w-full flex align-items-center h-[100px] bg-gray-100 ">
                            {image?.map((f, index) => (
                                <div key={index}>
                                    {f.type.startsWith('video/') ? (
                                        <>
                                            <video height={200} width={90} className="rounded avatar-sm bg-light" controls>
                                                <source src={URL.createObjectURL(f)} type={f.type} />
                                            </video>
                                            <div className="cursor-pointer" onClick={() => { setImage(); }}>X</div>
                                        </>
                                    ) : (
                                        <>
                                            <img height={90} width={90} className="rounded avatar-sm bg-light" alt="" src={URL.createObjectURL(f)} />
                                            <div className="cursor-pointer" onClick={() => { setImage(); }}>X</div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="w-full sticky bottom-0 bg-white border-t border-chatlook-grayLight py-3 z-20 px-12">
                        <div className="w-full flex items-center">
                            <div className={`chat-input ${replyMsg && "h-38"} items-end flex-col bg-[#f1f1f1] px-3 py-2 flex rounded-xl border border-chatlook-grayLight w-[calc(100%-40px)] relative mr-4`}>
                                {replyMsg && (
                                    <div className="relative flex w-full h-full p-5 mb-2 rounded-xl bg-chatlook-grayLight">

                                        {replyMsg.content.media.path !== "" && (
                                            <div className="mr-3 ">
                                                <img
                                                    className="w-full h-[50px]  rounded-md"
                                                    alt=""
                                                    src={`https://festumfield.s3.ap-south-1.amazonaws.com/${replyMsg.content.media.path}`}
                                                />
                                            </div>
                                        )}
                                        <i
                                            onClick={() => setReplyMsg(null)}
                                            className="icon-close text-sm cursor-pointer absolute top-2 right-2"
                                        ></i>
                                        <div>
                                            <p className="text-sm italic text-gray-700">
                                                {replyMsg?.content?.text?.message}
                                            </p>
                                            <p className="mt-2 text-xs">
                                                {replyMsg?.from?.fullName},{" "}
                                                {moment(replyMsg.createdAt).format("lll")}{" "}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex w-full">
                                    {/* <input
                    type="text"
                    name="Start a new massage"
                    className="w-full"
                    placeholder="Start a new message"
                    value={sendMsg}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        chatMessageSend();
                      }
                      socket.emit("typing", {
                        val: e.target.value,
                        to: id,
                        from: profileGets._id,
                      });
                    }}
                    onChange={(e) => setSendMsg(e.target.value)}
                  /> */}
                                    <InputEmoji

                                        type="text"
                                        cleanOnEnter
                                        name="Start a new massage"
                                        className="w-full"
                                        value={sendMsg}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.code === 'Enter') {
                                                e.preventDefault();
                                                chatMessageSend();
                                            }
                                            socket.emit("typing", {
                                                val: e.target.value,
                                                to: id,
                                                from: profileGets._id,
                                            });
                                        }}
                                        placeholder="Start a new message"
                                        onChange={setSendMsg}
                                    />
                                    < div className="flex items-center space-x-3 ml-auto call right-3" >
                                        {/* <span className="text-xl flex items-center justify-center rounded-full text-[#8094ae] cursor-pointer" >
                      <i className="icon-smile-face text-xl"></i>
                    </span> */}
                                        < span className="text-xl flex items-center justify-center rounded-full text-[#8094ae] cursor-pointer relative overflow-hidden" >
                                            {/* <input
                              className="absolute top-0 bottom-0 w-full h-full opacity-0"
                            /> */}
                                            <ImagePicker ImagePicker
                                                isDefaultDesign={false}
                                                showPreview={true}
                                                label={false}
                                                classNameMain="h-full"
                                                classNameDiv="h-full"
                                                // selectedFiles={image}
                                                onDrop={(files) => {

                                                    setImage(files);
                                                }}
                                            >
                                                <i
                                                    className="icon-img text-xl flex flex-col h-full justify-center space-y-2"
                                                    aria-hidden="true"
                                                ></i>
                                            </ImagePicker>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="btns">
                                {isValidMsg(sendMsg) ? (
                                    <div
                                        className="ml-auto send"
                                        onClick={() => {
                                            chatMessageSend();
                                        }}
                                    >
                                        <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky shadow rounded-full text-[#8094ae] cursor-pointer mt-[-6px]">
                                            <i className="icon-send ml-1 text-white"></i>
                                        </span>
                                    </div>
                                ) : (
                                    <div className="ml-auto send">
                                        <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky shadow rounded-full text-[#8094ae] cursor-pointer opacity-50 mt-[-6px]">
                                            <i className="icon-send ml-1 text-white"></i>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default FriendSingleChat;
