import React, { useContext, useRef } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import socket from '../../socket';
import moment from "moment";
import { useDispatch } from "react-redux";
import { pinChat, setCurrentChatUser, useCurrentChatUser} from "../../redux/Slice/chatSlice";
import { Secondary, Success } from "../../redux/services/toastServices";
import { Context } from "../../createContext";
import ChatPin from "../../assets/images/svg/chat-pin.svg";
import { useOnlineUsers } from "../../redux/Slice/socketSlice";
import { friendsRequestsSearch, setMyNewFriedList} from "../../redux/Slice/requestSlice";
import { Clapperboard } from "lucide-react";

function SidebarChatListItem({ val, csc }) {
  //const { socket } = useSocket();
  const { allFriendsRequest, rightSidebarToggle } = useContext(Context);
  const onlineUsers = useOnlineUsers();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserOnline = useMemo(
    () => onlineUsers[val._id?.toUpperCase()] !== undefined,
    [onlineUsers]
  );

  //console.log("response", response);

  // const singleUser = useCurrentChatUser();
  // console.log('singleUser', singleUser)

  const [isTyping, setIsTyping] = useState(false);
  // const [isPinned, setIsPinned] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const moreRef = useRef(null);

  const groupParam = val.members ? "?type=group" : "";
  function typeReceiveHandler() {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  }

  useEffect(() => {
    socket.on("typingReceive", ({ from }) => {
      if (val._id?.toUpperCase() == from?.toUpperCase()) {
        typeReceiveHandler();
      }
    });
  }, []);

  const hendlearrowclick = (e) => {
    setShowMoreOptions(!showMoreOptions);
    e.stopPropagation();
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMoreOptions(false);
      }
    };
    if (showMoreOptions) {
      document.addEventListener("click", handleDocumentClick);
    }
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showMoreOptions]);
  async function pinUnpinHandler() {
    const response = await dispatch(
      pinChat({
        userid: val._id,
        isPinned: !val.is_pinned,
      })
    );
    const updatePayload = {
      page: 1,
      limit: 50,
      search: "",
    };
    if (response?.payload?.data?.IsSuccess) {
      Success(response?.payload?.data?.Message);
      // allFriendsRequest();
      const updateResponse = await dispatch(
        friendsRequestsSearch(updatePayload)
      ).unwrap();
      // setMyFriendList((pre) => [...pre, ...response?.data?.Data]);
      dispatch(setMyNewFriedList([...updateResponse?.data?.Data]));
    } else {
      Secondary("Error! Unable to pin chat!");
    }
  }

  return (
    <div
      className="cursor-pointer p-2.5 notifications-box user-box rounded-lg group"
      ref={moreRef}
    >
      <div
        onClick={() => {
          rightSidebarToggle("");
          navigate(`/dashboard/chats/chatdetails/${val._id}${groupParam}`,{ replace: true });
          dispatch(setCurrentChatUser(val));
        }}
        className="flex items-center space-x-3"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
            {val.profileimage ? (
              <img
                src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val.profileimage}`}
                className="object-cover w-full h-full"
                alt="woman"
              />
            ) : (
              <div className="icon-user h-full w-full text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"></div>
            )}
          </div>
          {isUserOnline ? (
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 absolute bottom-0 right-0 border border-white"></span>
          ) : null}
        </div>
        <div className="w-[calc(100%-54px)] mt-1">
          <div className="user-name flex justify-between ">
            <h4 className="whitespace-nowrap overflow-ellipsis overflow-hidden capitalize font-bold">
              {val?.members
                ? val?.name
                : val?.fullName
                  ? val?.fullName
                  : val?.nickName
                    ? `${val.nickName}`
                    : "Unknown User"}
            </h4>
            <div className="relative flex items-start ml-auto pr-1">
              {csc !== "group" && (
                <>
                  <span
                    className=" hidden group-hover:block icon-down-arrow"
                    onClick={hendlearrowclick}
                  ></span>
                </>
              )}
              {showMoreOptions && (
                <div className="absolute top-full right-0  hover:block  min-w-[80px] bg-white shadow-md rounded-lg z-10 space-y-2.5 p-2.5">
                  <span onClick={pinUnpinHandler} className={`block  mb-0  `}>
                    {val.is_pinned ? "Unpin" : "Pin"}
                  </span>
                </div>
              )}
            </div>
            <span>
              {/* {moment(val?.last_message?.createdAt).format("LT")} */}
              {val.members
                ? val?.lastchatmessage?.timestamp
                  ? moment(val.lastchatmessage.timestamp).format("LT")
                  : ""
                : val?.last_message?.timestamp
                  ? moment(val.last_message.timestamp).format("LT")
                  : ""}
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden text-chatlook-sky">
            {
  isTyping
    ? "Typing..."
    : (
      (val?.last_message?.contentType === "text" )
        ? val?.last_message?.content?.text?.message
        : (val?.last_message?.contentType === "call" && val?.last_message.callid?.isAudioCall)
            ? (
              <div className="flex items-center text-chatlook-sky  space-x-1">
              <span className="icon-phone-calling text-chatlook-sky text-base"></span>
              <p className="text-chatlook-sky text-sm"> Audio Call</p>
              </div>
            )
            : (val?.last_message?.contentType === "call" && val?.last_message.callid?.isVideoCall)
              ? (
                <div className="flex items-center text-chatlook-sky  space-x-1">
              <span className="icon-video-on text-chatlook-sky text-base"></span>
              <p className="text-chatlook-sky text-sm"> Video Call</p>
              </div>
              )
              : (val?.last_message?.contentType === "media" && val?.last_message?.content?.media?.mime === "image/jpeg")
              ? (
                <div className="flex items-center text-chatlook-sky  space-x-1">
              <span className="icon-img text-chatlook-sky text-sm"></span>
              <p className="text-chatlook-sky text-sm"> Image </p>
              </div>
              ) :(val?.last_message?.contentType === "media" && val?.last_message?.content?.media?.mime === "video/mp4")
              ? (
                <div className="flex items-center text-chatlook-sky  space-x-1">
        
              <Clapperboard className="icon-img text-chatlook-sky " size={16} />
              <p className="text-chatlook-sky text-sm"> Video</p>
              </div>
              ):null
    )
}
            </span>
            {val.is_pinned && (
              <span className="mr-3">
                <img src={ChatPin} height={15} width={15} />
              </span>
            )}
            {val?.unreadmessage_count !== 0 && (
              <span className="p-1 bg-chatlook-sky text-white rounded-full">
                {val?.unreadmessage_count}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarChatListItem;
