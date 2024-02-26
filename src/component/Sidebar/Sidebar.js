import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
//import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import socket from '../../socket';
import Modal from "../../Common/Modals/Modal";
import Woman from "../../assets/images/woman.png";
import { Context } from "../../createContext";
import { useNotificationslist } from "../../redux/Slice/notificationSlice";
import { profileGet, useProfileGets } from "../../redux/Slice/profileSlice";
import { friendsRequestsSearch, gropusRequestsSearch, setMyNewFriedList, setMyNewGroupList, setMySearchFriendsList, useFriendsList, useFriendsRequests, useMyFriendsList, useMyGroupList, useMySearchFriendsList } from "../../redux/Slice/requestSlice";
import { callsOfList } from "../../redux/Slice/callSlice";
import { getSingleGroup } from "../../redux/Slice/chatSlice";
import SidebarChatListItem from "../Chat/SidebarChatListItem";
import CallHistoryItem from "../Chat/CallHistoryItem";
import MarketingPopUp from "../Popups/DashboardPopup/MarketingPopUp";
import NewBroadcastPopUp from "../Popups/DashboardPopup/NewBroadcastPopUp";
import NewGroupPopUp from "../Popups/DashboardPopup/NewGroupPopUp";
import SettingsPopUp from "../Popups/DashboardPopup/SettingsPopUp";
import RightSidebar from "./RightSidebar";
import { setOnlineUsers } from "../../redux/Slice/socketSlice";
import InfiniteScroll from "./InfiniteScroll";
import { PulseLoader } from "react-spinners";
import store from "../../redux/store";
import FriendList from "./FriendList";
import GroupList from "./GroupList";
import CallHistory from "./CallHistory";

