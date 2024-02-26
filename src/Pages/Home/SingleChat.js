import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import HeaderDashboard from "../../Common/HeaderDashboard";
import Modal from "../../Common/Modals/Modal";
//import Product from "../../assets/images/product.png";
import { Context } from "../../createContext";
import { profileGet, useProfileGets } from "../../redux/Slice/profileSlice";
import { friendsRequestsSearch, getSingleFriend, gropusRequestsSearch, setMyNewFriedList, setMyNewGroupList, clearmYFriendList, useFriendsRequests, useMyFriendsList, useMyGroupList, useSingleFriend } from "../../redux/Slice/requestSlice";
import socket from '../../socket';
import moment from "moment";
import ImagePicker from "../../Common/ImagePicker";
import MsgContainers from "../../component/Chat/MsgContainers";
import InputEmoji from 'react-input-emoji';
import {
  chatSend,
  chatsOfList,
  getSingleGroup,
  setInquiryProduct,
  setReceiverId,
  useCurrentChatUser,
  useInquiryProduct,
  useListChat,
  useListChatPage,
  useReceiverId,
} from "../../redux/Slice/chatSlice";
import { useOnlineUsers } from "../../redux/Slice/socketSlice";
import { setVideoRingingPortalOpen, setVideoPortalOpen, setVoicePortalOpen, setLocalStream } from "../../redux/Slice/videoCallSlice";
import { setCurrentCall, setGroupVideoCall, setGroupCallStarted, setCurrentCallProfile, setCallAccepted, useCurrentCall, useCurrentCallProfile, useGroupCallStarted, chatCallStart, chatCallEnd } from "../../redux/Slice/callSlice";
import { Secondary } from "../../redux/services/toastServices";
import store from "../../redux/store";
import { useQuery } from "../../utils";
import { deliverMessage, seenMessage } from "../../redux/Slice/messageSlice";
// import { seenMessage } from "../../redux/Slice/messageSlice";
// import { allFriendsRequest } from "../../redux/services/requestServices";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";

