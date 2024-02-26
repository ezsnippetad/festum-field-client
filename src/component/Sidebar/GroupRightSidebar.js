import React, { useEffect, useCallback } from "react";
import { useContext } from "react";
import socket from '../../socket';
import { Context } from "../../createContext";
import { useQuery } from "../../utils";
import { useParams } from "react-router-dom";
import {
  friendsRequestsSearch,
  useFriendRequestFromId,
  useFriendsRequests,
  useMyGroupList,
} from "../../redux/Slice/requestSlice";
import AddMember from "../../assets/images/AddMember.svg";
import Search from "../../assets/images/Search.svg";
import { useState } from "react";
import Modal from "../../Common/Modals/Modal";
import AddPeoplePopup from "../Popups/DashboardPopup/AddPeoplePopup";
import AddMemberDropDown from "../Popups/DashboardPopup/AddMemberDropDown";
import EditGroupPopup from "../Popups/DashboardPopup/EditGroupPopup";
import { useProfileGets } from "../../redux/Slice/profileSlice";
import { useDispatch } from "react-redux";
import { getSingleGroup, useCurrentChatUser, useSingleGroup } from "../../redux/Slice/chatSlice";
//import { useSocket } from "../../redux/Slice/socketSlice";
import { setVideoRingingPortalOpen, setVideoPortalOpen, setVoicePortalOpen } from "../../redux/Slice/videoCallSlice";
import { setCurrentCall, setGroupCallStarted, setCurrentCallProfile, useCurrentCall, useCurrentCallProfile, useGroupCallStarted, chatCallStart, chatCallEnd } from "../../redux/Slice/callSlice";
import AuthorizedGroupPermissionPopUp from "../Popups/DashboardPopup/AuthorizedGroupPermissionPopUp";
import ExiteFromGroup from "../Popups/DashboardPopup/ExiteFromGroup";
import { X } from "lucide-react";

