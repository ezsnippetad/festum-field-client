import React, { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../../createContext";
import socket from '../../socket';
import Product from "../../assets/images/product.png";
import NoImage from "../../assets/images/no-image.png";
import {
  businessProfileGet,
  profileGet,
  useBusinessProfileGets,
  useProfileGets,
} from "../../redux/Slice/profileSlice";
import {
  friendsListOfProduct,
  listOfProduct,
  productGetById,
  useFriendsProductslist,
  useProductGetByIds,
  useProducts,
  useProductslist,
} from "../../redux/Slice/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Geocode from "react-geocode";
import Modal from "../../Common/Modals/Modal";
import AuthorizedPermissionPopUp from "../Popups/DashboardPopup/AuthorizedPermissionPopUp";
import {
  getSingleFriend,
  useFriendRequestFromId,
  useFriendsList,
  useFriendsRequests,
  useMyFriendsList,
  useSingleFriend,
} from "../../redux/Slice/requestSlice";
import { setInquiryProduct, useCurrentChatUser } from "../../redux/Slice/chatSlice";
//import { useSocket } from "../../redux/Slice/socketSlice";
import { setVideoRingingPortalOpen, setVideoPortalOpen, setVoicePortalOpen } from "../../redux/Slice/videoCallSlice";
import { setCurrentCall, setGroupCallStarted, setCurrentCallProfile, useCurrentCall, useCurrentCallProfile, useGroupCallStarted, chatCallStart, chatCallEnd } from "../../redux/Slice/callSlice";
import { useVideo } from "../../context/VideoProvider";
import GroupRightSidebar from "./GroupRightSidebar";
import InfiniteScroll from "./InfiniteScroll";
import { useMemo } from "react";
import axios from "axios";
import BlockUserPopup from "../Popups/DashboardPopup/BlockUserPopup";
import { ArrowLeft, UserX } from "lucide-react";
import UnFriendUser from "../Popups/DashboardPopup/UnFriendUser";
import pdfImg from "../../assets/images/svg/pdfImage.svg"

Geocode.setApiKey("AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q");

const RightSidebar = () => {
  const { data, rightSidebarToggle, productListApi, personalProfileGetApi, businessProfileGetApi, allFriendsRequest } = useContext(Context);
  const { id } = useParams();
  const dispatch = useDispatch();
  //const { socket } = useSocket();
  const [productDetailId, setProductDetailId] = useState();
  const [busiAdd, setBusiAdd] = useState();
  const [tab, setTab] = useState("personalinfo");
  const [pdf, setPdf] = useState(false);
  const [facebook, setFacebook] = useState();
  const [insta, setInsta] = useState();
  const myFriendList = useMyFriendsList()
  // const [friendsProfile, setFriendsProfile] = useState({})
  const friendsProfile = useSingleFriend()

  // const friendsProfile = myFriendList?.find((items) => {
  //   return items?._id == id
  // })
  const frindsGetProfileFunction = async () => {
    const response = await dispatch(getSingleFriend({ friendid: id }))
    // setFriendsProfile(response?.payload?.data?.Data)
  }
  useEffect(() => {
    frindsGetProfileFunction()
  }, [id])



  const [twitter, setTwitter] = useState();
  const [linkdin, setLinkdin] = useState();
  const productslist = useProductslist();
  //const friendsProductList = useFriendsProductslist();

  const navigate = useNavigate();
  const products = useProducts();
  const productGetByIds = useProductGetByIds();
  const [friendProductsList, setFriendProductsList] = useState([]);


  const [friendProductpage, setFriendProductsPage] = useState(1);
  const [friendProductloading, setFriendProductsLoading] = useState(false);
  const [friendProductHasMore, setFriendProductsHasMore] = useState(true);
  const [mediaTab, setMediaTab] = useState("media")


  // const friendsProfile = useCurrentChatUser()
  const businessProfileGets = useBusinessProfileGets();
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [blockUser, setBlockUser] = useState(false)
  const [unfriendUser, setUnfriendUser] = useState(false)
  const profileGets = useProfileGets();
  const [address, setAddress] = useState('');

  const productDetailsById = friendProductsList?.find((items) => {
    return items._id === productDetailId
  })


  //const friendsRequests = useFriendsRequests();
  const friendRequestData = friendsProfile;
  let permissions = friendRequestData?.is_sender ? friendRequestData?.receiver_scope : friendRequestData?.sender_scope;
  const videoCallPermission = friendRequestData?.permissions?.videocall && friendRequestData?.permissions?.videocall;
  const voiceCallPermission = friendRequestData?.permissions?.audiocall && friendRequestData?.permissions?.audiocall;

  //const { setIsVideoCallZoomPopUpOpen, setIsVoiceCallPopUpOpen } = useVideo();

  const socialMap = () => {
    {

      if (friendsProfile?._id == id) {
        friendsProfile?.socialMediaLinks?.map(() => {

          if (friendsProfile.platform == "Facebook") {
            setFacebook(friendsProfile?.link);
          } else if (friendsProfile?.platform === "Instagram") {
            setInsta(friendsProfile?.link);
          } else if (friendsProfile?.platform === "Twitter") {
            setTwitter(friendsProfile?.link);
          } else if (friendsProfile?.platform === "Linkdin") {
            setLinkdin(friendsProfile?.link);
          }
        });
      }

    }
  };

  const friendsProductsListData = async () => {

    if (friendsProfile?.is_business_profile_created) {
      try {
        setFriendProductsLoading(true);
        const payload = {
          page: friendProductpage,
          limit: 50,
          search: "",
          sortfield: "title",
          sortoption: 1,
          friendid: friendsProfile?._id,
        };
        // Make a request to your REST API
        const response = await dispatch(friendsListOfProduct(payload)).unwrap();
        const newProductsData = await response?.data?.Data?.docs;

        // Check if there's more data
        if (newProductsData?.length === 0) {
          setFriendProductsHasMore(false);
        }

        // Update state with the new data
        setFriendProductsList((prevData) => [...prevData, ...newProductsData]);
        // Increment the page for the next request
        setFriendProductsPage((prevPage) => prevPage + 1);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setFriendProductsLoading(false);
      }
    }

  }

  const startCallAction = useCallback(async (isVideoCall) => {
    try {
      const payload = {
        from: profileGets?._id,
        to: friendsProfile?._id, // user or group id
        isVideoCall: isVideoCall,
        isGroupCall: false,
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
      memberIds: [friendsProfile?._id, profileGets?._id],
      fromId: profileGets?._id,
      name: profileGets?.fullName,
      isVideoCall: isVideoCall,
      isGroupCall: false,
      groupId: null,
      isCallingFromApp: false,
      isGroupCalling: false
    });
    startCallAction(isVideoCall);
  }

  useEffect(() => {
    socialMap();
    friendsProductsListData();

    return () => {
      // Use functional form of state updates to ensure the correct values
      setFriendProductsList((prevData) => {
        // Do any cleanup or additional logic with prevData if needed
        return [];
      });

      setFriendProductsPage(1);
    };
  }, [friendsProfile]);

  const ProductGetById = async () => {
    try {
      let payload = {
        pid: productDetailId,
      };
      const response = await dispatch(productGetById(payload)).unwrap();
    } catch (error) {
    }
  };
  useEffect(() => {
    if (productDetailId) {
      ProductGetById();
    }
  }, [productDetailId]);

  useEffect(() => {
    if (friendsProfile?.is_business_profile_created) {
      const fetchAddress = async () => {
        const latitude = friendsProfile?.businessprofile?.location?.coordinates[1]
        const longitude = friendsProfile?.businessprofile?.location?.coordinates[0]
        try {
          const apiKey = 'AIzaSyAy1EmmZYXtEjbDPvV7gIW0Qs2oD6WKi2o';
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

          const response = await fetch(url);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            let formattedAddress = '';
            let foundPincode = '';

            for (let i = 0; i < addressComponents.length; i++) {
              const component = addressComponents[i];
              if (component.types.includes('postal_code')) {
                foundPincode = component.long_name;
              }
              formattedAddress += `${component.long_name}, `;
            }

            setAddress(formattedAddress.slice(0, -2)); // Remove the last comma and space

          } else {
            setAddress('Address not found');

          }
        } catch (error) {
          console.error('Error fetching address:', error);

        }
      };
      fetchAddress();
    }
    return () => {
      setFriendProductsList([]);
      setFriendProductsPage(1);
    };
  }, [friendsProfile]);

  return (
    <>
      <div
        id="right-side"
        className={
          data === "media" ||
            data === "like" ||
            data === "product" ||
            data === "productdetail" ||
            data === "userprofile" ||
            data === "groupprofile"
            ? "commentbar_open right-bar h-screen w-[0px] scale-x-0 origin-right shadow-one z-20 anim"
            : "right-bar h-screen w-[0px] scale-x-0 origin-right shadow-one z-20 anim "
        }
      >
        {data === "like" && (
          <div className="comments_like_detils ">
            <div className="p-4 h-20 flex items-center space-x-3 border-b border-[#e5e9f2] border-solid ">
              <i
                className="icon-close text-lg cursor-pointer"
                onClick={() => rightSidebarToggle("")}
              ></i>
              <h3>Like & Comment</h3>
            </div>
            {/* <div className="h-[calc(100vh-80px)] mt-auto overflow-x-hidden overflow-y-auto py-5">
              <div className="space-x-3 p-5 flex items-center w-full border-b border-chatlook-grayLight pt-0">
                <div className="pro-box w-[50px] h-[50px] rounded-full overflow-hidden">
                  <img
                    src={Product}
                    alt="pro-1"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="pro-text w-[calc(100%-132px)]">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="capitalize">Hunter Bryan</h4>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-chatlook-grayLight"></span>
                        <h4 className="">5 Min</h4>
                      </div>
                    </div>
                    <span className="block whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">
                      Like this reel
                    </span>
                  </div>
                </div>
                <div className="pro-box w-[40px] h-[50px] rounded-md overflow-hidden">
                  <img
                    src={Product}
                    alt="pro-1"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div> */}
          </div>
        )}
        {data === "product" && (
          <div className="product">
            <div className="p-4 h-20 flex items-center space-x-3 border-b border-[#e5e9f2] border-solid">
              <i
                className="icon-close text-lg"
                onClick={() => rightSidebarToggle("")}
              ></i>
              <h3>Products</h3>
            </div>
            <div className="h-[calc(100vh-80px)] mt-auto overflow-x-hidden overflow-y-auto">

              <div className="p-5 h-full">
                <div className="relative rounded-lg overflow-hidden min-h-[180px] h-[180px]">
                  {friendsProfile?.businessprofile?.businessimage !== "" ?
                    <img
                      src={`https://festumfield.s3.ap-south-1.amazonaws.com/${friendsProfile?.businessprofile?.businessimage}`}
                      alt="product"
                      className="-z-10 absolute inset-0 w-full h-full object-cover "
                    /> : <img src={NoImage} alt="no-image" className="w-full h-full object-cover" />}
                  <div className="w-full h-full py-12 px-2 bg-[rgba(36,36,39,0.6)]x text-center ">
                    <h5 className="text-xl font-bold text-white tracking-wider mb-1">
                      {friendsProfile?.businessprofile?.name}
                    </h5>
                    <p className="text-white text-sm leading-5">
                      {friendsProfile?.businessprofile?.description}
                    </p>
                  </div>
                </div>
                {friendProductsList?.length > 0 && (
                  <>
                    <div className="" id="friendProducts-list">
                      {friendProductsList.map((items, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div
                              className="space-x-3 p-5 flex items-center w-full border-b border-chatlook-grayLight pt-0"
                              onClick={() => {
                                rightSidebarToggle("productdetail");
                                setProductDetailId(items?._id);
                              }}
                            >
                              <div className="pro-box w-[60px] h-[60px] rounded-md overflow-hidden">
                                <img
                                  src={`https://festumfield.s3.ap-south-1.amazonaws.com/${items?.images[0]}`}
                                  alt="pro-1"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="pro-text w-[calc(100%-72px)]">
                                <h4 className="capitalize">{items?.name}</h4>
                                <div className="flex py-0.5">
                                  <span className="whitespace-nowrap overflow-ellipsis overflow-hidden text-sm">
                                    {items?.description}
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  <span className="text-[12px] text-white bg-[#FC5858] p-1 rounded">
                                    {items?.offer}
                                  </span>
                                  <span className="text-chatlook-sky text-sm">
                                    ${items?.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <InfiniteScroll fetchData={friendsProductsListData} loading={friendProductloading} hasMore={friendProductHasMore} />
                  </>
                )}

              </div>

            </div>
          </div>
        )}
        {data === "productdetail" && (
          <div className="product-detils">
            <div className="p-4 h-20 flex items-center space-x-3 border-b border-[#e5e9f2] border-solid">
              <i
                className="icon-close text-lg"
                onClick={() => rightSidebarToggle("")}
              ></i>
              <h3>Products Details</h3>
            </div>
            <div className="h-[calc(100vh-80px)] mt-auto overflow-x-hidden overflow-y-auto">
              <div className="p-5 space-y-5 h-full flex flex-col">
                <div className="relative rounded-lg overflow-hidden py-24">
                  <img
                    src={`https://festumfield.s3.ap-south-1.amazonaws.com/${productDetailsById?.images?.at(0)}`}
                    alt="product"
                    className="-z-10 absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="w-full space-y-5">
                  <div className="w-full">
                    <h5 className="capitalize text-xl">{productDetailsById.name}</h5>
                    <div className="flex justify-between">
                      <h4>
                        Price:{" "}
                        <span className="text-sm text-chatlook-sky">
                          ${productDetailsById?.price}
                        </span>
                      </h4>
                      <button className="text-sm bg-[#FC5858] px-3 py-1 text-white rounded">
                        {productDetailsById?.offer}
                      </button>
                    </div>
                  </div>
                  <h4 className="font-light leading-6 text-chatlook-gray">
                    {productDetailsById?.description}
                  </h4>
                  <h4>
                    Item Code:{" "}
                    <span className="text-sm text-chatlook-gray">
                      {productDetailsById?.itemCode}
                    </span>
                  </h4>
                </div>
                <button
                  onClick={() => { dispatch(setInquiryProduct(productDetailsById)); }}
                  className="inquiry-btn"
                  style={{ marginTop: "auto" }}
                >
                  inquiry message
                </button>
              </div>
            </div>
          </div>
        )}
        {data === "userprofile" && (
          <div className="bisnuss-user-profile">
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
                  {tab == "personalinfo" ? (
                    friendsProfile?.profileimage !== "" ? (
                      <>
                        <img
                          className="w-full h-full rounded-full overflow-hidden"
                          src={`https://festumfield.s3.ap-south-1.amazonaws.com/${friendsProfile?.profileimage}`}
                          alt="user"
                        />
                      </>
                    ) : (
                      <>
                        <div className="icon-user h-full w-full text-white rounded-full text-5xl justify-center items-center flex icon-user overflow-hidden object-cover"></div>
                      </>
                    )
                  ) : tab == "businessinfo" ? (
                    friendsProfile?.businessprofile?.businessimage ? (< img
                      className="w-full h-full rounded-full overflow-hidden"
                      src={`https://festumfield.s3.ap-south-1.amazonaws.com/${friendsProfile?.businessprofile?.businessimage}`}
                      alt="business"
                    />) : <div className="icon-user h-full w-full text-white rounded-full text-5xl justify-center items-center flex icon-user overflow-hidden object-cover"></div>

                  ) : (
                    <div className="w-full h-full flex justify-center items-center icon-user text-6xl rounded-full text-white" />
                  )}
                </div>
                <div className="user-name text-center">
                  <h3 className="text-white">{friendsProfile?.fullName}</h3>
                  <h4 className="font-normal text-white">{friendsProfile?.nickName}</h4>
                </div>
                <div className="flex space-x-3 justify-center">
                  <div
                    onClick={() => {
                      if (videoCallPermission) {
                        callUser({ isVideoCall: true });
                        dispatch(setGroupCallStarted(false));
                        dispatch(setCurrentCallProfile(friendsProfile));
                        dispatch(setVideoRingingPortalOpen(true));
                        rightSidebarToggle("");
                      }
                    }}
                    className="video-btn-sky space-y-1 text-center"
                  >
                    <span
                      className={`text-xl w-10 h-10 flex items-center justify-center bg-white rounded-lg text-${videoCallPermission
                        ? "chatlook-sky cursor-pointer"
                        : "gray-200 cursor-not-allowed"
                        }`}
                    >
                      <i
                        className="icon-video-on"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <p className="text-[12px] text-white font-normal">
                      Video
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      if (voiceCallPermission) {
                        callUser({ isVideoCall: false });
                        dispatch(setGroupCallStarted(false));
                        dispatch(setCurrentCallProfile(friendsProfile));
                        dispatch(setVoicePortalOpen(true));
                      }
                    }}
                    className="call-btn-sky space-y-1 text-center"
                  >
                    <span
                      className={`text-xl w-10 h-10 flex items-center justify-center shadow  bg-white rounded-lg text-${voiceCallPermission
                        ? "chatlook-sky cursor-pointer"
                        : "gray-200 cursor-not-allowed"
                        }`}
                    >
                      <i
                        className="icon-phone-calling"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <p className="text-[12px] text-white font-normal">
                      Audio
                    </p>
                  </div>

                  {friendsProfile?.is_business_profile_created &&
                    (
                      <div className="call-btn-sky space-y-1 text-center ">
                        <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-white rounded-lg text-chatlook-sky " onClick={() => rightSidebarToggle("product")}>
                          <i className="icon-store" aria-hidden="true"></i>
                        </span>
                        <p className="text-[12px] text-white font-normal -ml-1">
                          Products
                        </p>
                      </div>

                    )}

                </div>
                {tab == "personalinfo" && permissions?.socialmedia && (
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
                            <stop
                              offset="0.1381"
                              stopColor="#FEC125"
                            ></stop>{" "}
                            <stop
                              offset="0.2481"
                              stopColor="#FE983D"
                            ></stop>{" "}
                            <stop
                              offset="0.3762"
                              stopColor="#FE5F5E"
                            ></stop>{" "}
                            <stop
                              offset="0.5"
                              stopColor="#FE2181"
                            ></stop>{" "}
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
                )}
              </div>
              <div className="p-5 space-y-5 w-full">
                <div className="teb-btn flex items-center justify-between w-full">
                  <h5
                    data-tab="tab-1"
                    className={
                      tab === "personalinfo"
                        ? "current text-base font-bold w-1/2 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                        : "text-base font-bold w-1/2 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                    }
                    onClick={() => setTab("personalinfo")}
                  >
                    Personal Info
                  </h5>
                  <h5
                    data-tab="tab-2"
                    className={
                      tab === "businessinfo"
                        ? "current text-base font-bold w-1/2 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                        : "text-base font-bold w-1/2 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                    }
                    onClick={() => { setTab("businessinfo") }}
                  >
                    Business Info
                  </h5>
                  {/* <h5
                          data-tab="#"
                          className={
                            tab === "reels"
                              ? "current text-base font-bold w-1/3 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                              : "text-base font-bold w-1/3 pb-3.5 border-b-2 border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                          }
                          onClick={() => setTab("reels")}
                        >
                          My Reels
                        </h5> */}
                </div>
                {tab === "personalinfo" && (
                  <div
                    id="tab-1"
                    className="info-text current prasonal-info space-y-5"
                  >
                    <div className="space-y-2.5 w-full ">
                      <div className="w-full flex items-center justify-between">
                        <h4 className="text-chatlook-dark font-bold">
                          Shared Media
                        </h4>
                        <p className="text-chatlook-sky text-xs font-bold cursor-pointer" onClick={() => { rightSidebarToggle("media") }}>See All</p>
                      </div>
                      <div className="flex overflow-x-auto space-x-3 pb-2.5">
                        <div><div className="h-20 w-20 border" /></div>
                        <div><div className="h-20 w-20 border" /></div>
                        <div><div className="h-20 w-20 border" /></div>
                        <div><div className="h-20 w-20 border" /></div>
                        <div><div className="h-20 w-20 border" /></div>
                        <div><div className="h-20 w-20 border" /></div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-user text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-35px)] text-sm space-y-1">
                        <h4 className="text-chatlook-dark font-bold">
                          About us
                        </h4>
                        <span className="leading-4 text-sm block">
                          {friendsProfile?.aboutUs ? friendsProfile?.aboutUs : "No pemission"}
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
                          {friendsProfile?.dob ? friendsProfile?.dob : "No pemission"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-gender text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Gender
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {friendsProfile?.gender ? friendsProfile?.gender : "No permission"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-hobbies text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Hobbies{" "}
                        </h4>
                        <div className="flex flex-wrap space-x-1">
                          {friendsProfile?.hobbies?.map((val) => {
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
                        <h4 className="text-chatlook-dark font-bold">
                          Email
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {friendsProfile?.emailId ? friendsProfile?.emailId : "No permission"}
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
                          {friendsProfile?.contact_no ? `+${friendsProfile?.contact_no}` : "No Permission"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {tab === "businessinfo" && friendsProfile?.is_business_profile_created ? (
                  <div
                    id="tab-2"
                    className="info-text business-info space-y-5"
                  >
                    {/* <div className="flex items-start space-x-2.5 w-[70px] h-[70px] border-chatlook-sky border-[3px] bg-[#C28A64] rounded-full p-1">
                            <img
                              className="h-full w-full object-cover overflow-hidden rounded-full"
                              src={`https://festumfield.s3.ap-south-1.amazonaws.com/${friendsProfile?.businessprofile?.businessimage}`}
                              alt="business-info.png"
                            />
                          </div> */}
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-business text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Business Name
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {friendsProfile?.businessprofile?.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-category text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Category
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {friendsProfile?.businessprofile?.category}
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
                          {friendsProfile?.businessprofile?.subCategory}
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
                          {friendsProfile?.businessprofile?.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                      <span className="icon-location text-chatlook-sky flex text-xl"></span>
                      <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                        <h4 className="text-chatlook-dark font-bold">
                          Location
                        </h4>
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {address}
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
                ) : tab === "businessinfo" ? <div className=" w-full text-center font-bold text-gray-500 py-12 text-xl"> {friendsProfile?.fullName} have No Business Profile</div> : null}
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
                              <i
                                className="icon-video"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                          <div className="call-btn-sky space-y-1 text-center">
                            <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-white rounded-lg text-chatlook-sky">
                              <i
                                className="icon-call "
                                aria-hidden="true"
                              ></i>
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
                              It is a long established fact that a reader
                              will be distracted by the readable content
                              of a page when looking at its layout.
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
              </div>
              <div
                className="flex items-center space-x-2.5 w-full border-t border-chatlook-grayLight py-3 px-5 cursor-pointer"
                onClick={() => setIsAuthPopupOpen(true)}
              >
                <span className="icon-permission flex text-xl text-chatlook-sky"></span>
                <div className="w-[calc(100%-40px)] flex items-center justify-between space-y-1.5">
                  <h4 className="text-chatlook-dark font-bold">
                    access permission
                  </h4>
                  <span className="block text-chatlook-dark text-base ml-auto">
                    <i className="icon-next-slide-arrow text-chatlook-sky"></i>
                  </span>
                </div>
              </div>
              {/* <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3">
                <span className="icon-delete text-2xl text-[#FC5858]"></span>
                <p className="text-base font-semibold text-[#FC5858]">
                  Clear Chats
                </p>
              </div> */}
              <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3  cursor-pointer" onClick={() => { setUnfriendUser(true) }}>
                {/* <span className="icon-block text-2xl text-[#FC5858]"></span> */}
                <UserX color="#FC5858" />
                <p className="text-base font-semibold text-black ">
                  Unfriend {friendsProfile?.fullName ? friendsProfile?.fullName : friendsProfile?.nickName}
                </p>
              </div>
              <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3  cursor-pointer" onClick={() => { setBlockUser(true) }}>
                <span className="icon-block text-2xl text-[#FC5858]"></span>
                <p className="text-base font-semibold text-[#FC5858] ">

                  Block {friendsProfile?.fullName}
                </p>
              </div>
              {/* <div className="p-5 border-t border-chatlook-grayLight flex items-center space-x-3 cursor-pointer">
                <span className="icon-dislike-1 text-2xl text-[#FC5858]"></span>
                <p className="text-base font-semibold text-[#FC5858]">
                  Report {friendsProfile?.fullName}
                </p>
              </div> */}
            </div>
          </div>
        )}
        {data === "media" && (
          <div className="comments_like_detils w-[350px]">
            <div className="shadow-lg">
              <div className="px-5 py-4 w-full ">
                <div className="flex space-x-4 ">
                  <div><ArrowLeft className="text-chatlook-sky" onClick={()=>{rightSidebarToggle("userprofile")}} /></div>
                  <h1 className="font-bold">John Hosier</h1>
                </div>
              </div>
              <div className="w-full flex justify-center  text-sm">
                <h2 className={`text-base font-medium px-4 py-1 cursor-pointer hover:text-chatlook-sky  ${mediaTab === "media" ? "activetab" : ""}`} onClick={() => setMediaTab("media")} >Media</h2>
                <h2 className={`text-base font-medium px-4 py-1 cursor-pointer hover:text-chatlook-sky  ${mediaTab === "audio" ? "activetab" : ""}`} onClick={() => setMediaTab("audio")} >Audio</h2>
                <h2 className={`text-base font-medium px-4 py-1 cursor-pointer hover:text-chatlook-sky  ${mediaTab === "docs" ? "activetab" : ""}`} onClick={() => setMediaTab("docs")} >Docs</h2>
                <h2 className={`text-base font-medium px-4 py-1 cursor-pointer hover:text-chatlook-sky  ${mediaTab === "links" ? "activetab" : ""}`} onClick={() => setMediaTab("links")} >Links</h2>
              </div>
            </div>
            <div className="p-5">
              {mediaTab === "media" && (
                <>
                  <div className="w-full">
                    <h1 className="text-base font-medium">Recent</h1>
                    <div className="w-full flex   flex-wrap -mx-1.5 ">
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16 "></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16 "></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16 "></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16"></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <h1 className="text-base font-medium">Last Week</h1>
                    <div className="w-full flex   flex-wrap -mx-1.5 ">
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16 "></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16 "></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16 "></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16"></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <h1 className="text-base font-medium">Last Month</h1>
                    <div className="w-full flex   flex-wrap -mx-1.5 ">
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16 "></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16 "></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16 "></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16"></div>
                      </div>
                      <div className="p-1.5 w-1/4 " >
                        <div className="bg-chatlook-skyLight  rounded h-16"></div>
                      </div>
                    </div>
                  </div>

                </>
              )}
              {
                mediaTab === "audio" && (
                  <>
                    <div className="w-full ">
                      <h1 className="text-base font-medium my-2.5">Recent</h1>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                      </div>
                    </div>

                    <hr class="h-px my-2.5 bg-gray-200 border-0 dark:bg-[#F1F1F1]"></hr>
                    <div className="w-full ">
                      <h1 className="text-base font-medium my-2.5">Recent</h1>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr class="h-px my-2.5 bg-gray-200 border-0 dark:bg-[#F1F1F1]"></hr>
                    <div className="w-full ">
                      <h1 className="text-base font-medium my-2.5">Recent</h1>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>

                        <hr class="h-px my-2.5 bg-gray-200 border-0 dark:bg-[#F1F1F1]"></hr>
                      </div>
                    </div>
                  </>
                )
              }
              {
                mediaTab === "docs" && (
                  <>
                    <div className="w-full ">
                      <h1 className="text-base font-medium my-2.5">Recent</h1>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                      </div>
                    </div>

                    <hr class="h-px my-2.5 bg-gray-200 border-0 dark:bg-[#F1F1F1]"></hr>
                    <div className="w-full ">
                      <h1 className="text-base font-medium my-2.5">Recent</h1>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr class="h-px my-2.5 bg-gray-200 border-0 dark:bg-[#F1F1F1]"></hr>
                    <div className="w-full ">
                      <h1 className="text-base font-medium my-2.5">Recent</h1>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            <img className="h-10 w-8" src={pdfImg} />
                            <div className="flex flex-col justify-between">
                              <h2 className="text-base font-bold ">004.mp3</h2>
                              <p className="flex space-x-2.5 text-sm text-chatlook-gray">
                                <span className="text-sm ">1 Page</span>
                                <span className="text-sm ">311 kb</span>
                                <span className="text-sm ">PDF</span>
                              </p>
                            </div>
                          </div>
                          <p className="text-chatlook-gray text-sm pt-5 " >
                            13/01/24
                          </p>
                        </div>

                        <hr class="h-px my-2.5 bg-gray-200 border-0 dark:bg-[#F1F1F1]"></hr>
                      </div>
                    </div>
                  </>
                )
              }
              {
                mediaTab === "links" && (

                  <>
                    <div className="w-full">
                      <h1 className="text-base font-medium my-2.5">Recent</h1>
                      <div className="py-2.5 px-3 overflow-hidden  border rounded">
                        <div className="flex space-x-3 ">
                          <div className=" ">
                            <div className="border border-black h-14 w-14"></div>
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold">http://jhhjgvujjbnjcvhhjfvhjhcxbvdygfv</p>
                            <p className="text-sm">www.figma.com</p>
                          </div>
                        </div>
                        <p className="text-[14px] text-chatlook-sky font-semibold mt-2">http://jhhjgvujjbnjcvhhjfvhjhcxbvdygfvudygfbjvhbdjfbvdc</p>
                      </div>
                    </div>

                  </>
                )
              }
            </div>

          </div>
        )}

        {data === "groupprofile" && <GroupRightSidebar />}
      </div >
      <Modal isOpen={isAuthPopupOpen}>
        <AuthorizedPermissionPopUp
          handleClose={setIsAuthPopupOpen}
          isAuthPopupOpen={isAuthPopupOpen}
        />
      </Modal>
      <Modal isOpen={blockUser}>
        <BlockUserPopup
          handleClose={setBlockUser}
          friendsProfile={friendsProfile}
        // isAuthPopupOpen={isAuthPopupOpen}
        />
      </Modal>
      <Modal isOpen={unfriendUser}>
        <UnFriendUser
          handleClose={setUnfriendUser}
          friendsProfile={friendsProfile}
        />
      </Modal>
    </>
  );
};

export default RightSidebar;