function SingleChat() {
  const navigate = useNavigate()
  const profileGets = useProfileGets();
  const friendsRequests = useFriendsRequests();
  const location = useLocation();
  const friendId = localStorage.getItem("friendsId")
  const { id } = useParams();

  const currentChatUserData = useCurrentChatUser();
  //const { socket } = useSocket();
  const onlineUsers = useOnlineUsers();
  const dispatch = useDispatch();
  const listChatPage = useListChatPage();
  const listChat = useListChat();

  const inquiryProduct = useInquiryProduct();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  ///const [singleChatPagination, setSinglePagePagination] = useState({ page: 1, limit: 30 });

  const [sendMsg, setSendMsg] = useState("");
  const [image, setImage] = useState();
  const [isTyping, setIsTyping] = useState(false);
  //const [arrRev, setRev] = useState([]);

  const [replyMsg, setReplyMsg] = useState(null);
  const { rightSidebarToggle,
    //  allFriendsRequest
  } = useContext(Context);
  const scrollContainerRef = useRef();
  const containerRef = useRef();
  const receiverId = useReceiverId();
  const myFriendList = useMyFriendsList()
  const myNewGroupList = useMyGroupList()
  const [friendsProfile, setFriendsProfile] = useState({})
  // const friendsProfile = useSingleFriend()

  const profileGettingFunction = async () => {
    if (location.search == "?type=group") {
      const response = await dispatch(getSingleGroup({ groupid: id }))
      setFriendsProfile(response?.payload?.data?.Data)
    } else {
      const response = await dispatch(getSingleFriend({ friendid: id }))
      setFriendsProfile(response?.payload?.data?.Data)
    }
  }
  useEffect(() => {
    profileGettingFunction();
    setUserId(id);
    setPage(1);
    setMessages([]);
  }, [id]);

  useEffect(() => {
    if (userId !== null) {
      fetchMessages(page);
    }
  }, [page, userId]);

  // const onIncomingChatUser = useOnIncomingChat()
  const isGroup = useQuery()["type"] === "group";

  const allFriendsRequest = async () => {

    const payload = {
      page: 1,
      limit: 50,
      search: "",
    };
    if (location?.search === "?type=group") {
      const gpresponse = await dispatch(gropusRequestsSearch(payload)).unwrap();
      dispatch(setMyNewGroupList([...gpresponse?.data?.Data]))
    } else {
      const response = await dispatch(friendsRequestsSearch(payload)).unwrap();
      dispatch(setMyNewFriedList([...response?.data?.Data]))
    }
  }
  const groupMembers = friendsProfile?.members?.map((items) => {
    return items?._id?.fullName
  }).sort().join(", ").substring(0, 40);


  const memberIds = friendsProfile?.members?.map((item) => item?._id?._id);
  const videoCallPermission =
    (Boolean(friendsProfile?.permissions?.videocall) &&
      Boolean(friendsProfile?.permissions?.videocall)) ||
    isGroup;
  const voiceCallPermission =
    (Boolean(friendsProfile?.permissions?.audiocall) &&
      Boolean(friendsProfile?.permissions?.audiocall)) ||
    isGroup;


  useEffect(() => {
    function typeReceiveHandler(data) {
      if (data?.from === id) {
        setIsTyping(true);
      }
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }

    socket.on("typingReceive", typeReceiveHandler);

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      socket.off("typingReceive", typeReceiveHandler);
    };
  }, [id, socket]);

  const isUserOnline = onlineUsers[id?.toUpperCase()] !== undefined;

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "auto" });
    const lastElement = scrollContainerRef?.current?.lastElementChild;
  }

  const handleScroll = (event) => {
    // setScrollTop(event.currentTarget.scrollTop);
    if (event.currentTarget.scrollTop == 0) {
      if (hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
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

        console.log(response?.data?.Data);
        //setMessages((prevMessages) => [response.data.Data, ...prevMessages]);
        handleNewMessage();
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


  const fetchMessages = async (page) => {
    try {
      setIsLoading(true);
      // Fetch messages from your API based on the userId and page
      let payload = { page: page, limit: 30, to: userId }
      const response = await dispatch(chatsOfList(payload)).unwrap();
      console.log(response);
      console.log(response?.data?.Data?.hasNextPage);
      const newMessages = await response?.data?.Data?.docs;
      console.log()
      // Update messages state with the new messages

      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      // Check if there are more messages to load
      setHasMore(response?.data?.Data?.hasNextPage);
      if (page === 1) {
        console.log(newMessages[0].id);
        dispatch(seenMessage({ messageid: newMessages[0].id }));
        setTimeout(() => {
          scrollToBottom();
        }, 50);
      }

    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      // Set loader to false after fetching messages
      setIsLoading(false);
    }
  };

  const groupMessagesByDate = () => {
    const groupedMessages = new Map();

    messages.forEach((message) => {
      const date = new Date(message.timestamp).toLocaleDateString();

      if (!groupedMessages.has(date)) {
        groupedMessages.set(date, []);
      }

      groupedMessages.get(date).push(message);
    });

    return groupedMessages;
  };

  function formatDate(dateString) {
    // Parse the date string into a Date object
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(date, today)) {
      return "Today";
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const monthIndex = date.getMonth();
      const monthName = monthNames[monthIndex].toUpperCase();
      return date.getDate() + ' ' + monthName + ' ' + date.getFullYear();
    }
  }

  function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  const handleNewMessage = async () => {
    console.log("let", id);
    // Push the new message object to the bottom of the messages array
    let payload = { page: 1, limit: 5, to: id }
    const response = await dispatch(chatsOfList(payload)).unwrap();
    console.log(response);
    const newMessage = await response?.data?.Data?.docs[0];
    console.log(newMessage);
    //if (newMessage?.to?._id === id){
    //dispatch(deliverMessage({ messageid: newMessage?._id }))
    //}
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };


  useEffect(() => {
    const handleMessageOnComming = (parentkey) => {
      console.log("let", id);
      if (parentkey.event === "onIncomingChat" && socket) {
        if (parentkey?.data?.from === id) {
          console.log('parentkey?.data?.from', parentkey);
          const payload = { page: 1, limit: 50, search: "" };
          if (location?.search === "?type=group") {
            dispatch(gropusRequestsSearch(payload)).then((gpresponse) => {
              dispatch(setMyNewGroupList([...gpresponse?.payload?.data?.Data]))
            })
          } else {
            dispatch(friendsRequestsSearch(payload)).then((response) => {
              dispatch(setMyNewFriedList([...response?.payload?.data?.Data]));
            })
          }
          //dispatch(deliverMessage({ messageid: parentkey?.data?._id }))
          dispatch(seenMessage({ messageid: parentkey?.data?._id }));
          handleNewMessage();
        } else {
          console.log("call else part")
          const payload = { page: 1, limit: 50, search: "", };
          if (location?.search === "?type=group") {
            dispatch(gropusRequestsSearch(payload)).then((gpresponse) => {
              dispatch(setMyNewGroupList([...gpresponse?.payload?.data?.Data]))
            })
          } else {
            dispatch(friendsRequestsSearch(payload)).then((response) => {
              dispatch(setMyNewFriedList([...response?.payload?.data?.Data]));
            })
          }
        }
      }
      if (parentkey.event === "messageDelivered") {
        const payload = { page: 1, limit: 50, search: "", };
        if (location?.search === "?type=group") {
          dispatch(gropusRequestsSearch(payload)).then((gpresponse) => {
            dispatch(setMyNewGroupList([...gpresponse?.payload?.data?.Data]))
          })
        } else {
          dispatch(friendsRequestsSearch(payload)).then((response) => {
            dispatch(setMyNewFriedList([...response?.payload?.data?.Data]));
          })
        }
        //console.log("messageDelivered");
        // setMessages((prevMessages) =>
        //   prevMessages.map((message) =>
        //     message?._id === parentkey?.data?.messageid ? { ...message, status: "delivered" } : message
        //   ));
      }
      if (parentkey.event === "messageSeen") {
        console.log("messageSeen");
        console.log(parentkey?.data);
        console.log("let", id);
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message?._id === parentkey?.data?.messageid ? { ...message, status: "seen" } : { ...message, status: "seen" }
          ));
        const payload = {
          page: 1,
          limit: 50,
          search: "",
        };
        dispatch(friendsRequestsSearch(payload)).then((response) => {
          dispatch(setMyNewFriedList([...response?.payload?.data?.Data]));
        })
      }
      if (parentkey.event === 'onCallEnded') {
        console.log("call enden in single chat");
        dispatch(setCurrentCall(null));
        dispatch(setCallAccepted(false));
        const localStream = store.getState()?.videoCall?.localStream;
        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
          store.dispatch(setLocalStream(null));
        }
      }
    }
    if (profileGets?.channelID && socket) {
      socket.on(profileGets?.channelID, handleMessageOnComming);
    }
    return () => {
      // Clean up event listener when component unmounts
      if (profileGets?.channelID && socket) {
        socket.off(profileGets?.channelID, handleMessageOnComming);
      }
    };
  }, [id, profileGets?.channelID, socket]);


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

  }, [profileGets?.channelID, socket]);


  useEffect(() => {
    allFriendsRequest();
    dispatch(profileGet());
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

  function callUser({ isVideoCall }) {
    socket.emit("callUser", {
      memberIds: isGroup ? memberIds : [friendsProfile?._id, profileGets?._id],
      fromId: profileGets?._id,
      name: isGroup ? friendsProfile?.name : profileGets?.fullName,
      isVideoCall: isVideoCall,
      isGroupCall: isGroup,
      groupId: isGroup ? friendsProfile?._id : null,
      isCallingFromApp: false,
      isGroupCalling: isGroup
    });
    // if(isVideoCall) {
    //     let constraints = {
    //         video: {
    //             width: { max: 320 },
    //             height: { max: 240 },
    //             frameRate: { max: 30 },
    //         },
    //         audio: true,
    //     };
    //
    //     if (!isVideoCall) {
    //         constraints = {
    //             video: false,
    //             audio: true,
    //         };
    //     }
    //     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    //         console.log("datattttt", stream)
    //         store.dispatch(setLocalStream(stream));
    //     }).catch((error) => {
    //         // Custom error message
    //         console.error("Error accessing media devices:", error.message);
    //     })
    // }
    startCallAction(isVideoCall);
  }

  return (
    <>
      <HeaderDashboard />
      <main className="w-full overflow-auto">

        <div className="relative flex flex-col justify-between h-full px-12">
          <div className="w-full flex items-center sticky top-0 z-20 bg-white py-5">
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
                        : "Offline") : <div className="text-chatlook-sky text-sm block font-bold">{`${groupMembers}...`}</div>}
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
              {videoCallPermission ? (
                <>

                  <span
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Video call enable"
                    className={`text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky 
                      shadow rounded-full text-[#8094ae] cursor-pointer
                       `}
                    onClick={async () => {
                      const videoPermission = await navigator.permissions.query({ name: "camera" });
                      const audioPermission = await navigator.permissions.query({ name: "microphone" });
                      if (videoPermission.state === "granted" && audioPermission.state === "granted") {
                        if (videoCallPermission) {
                          callUser({ isVideoCall: true });
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
                </>) : (
                <>
                  <span
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Video call disable"
                    className={`text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight
                       shadow rounded-full text-[#8094ae] cursor-not-allowed
                      `}
                  >
                    <i className="icon-video-on text-white"></i>
                  </span>
                </>


              )}

              {
                voiceCallPermission ? (
                  <>
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Voice call enable"
                      className={`text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky
                     shadow rounded-full text-[#8094ae] cursor-pointer relative`}
                      onClick={async () => {
                        const audioPermission = await navigator.permissions.query({ name: "microphone" });
                        if (audioPermission.state === "granted") {
                          if (voiceCallPermission) {
                            callUser({ isVideoCall: false });
                            dispatch(setGroupCallStarted(isGroup));
                            dispatch(setCurrentCallProfile(friendsProfile));
                            ///if (isGroup) {
                            dispatch(setVideoRingingPortalOpen(false));
                            dispatch(setGroupVideoCall(false));
                            //} else {
                            dispatch(setVoicePortalOpen(true));
                            //}
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
                  </>
                ) : (
                  <>
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Voice call disable"
                      className={`text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight
                         shadow rounded-full text-[#8094ae] cursor-not-allowed
                         relative`}
                    >
                      <i
                        className="icon-phone-calling text-white"
                        aria-hidden="true"
                      ></i>
                    </span></>
                )
              }

            </div>
          </div>
          {/* <!-- chat-area  --> */}
          {
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="chat-holdr h-full overflow-y-auto px-6 -mx-6"
            >
              <div className="chatting-bar pt-7">
                <div className="w-full mx-auto space-y-3">
                  <div className="relative w-full flex justify-center py-2 m-3">
                    {isLoading && <div className="w-fit px-3 rounded-md bg-chatlook-grayLight">Loading</div>}
                    {!hasMore && <div className="w-fit px-3 rounded-md bg-chatlook-grayLight">No more messages</div>}
                  </div>
                  {Array.from(groupMessagesByDate()).reverse().map(([date, messagesInDate]) => (
                    <div key={date}>
                      <div className="relative w-full flex justify-center py-2 m-3">
                        <div className="w-fit px-3 rounded-md bg-chatlook-grayLight">{formatDate(date)}</div>
                      </div>
                      {messagesInDate.reverse().map((chatVal) => (
                        <MsgContainers
                          key={chatVal._id}
                          setReplyMsg={setReplyMsg}
                          chatVal={chatVal}
                        />
                      ))}
                    </div>
                  ))}
                  {/*{messages.length !== 0 && messages?.slice().reverse().map((chatVal) => {*/}
                  {/*return (*/}
                  {/*<MsgContainers*/}
                  {/*key={chatVal._id}*/}
                  {/*setReplyMsg={setReplyMsg}*/}
                  {/*chatVal={chatVal}*/}
                  {/*/>*/}
                  {/*);*/}
                  {/*})}*/}
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

          <div className="w-full sticky bottom-0 bg-white border-t border-chatlook-grayLight py-3 z-20">
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
            <Tooltip id="my-tooltip" place="top" />
          </div>
        </div>
      </main>
    </>
  );
}

export default SingleChat;