function GroupRightSidebar() {
  const { rightSidebarToggle } = useContext(Context);
  const dispatch = useDispatch();
  //const { socket } = useSocket();
  const [addPeoplePopupOpen, setAddPeoplePopupOpen] = useState(false);
  const [groupPermissionPopup, setGroupPermissionPopup] = useState(false);
  const profileGets = useProfileGets();
  const [editGroup, setEditGroup] = useState(false)
  const [dropDownId, setDropDownId] = useState(null);
  const { id } = useParams();
  const [exitFromGroupPopUpOpen, setExitFromGroupPopUpOpen] = useState(false)
  const [searchBar, setSearchBar] = useState(false)
  const [selectedItem, setSelectedItem] = useState({
    index: null,
    showDropdown: false,
  });
  const [seletedMemberId, setSeletedMemberId] = useState(null);
  // const groupData = useCurrentChatUser()
  const myNewGroupList = useMyGroupList()


  // const groupData = myNewGroupList?.find((items) => {
  //   return items?._id == id
  // })

  const groupData = useSingleGroup()

  const [searchMember, setSearchMember] = useState("")
  const isGroup = useQuery()["type"] === "group";
  const memberIds = groupData?.members?.map((item) => item?._id?._id);
  const memberList = groupData?.members
  const filtermember = memberList?.filter((items) => {
    return items?._id?.fullName.toUpperCase().includes(searchMember.toUpperCase())
  })

  const getSingleGroupFunction = async () => {
    const response = await dispatch(getSingleGroup({ groupid: id }))

  }

  // getting group data from friend requests based on id param.
  // const groupData = useFriendRequestFromId(id);

  const groupId = groupData?._id;
  const videoCallPermission = (Boolean(groupData?.sender_scope?.videocall) && Boolean(groupData?.receiver_scope?.videocall)) || isGroup;
  const voiceCallPermission = (Boolean(groupData?.sender_scope?.audiocall) && Boolean(groupData?.receiver_scope?.audiocall)) || isGroup;


  useEffect(() => {
    getSingleGroupFunction()
  }, [])

  const handleClick = (itemIndex, item) => {
    if (!item?._id?._id.includes(groupData?.createdBy)) {
      setSelectedItem((prevState) => ({
        index: itemIndex,
        showDropdown: !prevState.showDropdown,
      }));
    }
  };
  const startCallAction = useCallback(async (isVideoCall) => {
    try {
      const payload = {
        from: profileGets?._id,
        to: groupData?._id, // user or group id
        isVideoCall: isVideoCall,
        isGroupCall: true,
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
  }, [dispatch, profileGets, groupData]);
  function callUser({ isVideoCall }) {
    socket.emit("callUser", {
      memberIds: memberIds,
      fromId: profileGets?._id,
      name: groupData?.name,
      isVideoCall: isVideoCall,
      isGroupCall: true,
      groupId: groupId,
      isCallingFromApp: false,
      isGroupCalling: true
    });
    startCallAction(isVideoCall);
  }

  useEffect(() => {
    dispatch(friendsRequestsSearch({
      page: 1,
      limit: 50,
      search: ""
    }))
  }, [editGroup, setEditGroup])

  return (
    <>
      <div className="bisnuss-user-profile w-[360px]">
        <div className="p-4 h-20 flex items-center space-x-3 border-b border-[#e5e9f2] border-solid bg-white">
          <i
            className="icon-close text-lg cursor-pointer"
            onClick={() => rightSidebarToggle("")}
          ></i>
          <h3>Contact Details</h3>
        </div>

        <div className="h-[calc(100vh-80px)] mt-auto overflow-x-hidden overflow-y-auto bg-white">
          <div className="bg-chatlook-sky p-[30px] space-y-4">
            <div className="w-28 h-28 border-4 border-white rounded-full mx-auto overflow-hidden flex justify-center">


              {groupData?.profileimage !== "" ?
                (<img
                  className="w-full h-full rounded-full overflow-hidden"
                  src={`https://festumfield.s3.ap-south-1.amazonaws.com/${groupData?.profileimage}`}
                  alt="group profile"
                />) : (<div
                  className="icon-user h-full w-full text-white rounded-full text-5xl justify-center items-center flex icon-user overflow-hidden object-cover"

                />)

              }
            </div>
            <div className="user-name text-center">
              <h3 className="text-white">{groupData?.name}</h3>
              {/* <h4 className="font-normal text-white">{"esfsodifoii"}</h4> */}
            </div>
            <div className="flex space-x-3 justify-center">
              <div
                onClick={() => {
                  // if (videoCallPermission) setIsVideoCallZoomPopUpOpen(true);
                }}
                className="video-btn-sky space-y-1 text-center"
              >
                <button
                  className={`text-sm px-2 w-fit h-10 flex items-center justify-center bg-white rounded-lg text-${groupData?.createdBy == profileGets?._id
                    ? "chatlook-sky cursor-pointer"
                    : "gray-200 cursor-not-allowed"
                    }`}
                  onClick={() => { setEditGroup(true); }}
                  disabled={groupData?.createdBy !== profileGets?._id}
                >
                  EDIT GROUP INFO
                </button>
                {/* <p className="text-[12px] text-white font-normal"></p> */}
              </div>
              <div
                onClick={() => {
                  if (videoCallPermission) {
                    callUser({ isVideoCall: true });
                    dispatch(setGroupCallStarted(true));
                    dispatch(setCurrentCallProfile(groupData));
                    dispatch(setVideoRingingPortalOpen(true));
                    rightSidebarToggle("");
                  }
                }}
                className="video-btn-sky space-y-1 text-center"
              >
                <span
                  className={`text-xl w-10 h-10 flex items-center justify-center bg-white rounded-lg text-${true
                    ? "chatlook-sky cursor-pointer"
                    : "gray-200 cursor-not-allowed"
                    }`}
                >
                  <i className="icon-video-on" aria-hidden="true"></i>
                </span>
                <p className="text-[12px] text-white font-normal">Video</p>
              </div>
              <div
                onClick={() => {
                  if (voiceCallPermission) {
                    callUser({ isVideoCall: false });
                    dispatch(setGroupCallStarted(true));
                    dispatch(setCurrentCallProfile(groupData));
                    dispatch(setVideoRingingPortalOpen(true));
                    rightSidebarToggle("");
                  }
                }}
                className="call-btn-sky space-y-1 text-center"
              >
                <span
                  className={`text-xl w-10 h-10 flex items-center justify-center shadow  bg-white rounded-lg text-${true
                    ? "chatlook-sky cursor-pointer"
                    : "gray-200 cursor-not-allowed"
                    }`}
                >
                  <i className="icon-phone-calling" aria-hidden="true"></i>
                </span>
                <p className="text-[12px] text-white font-normal">Audio</p>
              </div>
            </div>

            {/* {tab == "personalinfo" && permissions?.socialmedia && (
                  <div className="flex items-center justify-center space-x-5">
                    <a target="_blank" href={facebook}>
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M22.0425 43.8335C34.1237 43.8335 43.9175 34.0397 43.9175 21.9585C43.9175 9.87727 34.1237 0.0834961 22.0425 0.0834961C9.96125 0.0834961 0.16748 9.87727 0.16748 21.9585C0.16748 34.0397 9.96125 43.8335 22.0425 43.8335Z"
                          fill="#3B5998"
                        ></path>{" "}
                        <path
                          d="M27.541 22.8148H23.6377V37.1148H17.7238V22.8148H14.9111V17.7892H17.7238V14.5371C17.7238 12.2115 18.8285 8.56982 23.6903 8.56982L28.0709 8.58815V13.4663H24.8925C24.3711 13.4663 23.638 13.7268 23.638 14.8362V17.7939H28.0577L27.541 22.8148Z"
                          fill="white"
                        ></path>{" "}
                      </svg>
                    </a>
                    <a target="_blank" href={insta}>
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 45 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M22.75 43.9727C34.8852 43.9727 44.7227 34.1352 44.7227 22C44.7227 9.86484 34.8852 0.0273438 22.75 0.0273438C10.6148 0.0273438 0.777344 9.86484 0.777344 22C0.777344 34.1352 10.6148 43.9727 22.75 43.9727Z"
                          fill="url(#paint0_linear_1367_285)"
                        ></path>{" "}
                        <path
                          d="M27.418 9.79297H18.0918C13.9316 9.79297 10.5527 13.1719 10.5527 17.332V26.6582C10.5527 30.8184 13.9316 34.1973 18.0918 34.1973H27.418C31.5781 34.1973 34.957 30.8184 34.957 26.6582V17.332C34.957 13.1719 31.5781 9.79297 27.418 9.79297ZM32.2324 26.668C32.2324 29.3242 30.0742 31.4922 27.4082 31.4922H18.082C15.4258 31.4922 13.2578 29.334 13.2578 26.668V17.3418C13.2578 14.6855 15.416 12.5176 18.082 12.5176H27.4082C30.0645 12.5176 32.2324 14.6758 32.2324 17.3418V26.668Z"
                          fill="white"
                        ></path>{" "}
                        <path
                          d="M22.75 15.7598C19.3125 15.7598 16.5098 18.5625 16.5098 22C16.5098 25.4375 19.3125 28.2402 22.75 28.2402C26.1875 28.2402 28.9902 25.4375 28.9902 22C28.9902 18.5625 26.1875 15.7598 22.75 15.7598ZM22.75 25.7891C20.6602 25.7891 18.9609 24.0898 18.9609 22C18.9609 19.9102 20.6602 18.2109 22.75 18.2109C24.8398 18.2109 26.5391 19.9102 26.5391 22C26.5391 24.0898 24.8398 25.7891 22.75 25.7891Z"
                          fill="white"
                        ></path>{" "}
                        <path
                          d="M29.4654 16.444C30.0403 16.3508 30.4308 15.8092 30.3376 15.2342C30.2444 14.6593 29.7028 14.2688 29.1279 14.362C28.553 14.4552 28.1625 14.9968 28.2557 15.5717C28.3489 16.1467 28.8905 16.5372 29.4654 16.444Z"
                          fill="white"
                        ></path>{" "}
                        <defs>
                          {" "}
                          <linearGradient
                            id="paint0_linear_1367_285"
                            x1="6.01943"
                            y1="38.7306"
                            x2="37.245"
                            y2="7.50498"
                            gradientUnits="userSpaceOnUse"
                          >
                            {" "}
                            <stop stopColor="#FEE411"></stop>{" "}
                            <stop
                              offset="0.0518459"
                              stopColor="#FEDB16"
                            ></stop>{" "}
                            <stop offset="0.1381" stopColor="#FEC125"></stop>{" "}
                            <stop offset="0.2481" stopColor="#FE983D"></stop>{" "}
                            <stop offset="0.3762" stopColor="#FE5F5E"></stop>{" "}
                            <stop offset="0.5" stopColor="#FE2181"></stop>{" "}
                            <stop offset="1" stopColor="#9000DC"></stop>{" "}
                          </linearGradient>{" "}
                        </defs>{" "}
                      </svg>
                    </a>
                    <a target="_blank" href={twitter}>
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 45 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M22.5425 43.8335C34.6237 43.8335 44.4175 34.0397 44.4175 21.9585C44.4175 9.87727 34.6237 0.0834961 22.5425 0.0834961C10.4613 0.0834961 0.66748 9.87727 0.66748 21.9585C0.66748 34.0397 10.4613 43.8335 22.5425 43.8335Z"
                          fill="#03A9F4"
                        ></path>{" "}
                        <path
                          d="M36.7133 13.1712C35.6475 13.6367 34.52 13.9459 33.3659 14.0894C34.5826 13.3679 35.4921 12.2248 35.9218 10.8772C34.783 11.5531 33.537 12.0291 32.2376 12.2847C31.4413 11.4331 30.4073 10.8409 29.2699 10.585C28.1325 10.3291 26.9444 10.4214 25.8602 10.8499C24.776 11.2784 23.8458 12.0232 23.1906 12.9875C22.5354 13.9518 22.1856 15.0909 22.1866 16.2567C22.1825 16.7017 22.2279 17.1458 22.3219 17.5807C20.0105 17.4672 17.7491 16.8673 15.6854 15.8203C13.6217 14.7734 11.802 13.3028 10.3453 11.5047C9.59656 12.7838 9.36459 14.3006 9.69681 15.7451C10.029 17.1895 10.9004 18.4526 12.1327 19.276C11.2129 19.2512 10.3125 19.0054 9.50774 18.5593V18.6227C9.51032 19.9634 9.97441 21.2625 10.822 22.3014C11.6696 23.3403 12.849 24.0557 14.1619 24.3274C13.6651 24.458 13.153 24.5219 12.6393 24.5174C12.2694 24.5242 11.8998 24.4914 11.5369 24.4195C11.9131 25.5726 12.6373 26.5809 13.6099 27.3056C14.5825 28.0303 15.7557 28.4358 16.9683 28.4664C14.9135 30.0725 12.3805 30.9448 9.77254 30.9446C9.30786 30.9486 8.84343 30.9216 8.38232 30.864C11.0415 32.5785 14.1411 33.4844 17.305 33.4718C27.9979 33.4718 33.8437 24.6153 33.8437 16.9389C33.8437 16.6827 33.8437 16.4352 33.8235 16.1876C34.962 15.366 35.9412 14.3438 36.7133 13.1712Z"
                          fill="white"
                        ></path>{" "}
                      </svg>
                    </a>
                    <a target="_blank" href={linkdin}>
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 45 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M22.2925 43.8335C34.3737 43.8335 44.1675 34.0397 44.1675 21.9585C44.1675 9.87727 34.3737 0.0834961 22.2925 0.0834961C10.2112 0.0834961 0.41748 9.87727 0.41748 21.9585C0.41748 34.0397 10.2112 43.8335 22.2925 43.8335Z"
                          fill="#007AB9"
                        ></path>{" "}
                        <path
                          d="M35.3618 23.7187V32.7373H30.1331V24.3231C30.1331 22.2104 29.3781 20.7676 27.485 20.7676C26.0402 20.7676 25.182 21.739 24.8029 22.6795C24.6653 23.0156 24.6298 23.4824 24.6298 23.9538V32.7369H19.4007C19.4007 32.7369 19.4709 18.4861 19.4007 17.0109H24.6302V19.2394C24.6197 19.257 24.6049 19.2741 24.5955 19.2909H24.6302V19.2394C25.3251 18.1702 26.5643 16.6416 29.3427 16.6416C32.7827 16.6416 35.3618 18.8893 35.3618 23.7187ZM13.9306 9.43042C12.1419 9.43042 10.9717 10.6045 10.9717 12.1472C10.9717 13.657 12.108 14.8651 13.8619 14.8651H13.8959C15.7196 14.8651 16.8536 13.657 16.8536 12.1472C16.8189 10.6045 15.7196 9.43042 13.9306 9.43042ZM11.2825 32.7373H16.5096V17.0109H11.2825V32.7373Z"
                          fill="#F1F2F2"
                        ></path>{" "}
                      </svg>
                    </a>
                  </div>
                )} */}
          </div>
          <div className="flex items-start space-x-2.5 w-full m-5">
            <span className="icon-description text-chatlook-sky flex text-xl"></span>
            <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
              <h4 className="text-chatlook-dark font-bold">Description</h4>
              <span className="text-sm leading-5">{groupData?.description}</span>
            </div>
          </div>
          {/* <div className="p-5 space-y-5">
                <div className="teb-btn flex items-center -mx-5">
                  <h5
                    data-tab="tab-1"
                    className={
                      tab === "personalinfo"
                        ? "current text-base font-bold w-1/3 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                        : "text-base font-bold w-1/3 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                    }
                    onClick={() => setTab("personalinfo")}
                  >
                    Personal Info
                  </h5>
                  <h5
                    data-tab="tab-2"
                    className={
                      tab === "businessinfo"
                        ? "current text-base font-bold w-1/3 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                        : "text-base font-bold w-1/3 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                    }
                    onClick={() => setTab("businessinfo")}
                  >
                    Business Info
                  </h5>
                  <h5
                    data-tab="#"
                    className={
                      tab === "reels"
                        ? "current text-base font-bold w-1/3 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                        : "text-base font-bold w-1/3 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                    }
                    onClick={() => setTab("reels")}
                  >
                    My Reels
                  </h5>
                </div>
                {tab === "personalinfo" && (
                  <div
                    id="tab-1"
                    className="info-text current prasonal-info space-y-5"
                  >
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-user text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-35px)] text-sm space-y-1">
                        <h4 className="text-chatlook-dark font-bold">About us</h4>
                        <span className="leading-4 text-sm block">
                          {val?.aboutUs}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-cake text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Date of Birth
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {val?.dob}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-gender text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">Gender</h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {val?.gender}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-hobbies text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">Hobbies </h4>
                        <div className="flex flex-wrap space-x-1">
                          {val?.hobbies?.map((val) => {
                            return (
                              <span className="p-1 px-2 bg-chatlook-grayLight text-sm rounded-full my-1">
                                {val}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-mail text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">Email</h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {val?.emailId}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-phone-calling text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Phone Number
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          +{val?.contact_no}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {tab === "businessinfo" && (
                  <div id="tab-2" className="info-text business-info space-y-5">
                    <div className="flex items-start space-x-2.5 w-[70px] h-[70px] border-chatlook-sky border-[3px] bg-[#C28A64] rounded-full p-1">
                      <img
                        className="h-full w-full object-cover overflow-hidden rounded-full"
                        src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val?.businessprofile?.businessimage}`}
                        alt="business-info.png"
                      />
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-business text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Business Name
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {val?.businessprofile?.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-category text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">Category</h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {val?.businessprofile?.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-subcategory text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Subcategory
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {val?.businessprofile?.subCategory}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-description text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Description
                        </h4>
                        <span className="text-sm leading-4">
                          {val?.businessprofile?.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-location text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">Location</h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {busiAdd}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-business text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Interested Business Category
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {businessProfileGets.interestedCategory}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-subcategory text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Interested Business Subcategory
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {businessProfileGets.interestedSubCategory}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-brochure text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          View Brochure
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {businessProfileGets.brochure}
                        </span>
                      </div>
                      <div className="ml-auto py-2">
                        <span
                          className="icon-pdf text-chatlook-red flex text-xl"
                          onClick={() => setPdf(!pdf)}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}
                {tab === "groupinfo" && (
                  <div className="group-profile">
                    <div className="p-4 h-20 flex items-center space-x-3 border-b border-[#e5e9f2] border-solid">
                      <i
                        className="icon-close text-lg cursor-pointer"
                        onclick="removeFunction('right-side', 'group-chat');removeFunction('main-content', 'resize');"
                      ></i>
                      <h3>Friends Group</h3>
                    </div>
                    <div className="h-[calc(100vh-80px)] mt-auto overflow-x-hidden overflow-y-auto">
                      <div className="bg-chatlook-sky p-[30px] space-y-4">
                        <div>
                          <div className="w-28 h-28 bg-white border border-chatlook-sky rounded-full p-1 relative mx-auto">
                            <div className="w-full h-full flex justify-center items-center icon-user text-6xl rounded-full bg-chatlook-grayLight"></div>
                            <label
                              for="profial"
                              className="w-9 h-9 absolute bottom-0 right-0 text-base bg-white border border-chatlook-sky rounded-full z-10 icon-store flex justify-center items-center"
                            >
                              <input
                                type="file"
                                name=""
                                id="profial"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="user-name text-center">
                          <h3 className="text-white">Friends Group</h3>
                        </div>
                        <div className="flex space-x-3 justify-center">
                          <a className="bg-white text-chatlook-sky rounded-md text-sm font-semibold uppercase px-3 py-2.5">
                            Edit Group Info
                          </a>
                          <div className="video-btn-sky space-y-1 text-center">
                            <span className="text-xl w-10 h-10 flex items-center justify-center bg-white rounded-lg">
                              <i className="icon-video" aria-hidden="true"></i>
                            </span>
                          </div>
                          <div className="call-btn-sky space-y-1 text-center">
                            <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-white rounded-lg text-chatlook-sky">
                              <i className="icon-call " aria-hidden="true"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full pt-5 pb-5">
                        <div className="flex items-start space-x-2.5 w-full border-b border-chatlook-grayLight py-2 px-5">
                          <span className="icon-call flex text-xl"></span>
                          <div className="w-[calc(100%-35px)] text-sm space-y-1">
                            <h4 className="text-chatlook-dark font-bold">
                              Description
                            </h4>
                            <span className="leading-4 text-sm block">
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout.
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2.5 w-full border-b border-chatlook-grayLight py-3 px-5">
                          <span className="icon-mail flex text-xl"></span>
                          <div className="w-[calc(100%-40px)] flex items-center justify-between space-y-1.5">
                            <h4 className="text-chatlook-dark font-bold">
                              access permission
                            </h4>
                            <span className="-rotate-90 block text-chatlook-dark text-base ml-auto">
                              <i
                                className="icon-aroow-down"
                                onClick={() => setIsAuthPopupOpen(true)}
                              ></i>
                            </span>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="w-full flex items-center px-5 py-2">
                            <span className="inline-block">40 peoples</span>
                            <div className="flex items-center space-x-2 ml-auto">
                              <span className="icon-search text-lg inline-block"></span>
                              <button className="p-2.5 rounded-md icon-store text-chatlook-sky bg-chatlook-sky/20"></button>
                            </div>
                          </div>
                          <div className="min-h-[280px] max-h-[280px] overflow-y-auto">
                            <div className="py-3 px-5 notifications-box user-box relative group">
                              <div className="p-5 rounded-xl drop-shadow-lg absolute bg-white space-y-2 top-full invisible group-hover:visible group-hover:-translate-y-4 anim">
                                <a className="flex items-center text-sm">
                                  <span className="icon-store text-lg mr-2"></span>
                                  Message Hunter
                                </a>
                                <a className="flex items-center text-sm">
                                  <span className="icon-store text-lg mr-2"></span>
                                  View Profile
                                </a>
                                <a className="flex items-center text-sm">
                                  <span className="icon-store text-lg mr-2"></span>
                                  Remove Member
                                </a>
                              </div>
                              <a className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                                  <img
                                    src="../assest/images/woman.png"
                                    className="object-cover"
                                    alt="woman"
                                  />
                                </div>
                                <div className="w-[calc(100%-54px)] flex items-center">
                                  <div className="user-name w-full">
                                    <h4 className="text-base font-bold whitespace-nowrap w-[75%] overflow-ellipsis overflow-hidden capitalize">
                                      Parsonal
                                    </h4>
                                    <span className="block whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden mt-1">
                                      +91 9537035854
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="py-3 px-5 notifications-box user-box">
                              <a className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                                  <img
                                    src="../assest/images/woman.png"
                                    className="object-cover"
                                    alt="woman"
                                  />
                                </div>
                                <div className="w-[calc(100%-54px)] flex items-center">
                                  <div className="user-name w-full">
                                    <h4 className="text-base font-bold whitespace-nowrap w-[75%] overflow-ellipsis overflow-hidden capitalize">
                                      Parsonal
                                    </h4>
                                    <span className="block whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden mt-1">
                                      +91 9537035854
                                    </span>
                                  </div>
                                  <span className="px-2 py-1 bg-chatlook-sky/20 text-chatlook-sky text-xs font-bold rounded-md block ml-auto">
                                    admin
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="py-3 px-5 notifications-box user-box">
                              <a className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                                  <img
                                    src="../assest/images/woman.png"
                                    className="object-cover"
                                    alt="woman"
                                  />
                                </div>
                                <div className="w-[calc(100%-54px)] flex items-center">
                                  <div className="user-name w-full">
                                    <h4 className="text-base font-bold whitespace-nowrap w-[75%] overflow-ellipsis overflow-hidden capitalize">
                                      Parsonal
                                    </h4>
                                    <span className="block whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden mt-1">
                                      +91 9537035854
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="py-3 px-5 notifications-box user-box">
                              <a className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                                  <img
                                    src="../assest/images/woman.png"
                                    className="object-cover"
                                    alt="woman"
                                  />
                                </div>
                                <div className="w-[calc(100%-54px)] flex items-center">
                                  <div className="user-name w-full">
                                    <h4 className="text-base font-bold whitespace-nowrap w-[75%] overflow-ellipsis overflow-hidden capitalize">
                                      Parsonal
                                    </h4>
                                    <span className="block whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden mt-1">
                                      +91 9537035854
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="py-3 px-5 notifications-box user-box">
                              <a className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                                  <img
                                    src="../assest/images/woman.png"
                                    className="object-cover"
                                    alt="woman"
                                  />
                                </div>
                                <div className="w-[calc(100%-54px)] flex items-center">
                                  <div className="user-name w-full">
                                    <h4 className="text-base font-bold whitespace-nowrap w-[75%] overflow-ellipsis overflow-hidden capitalize">
                                      Parsonal
                                    </h4>
                                    <span className="block whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden mt-1">
                                      +91 9537035854
                                    </span>
                                  </div>
                                  <span className="px-2 py-1 bg-chatlook-sky/20 text-chatlook-sky text-xs font-bold rounded-md block ml-auto">
                                    admin
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="py-3 px-5 notifications-box user-box">
                              <a className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                                  <img
                                    src="../assest/images/woman.png"
                                    className="object-cover"
                                    alt="woman"
                                  />
                                </div>
                                <div className="w-[calc(100%-54px)] flex items-center">
                                  <div className="user-name w-full">
                                    <h4 className="text-base font-bold whitespace-nowrap w-[75%] overflow-ellipsis overflow-hidden capitalize">
                                      Parsonal
                                    </h4>
                                    <span className="block whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden mt-1">
                                      +91 9537035854
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="py-3 px-5 notifications-box user-box">
                              <a className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                                  <img
                                    src="../assest/images/woman.png"
                                    className="object-cover"
                                    alt="woman"
                                  />
                                </div>
                                <div className="w-[calc(100%-54px)] flex items-center">
                                  <div className="user-name w-full">
                                    <h4 className="text-base font-bold whitespace-nowrap w-[75%] overflow-ellipsis overflow-hidden capitalize">
                                      Parsonal
                                    </h4>
                                    <span className="block whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden mt-1">
                                      +91 9537035854
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="text-right px-5 mt-3 sticky bottom-0 left-0 w-full bg-white">
                              <a className="text-sm text-chatlook-sky font-bold">
                                Show all
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3">
                        <span className="icon-delete text-2xl text-[#FC5858]"></span>
                        <p className="text-base font-semibold text-[#FC5858]">
                          Clear Chats
                        </p>
                      </div>
                      <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3">
                        <span className="icon-block text-2xl text-[#FC5858]"></span>
                        <p className="text-base font-semibold text-[#FC5858]">
                          Clear Chats
                        </p>
                      </div>
                      <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3">
                        <span className="icon-dislike-1 text-2xl text-[#FC5858]"></span>
                        <p className="text-base font-semibold text-[#FC5858]">
                          Clear Chats
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
          <div
            className="flex items-center space-x-2.5 w-full border-t border-chatlook-grayLight py-3 px-5"
            onClick={() => { setGroupPermissionPopup(true) }}
          >
            <span className="icon-permission flex text-xl text-chatlook-sky"></span>
            <div className="w-[calc(100%-40px)] flex items-center justify-between space-y-1.5">
              <h4 className="text-chatlook-dark font-bold">access permission</h4>
              <span className="block text-chatlook-dark text-base ml-auto">
                <i className="icon-next-slide-arrow text-chatlook-sky"></i>
              </span>
            </div>
          </div>
          <div className=" w-full border-t border-chatlook-grayLight py-3 px-5 ">
            <div className="flex flex-row justify-between  items-center ">
              <div>
                <p className="text-sm whitespace-nowrap">{groupData?.members?.length} peoples</p>
              </div>
              <div className="flex  justify-center" >
                {
                  searchBar ? (
                    <>
                      <div className="relative mr-2.5">
                        <img src={Search} width={14} className="h-full  absolute top-1/2 -translate-y-1/2 left-2" />
                        <input className="max-w-[180px] w-full border rounded h-full px-[24px] py-1.5" onChange={(e) => { setSearchMember(e.target.value) }} />
                        <X className=" absolute right-2 top-1/2 -translate-y-1/2 " onClick={() => { setSearchBar(false); setSearchMember("") }} size={15} />
                      </div>
                    </>
                  ) : <img src={Search} onClick={() => { setSearchBar(true); }} className="cursor-pointer mr-2.5" />
                }


                <img
                  src={AddMember}
                  onClick={setAddPeoplePopupOpen}
                  className="cursor-pointer"
                />
              </div>
            </div>
            {/* <div className="flex items-center justify-center">
            <div className="flex w-10 h-10 pb-0 overflow-hidden rounded-full bg-slate-200"></div>
            <div className="flex flex-col">
              <p>Name</p>
              <p>Contact Number</p>
            </div>
          </div> */}

            {searchMember === "" ? memberList?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="cursor-pointer p-2.5 notifications-box user-box rounded-lg group"
                    onClick={() => {
                      handleClick(index, item);
                      setSeletedMemberId(item?._id?._id);
                    }}
                  >
                    <div className="flex items-center space-x-3 relative">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                          {item?._id?.profileimage !== "" ? (
                            <>
                              <img
                                src={`https://festumfield.s3.ap-south-1.amazonaws.com/${item?._id?.profileimage}`}
                                className="object-cover w-full h-full"
                                alt="woman"
                              />
                            </>
                          ) : <div
                            className="icon-user h-full w-full text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"

                          />
                          }
                        </div>
                      </div>
                      <div className="w-[calc(100%-54px)] mt-1">
                        <div className="user-name">
                          <h4 className="whitespace-nowrap overflow-ellipsis overflow-hidden capitalize font-bold relative block">
                            {item?._id?.fullName}
                          </h4>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden text-gray-500">
                            + {item?._id?.contact_no}
                          </span>
                        </div>
                      </div>
                      {item?._id?._id?.includes(groupData?.createdBy) && (
                        <span className="p-1 bg-chatlook-sky text-white rounded-md">
                          Admin
                        </span>
                      )}

                      {selectedItem.index === index &&
                        selectedItem.showDropdown && (
                          <AddMemberDropDown
                            seletedMemberId={seletedMemberId}
                            groupId={groupId}
                            item={item}
                            groupData={groupData}
                            profileGets={profileGets}
                          />
                        )}
                    </div>
                  </div>
                </React.Fragment>
              );
            }) : filtermember?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="cursor-pointer p-2.5 notifications-box user-box rounded-lg group"
                    onClick={() => {
                      handleClick(index, item);
                      setSeletedMemberId(item?._id?._id);
                    }}
                  >
                    <div className="flex items-center space-x-3 relative">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                          {item?._id?.profileimage !== "" ? (
                            <>
                              <img
                                src={`https://festumfield.s3.ap-south-1.amazonaws.com/${item?._id?.profileimage}`}
                                className="object-cover w-full h-full"
                                alt="woman"
                              />
                            </>
                          ) : <div
                            className="icon-user h-full w-full text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"

                          />
                          }
                        </div>
                      </div>
                      <div className="w-[calc(100%-54px)] mt-1">
                        <div className="user-name">
                          <h4 className="whitespace-nowrap overflow-ellipsis overflow-hidden capitalize font-bold relative block">
                            {item?._id?.fullName}
                          </h4>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden text-gray-500">
                            + {item?._id?.contact_no}
                          </span>
                        </div>
                      </div>
                      {item?._id?._id?.includes(groupData?.createdBy) && (
                        <span className="p-1 bg-chatlook-sky text-white rounded-md">
                          Admin
                        </span>
                      )}

                      {selectedItem.index === index &&
                        selectedItem.showDropdown && (
                          <AddMemberDropDown
                            seletedMemberId={seletedMemberId}
                            groupId={groupId}
                            item={item}
                            groupData={groupData}
                            profileGets={profileGets}
                          />
                        )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}

          </div>

          {/* <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3">
            <span className="icon-delete text-2xl text-[#FC5858]"></span>
            <p className="text-base font-semibold text-[#FC5858]">Clear Chats</p>
          </div> */}
          {/* <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3">
            <span className="icon-block text-2xl text-[#FC5858]"></span>
            <p className="text-base font-semibold text-[#FC5858]">
              Block Hunter Bryan
            </p>
          </div> */}
          {/* <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3">
            <span className="icon-dislike-1 text-2xl text-[#FC5858]"></span>
            <p className="text-base font-semibold text-[#FC5858]">
              Report Hunter Bryan
            </p>
          </div> */}
          <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3 cursor-pointer " onClick={() => { setExitFromGroupPopUpOpen(true) }} >
            <span className="icon-log-in text-2xl text-[#FC5858]"></span>
            <p className="text-base font-semibold text-[#FC5858]">
              Exit From Friends
            </p>
          </div>
        </div>
      </div>
      <Modal isOpen={addPeoplePopupOpen}>
        <AddPeoplePopup data={groupData} handleClose={setAddPeoplePopupOpen} />
      </Modal>
      <Modal isOpen={groupPermissionPopup}>
        <AuthorizedGroupPermissionPopUp handleClose={setGroupPermissionPopup} />
      </Modal>
      <Modal isOpen={editGroup}>
        <EditGroupPopup groupData={groupData} handleClose={setEditGroup} />
      </Modal>
      <Modal isOpen={exitFromGroupPopUpOpen}>
        <ExiteFromGroup
          handleClose={setExitFromGroupPopUpOpen}
          // friendsProfile={friendsProfile}

          groupData={groupData}
        />
      </Modal>
    </>
  );
}

export default GroupRightSidebar;