function Sidebar() {
  //const { socket } = useSocket();
  const { data, notificationList, allFriendsRequest, rightSidebarToggle } = useContext(Context);
  const navigate = useNavigate();
  //const [friendsLists, setFriendList] = useState([]);
  // Chats Data Object
  const [friends, setFriends] = useState([]);
  const [friendspage, setFriendsPage] = useState(1);
  const [friendsloading, setFriendsLoading] = useState(false);
  const [friendshasMore, setFriendsHasMore] = useState(true);

  // Call History Object
  const [calldata, setCallData] = useState([]);
  const [callpage, setCallPage] = useState(1);
  const [callloading, setCallLoading] = useState(false);
  const [callhasMore, setCallHasMore] = useState(true);
  const [loading, setLoading] = useState(false)

  const [chatDropDown, setChatDropDown] = useState(false);
  const [csc, setCsc] = useState("chats");
  const [isNewBroadcastPopUpOpen, setIsNewBroadcastPopUpOpen] = useState(false);
  const [isNewGroupPopUpOpen, setIsNewGroupPopUpOpen] = useState(false);
  const [isMarketingPopUpOpen, setIsMarketingPopUpOpen] = useState(false);
  const [isRequestsPopUpOpen, setIsRequestsPopUpOpen] = useState(false);
  const [isSettingsPopUpOpen, setIsSettingsPopUpOpen] = useState(false);
  const [pin, setPin] = useState(false);
  const dispatch = useDispatch();
  const notificationslist = useNotificationslist();
  const profileGets = useProfileGets();
  const channelID = profileGets?.channelID
  const [searchrequest, setSearchRequest] = useState("");
  const [searchGrouprequest, setSearchGroupRequest] = useState("");

  const myNewGroupList = useMyGroupList()

  function logoutHandler() {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/login";
    }, 0);
  }

  const groupUpdateBySocket = useCallback(async (data) => {
    try {
      const payload = {
        groupid: data.data.groupid
      }
      const response = await dispatch(getSingleGroup(payload)).unwrap();
      if (response?.data?.IsSuccess) {
        if (data.event === 'onGroupCreation') {
          const updatedGroupList = [...myNewGroupList];
          updatedGroupList.unshift(response?.data?.Data);
          dispatch(setMyNewGroupList(updatedGroupList));
        }

      } else {
        alert(response?.data?.Message);
      }
    } catch (error) {
    }
  }, [myNewGroupList, setMyNewGroupList]);

  useEffect(() => {
    const handleGroupAction = (message) => {
      if (message.event === 'onGroupCreation' || message.event === 'onGroupUpdate') {
        groupUpdateBySocket(message);
      }
    };
    if (profileGets?.channelID && socket) {
      socket.on(profileGets.channelID, handleGroupAction);
    }
    return () => {
      if (profileGets?.channelID && socket) {
        socket.off(profileGets.channelID, handleGroupAction);
      }
    };
  }, [profileGets?.channelID, socket, groupUpdateBySocket]);

  useEffect(() => {
    setFriendsPage(1);
    setCallPage(1);
    setFriendsHasMore(true);
  }, [])

  return (
    <>
      <div className="flex items-start overflow-hidden main h-screen">
        <aside className="flex flex-col h-full">
          <div className="">
            <div className="px-3.5 pb-4 bg-chatlook-sky/20" onClick={() => { rightSidebarToggle("") }}>
              <div className="relative flex items-center w-full h-20">
                <div
                  onClick={() => navigate("/dashboard/profile")}
                  className="items-center hidden space-x-3 md:flex"
                >
                  <div className="flex w-10 h-10 pb-0 overflow-hidden rounded-full bg-slate-200">
                    {profileGets?.profileimage ? (
                      <img
                        className="object-cover w-full h-full"
                        src={`https://festumfield.s3.ap-south-1.amazonaws.com/${profileGets?.profileimage}`}
                        alt="Profile pic"
                      />
                    ) : (
                      <div className="flex items-center justify-center object-cover w-10 h-10 overflow-hidden text-2xl rounded-full icon-user text-chatlook-gray bg-slate-200"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-bold capitalize cursor-pointer text-chatlook-dark">
                      Hii !  {profileGets?.fullname ? profileGets?.fullname : `${profileGets?.mobile?.slice(-10)}`}
                    </h4>
                    <span className="block text-xs text-chatlook-gray">
                      {profileGets?.mobile?.slice(-10)}
                    </span>
                  </div>
                </div>
                <span className="flex px-1 ml-auto text-2xl cursor-pointer text-chatlook-dark">
                  <div
                    onClick={() => navigate("/dashboard/friendrequest")}
                    className="text-4xl icon-add-user"
                  ></div>
                </span>
                <span className="flex px-1 text-xl cursor-pointer text-chatlook-dark">
                  <div
                    onClick={() => setChatDropDown(!chatDropDown)}
                    className="text-4xl icon-dots-menu"
                  ></div>
                </span>
                {/* <!-- chat-dropdown  --> */}
                {chatDropDown ? (
                  <>
                    <div className="">
                      <div
                        className="absolute top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen"
                        onClick={() => {
                          setChatDropDown(false);
                        }}
                      ></div>

                      <div
                        id="chat-drop"
                        className="p-4 shadow-one bg-white absolute top-16 right-5 z-20 space-y-3 rounded-md min-w-[120px] origin-top visited:hidden anim"
                        style={{ zIndex: "9999999999999" }}
                      >
                        <h4>
                          <div className="cursor-pointer" onClick={() => navigate("/meeting")}>
                            Meetings
                          </div>
                        </h4>
                        <h4>
                          <div className="cursor-pointer" onClick={() => navigate("/chat/pin/new")}>
                            Chat lock
                          </div>
                        </h4>
                        <h4>
                          <div className="cursor-pointer" onClick={() => navigate("/chat/pin/enter")}>
                            Hide Chat
                          </div>
                        </h4>
                        <h4>
                          <div className="cursor-pointer" onClick={() => navigate("/dashboard/broacast/:id")}>
                            Broadcast
                          </div>
                        </h4>
                        <h4>
                          <div className="cursor-pointer" onClick={() => setIsNewGroupPopUpOpen(true)}>
                            New Group
                          </div>
                        </h4>
                        <h4>
                          <div className="cursor-pointer" onClick={() => navigate("/dashboard/profile")}>
                            Profile
                          </div>
                        </h4>
                        <h4>
                          <div className="cursor-pointer">
                            Settings
                          </div>
                        </h4>
                        <h4>
                          <div className="cursor-pointer" onClick={logoutHandler}>
                            Logout
                          </div>
                        </h4>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              {/* <!-- search-bar  --> */}
              <div className="flex items-center space-x-3 tab-search">
                <label
                  htmlFor="text"
                  className="w-[calc(100%-52px)] py-2.5 px-3 flex items-center rounded-md border bg-white border-chatlook-grayLight"
                >
                  <i className="mr-2 icon-search text-chatlook-gray"></i>
                  <input
                    type="text"
                    name="Search"
                    // id="Search"
                    placeholder="Search"
                    className="w-full outline-none"
                    // onChange={handleChange}
                    onChange={(e) => {
                      setLoading(true)
                      setTimeout(() => {
                        if (csc == "chats") {
                          setSearchGroupRequest("")
                          setSearchRequest(e.target.value);
                        } else if (csc == "group") {
                          setSearchRequest("");
                          setSearchGroupRequest(e.target.value)
                        }
                      }, 500);
                      setLoading(false)
                    }}
                  />
                </label>
                <div
                  onClick={() => navigate("/dashboard/findfriends")}
                  className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky shadow rounded-lg text-[#8094ae]"
                >
                  <i className="text-white icon-location" aria-hidden="true"></i>
                </div>
              </div>
            </div >
            {/* <!-- tab-btn--> */}
            < div className="aside-tabs w-full px-3.5 py-4" >
              {/* <!-- tab-header  --> */}
              <div div className="tab-menu flex justify-between p-[10px]  bg-chatlook-grayLight rounded-md" onClick={() => { rightSidebarToggle("") }} >
                <div
                  onClick={() => {
                    // navigate("/dashboard/chats/chatdetails");
                    setCsc("chats");
                    navigate("../dashboard")
                  }}
                  className={
                    csc === "chats"
                      ? "py-2 px-5 bg-white text-chatlook-sky text-sm w-1/2 cursor-pointer font-bold text-center uppercase shadow rounded-md "
                      : "py-2 px-5 text-sm font-bold uppercase cursor-pointer w-1/2 text-center"
                  }
                >
                  Chats
                </div>
                <div
                  onClick={() => { setCsc("group"); navigate("../dashboard") }}
                  className={
                    csc === "group"
                      ? "py-2 px-5 bg-white text-chatlook-sky text-sm font-bold uppercase shadow rounded-md"
                      : "py-2 px-5 text-sm font-bold uppercase cursor-pointer"
                  }
                >
                  group
                </div>
                <div
                  onClick={() => { setCsc("calls"); navigate("../dashboard") }}
                  className={
                    csc === "calls"
                      ? "py-2 px-5 bg-white text-chatlook-sky text-sm  w-1/2 text-center font-bold uppercase shadow rounded-md"
                      : "py-2 px-5 text-sm font-bold uppercase  w-1/2 text-center  cursor-pointer"
                  }
                >
                  Calls
                </div>
              </div >
            </div >
          </div>
          {/* <!-- all tabs --> */}
          <div>
            {(
              <>
                <div className="w-full ">
                  <div className="tab-holder ">
                    <div className="chats-holder" id="chats">
                      {csc === "chats" && (
                        <>
                          <FriendList searchrequest={searchrequest} />
                          {/* <InfiniteScroll fetchData={fetchFriendsData} loading={friendsloading} hasMore={friendshasMore} /> */}
                        </>
                      )}
                      {csc === "group" && (
                        <>
                          <GroupList csc={csc} searchGrouprequest={searchGrouprequest} />
                        </>
                      )}
                      {csc === "calls" && (
                        <>
                          {/* <CallHistoryItem profileId={profileGets?._id} index={index} item={item} /> */}
                          <CallHistory />
                          {/* <InfiniteScroll fetchData={fetchCallHistoryData} loading={callloading} hasMore={callhasMore} /> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </aside >
        <div
          className={
            data === "like" ||
              data === "product" ||
              data === "productdetail" ||
              data === "userprofile"
              ? "main-content resize"
              : "main-content"
          }
          id="main-content"
        >
          <Outlet />
        </div>
        <RightSidebar />
      </div >
      <Modal isOpen={isNewBroadcastPopUpOpen}>
        <NewBroadcastPopUp handleClose={setIsNewBroadcastPopUpOpen} />
      </Modal>
      <Modal isOpen={isNewGroupPopUpOpen}>
        <NewGroupPopUp handleClose={setIsNewGroupPopUpOpen} />
      </Modal>
      <Modal isOpen={isMarketingPopUpOpen}>
        <MarketingPopUp handleClose={setIsMarketingPopUpOpen} />
      </Modal>
      <Modal isOpen={isRequestsPopUpOpen}>
        {/* <RequestsPopup handleClose={setIsRequestsPopUpOpen} /> */}
      </Modal>
      <Modal isOpen={isSettingsPopUpOpen}>
        <SettingsPopUp handleClose={setIsSettingsPopUpOpen} />
      </Modal>
    </>
  );
}

export default Sidebar;
