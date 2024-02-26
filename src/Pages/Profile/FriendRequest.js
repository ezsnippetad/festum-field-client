import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import HunterBryan from "../../assets/images/HunterBryan.png";
import Modal from "../../Common/Modals/Modal";
import FriendRequestAcceptPopUp from "../../component/Popups/DashboardPopup/FriendRequestAcceptPopUp";
import FriendRequestRejectPopUp from "../../component/Popups/DashboardPopup/FriendRequestRejectPopUp";
import { useDispatch } from "react-redux";
import {
  blockList,
  friendRequestRemove,
  friendRequestsSent,
  friendRequestsUpdate,
  friendsRequestsReceived,
  friendsRequestsSearch,
  setMyNewFriedList,
  useReceivedRequests,
  useSentRequests,
} from "../../redux/Slice/requestSlice";
import { toast } from "react-toastify";
import { Context } from "../../createContext";
import { Secondary } from "../../redux/services/toastServices";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DeletePop from "../../component/Popups/DashboardPopup/DeletePopUp";
import InfiniteScroll from "../../component/Sidebar/InfiniteScroll";
import { profileGet } from "../../redux/Slice/profileSlice";
import UnBlockFriend from "../../component/Popups/DashboardPopup/UnBlockFriend";

export default function FriendRequest() {
  const { permissions, allFriendsRequest } = useContext(Context);

  const navigate = useNavigate();
  const [isAccept, setIsAccept] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isFriendReq, setIsFriendReq] = useState("receive");
  const receivedRequests = useReceivedRequests();
  const [deletePopUpOpen, setDeleteModelOpen] = useState(false)
  const [unBlockPopUpOpen, setUnBlockModelOpen] = useState(false)
  const [blockData, setBlockData] = useState({})
  const [deleteData, setDeleteData] = useState({})
  const dispatch = useDispatch();
  const sentRequests = useSentRequests();
  const [status, setStatus] = useState("");
  const [reqId, setReqId] = useState();

  // FriendsRequestsReceived Data Object
  const [requestsReceivedList, setRequestsReceivedList] = useState([]);
  const [requestsReceivedPage, setRequestsReceivedPage] = useState(1);
  const [requestsReceivedLoading, setRequestsReceivedLoading] = useState(false);
  const [requestsReceivedHasMore, setRequestsReceivedHasMore] = useState(true);


  // FriendsRequestsSent Data Object
  const [requestsSentList, setRequestsSentList] = useState([]);
  const [blockFriendList, seBlockFriendList] = useState([]);



  const [requestsSentpage, setRequestsSentPage] = useState(1);
  const [requestsSentloading, setRequestsSentLoading] = useState(false);
  const [requestsSentHasMore, setRequestsSentHasMore] = useState(true);


  /////////////////////////////////
  const [sendReqPage, setSendReqPage] = useState(1);
  const outerSendRequest = useRef();
  const [lastSendReqPage, setLastSendReqPage] = useState("");
  const infiniteSendRequest = useCallback(
    async (currentPage) => {
      const payload = {
        page: currentPage,
        limit: 10,
        search: "",
      };
      const response = await dispatch(friendRequestsSent(payload)).unwrap();
      if ([...response?.data?.Data?.docs].length < 10) {
        setLastSendReqPage("lastPage");
      } else {
        setLastSendReqPage("");
      }
      setRequestsSentList((prevData) => [...prevData, ...response?.data?.Data?.docs]);
    },
    [deletePopUpOpen]
  );
  useEffect(() => {
    if (lastSendReqPage == "lastPage") {
      return;
    }
    infiniteSendRequest(sendReqPage);
    return () => {
      // dispatch(clearmYFriendList());
    };
  }, [infiniteSendRequest, sendReqPage, deletePopUpOpen]);

  const handleScrollSendRequests = useCallback(() => {
    const outerElement = outerSendRequest.current;
    if (outerElement) {
      const { scrollTop, clientHeight, scrollHeight } = outerElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setSendReqPage((prevgrpPage) => prevgrpPage + 1);
      }
    }
  }, [outerSendRequest]);

  const [receiveReqPage, setReceiveReqPage] = useState(1);
  const outerReceiveRequest = useRef();
  const [lastReceiveReqPage, setLastReceiveReqPage] = useState("");
  const infinitereceiveRequest = useCallback(
    async (currentPage) => {
      const payload = {
        page: currentPage,
        limit: 8,
        search: "",
      };
      const response = await dispatch(friendsRequestsReceived(payload)).unwrap();
      if ([...response?.data?.Data?.docs].length < 8) {
        setLastReceiveReqPage("lastPage");
      } else {
        setLastReceiveReqPage("");
      }
      setRequestsReceivedList((prevData) => [...prevData, ...response?.data?.Data?.docs]);
    },
    []
  );
  useEffect(() => {
    if (lastReceiveReqPage == "lastPage") {
      return;
    }
    infinitereceiveRequest(receiveReqPage);
    return () => {
      // dispatch(clearmYFriendList());
    };
  }, [infinitereceiveRequest, receiveReqPage]);

  const handleScrollReceiveRequests = useCallback(() => {
    const outerElement = outerReceiveRequest.current;
    if (outerElement) {
      const { scrollTop, clientHeight, scrollHeight } = outerElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setReceiveReqPage((prevgrpPage) => prevgrpPage + 1);
      }
    }
  }, [outerReceiveRequest]);


  const [blockFriendPage, setBlockFriendPage] = useState(1);
  const outerBlockFriends = useRef();
  const [lastBlockFriendPage, setLastBlockFriendPage] = useState("");
  const infiniteBlockFriend = useCallback(
    async (currentPage) => {
      const payload = {
        page: currentPage,
        limit: 8,
        search: "",
      };
      const response = await dispatch(blockList(payload)).unwrap();

      if ([...response?.data?.Data?.docs].length < 8) {
        setLastBlockFriendPage("lastPage");
      } else {
        setLastBlockFriendPage("");
      }
      seBlockFriendList((prevData) => [...prevData, ...response?.data?.Data?.docs]);
    },
    []
  );
  useEffect(() => {
    if (lastBlockFriendPage == "lastPage") {
      return;
    }
    infiniteBlockFriend(blockFriendPage);
    return () => {
      // dispatch(clearmYFriendList());
    };
  }, [infiniteBlockFriend, blockFriendPage]);

  const handleScrollBlockFriends = useCallback(() => {
    const outerElement = outerBlockFriends.current;
    if (outerElement) {
      const { scrollTop, clientHeight, scrollHeight } = outerElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setBlockFriendPage((prevgrpPage) => prevgrpPage + 1);
      }
    }
  }, [outerBlockFriends]);

  // const friendsRequestsSentData = async () => {
  //   try {
  //     setRequestsSentLoading(true);
  //     const payload = {
  //       page: requestsSentpage,
  //       limit: 10,
  //       search: ""
  //     };
  //     const response = await dispatch(friendRequestsSent(payload)).unwrap();
  //     const newFriendsRequestsSentData = await response?.data?.Data?.docs;

  //     // Check if there's more data
  //     if (newFriendsRequestsSentData.length === 0) {
  //       setRequestsSentHasMore(false);
  //     }
  //     // Update state with the new data  
  //     setRequestsSentList((prevData) => [...prevData, ...newFriendsRequestsSentData]);
  //     // Increment the page for the next request
  //     setRequestsSentPage((prevPage) => prevPage + 1);

  //   } catch (error) {
  //     Secondary("SOMETHING WENT WRONG.");
  //   } finally {
  //     setRequestsSentLoading(false);
  //   }
  // };

  // const friendsRequestsReceivedData = async (values) => {
  //   try {
  //     setRequestsReceivedLoading(true);
  //     const payload = {
  //       page: requestsReceivedPage,
  //       limit: 10,
  //       search: ""
  //     };
  //     const response = await dispatch(friendsRequestsReceived(payload)).unwrap();
  //     const newFriendsRequestsReceivedData = await response?.data?.Data?.docs;

  //     // Check if there's more data
  //     if (newFriendsRequestsReceivedData.length === 0) {
  //       setRequestsReceivedHasMore(false);
  //     }

  //     // Update state with the new data
  //     setRequestsReceivedList((prevData) => [...prevData, ...newFriendsRequestsReceivedData]);

  //     // Increment the page for the next request
  //     setRequestsReceivedPage((prevPage) => prevPage + 1);

  //   } catch (error) {
  //     Secondary("SOMETHING WENT WRONG.");
  //   } finally {
  //     setRequestsReceivedLoading(false);
  //   }
  // };

  // const FriendRequestsUpdateAbs = async (values) => {
  //   const payload = {
  //     friendrequestid: reqId,
  //     status: status,
  //     authorized_permissions: permissions,
  //   };
  //   try {
  //     const response = await dispatch(friendRequestsUpdate(payload)).unwrap();
  //     const updatePayload = {
  //       page: 1,
  //       limit: 8,
  //       search: "",
  //     };
  //     if (response.data.IsSuccess == true) {
  //       const updateResponse = await dispatch(friendsRequestsReceived(updatePayload)).unwrap();
  //       setRequestsReceivedList([...updateResponse?.data?.Data?.docs]);
  //       const friendListpayload = {
  //         page: 1,
  //         limit: 50,
  //         search: "",
  //       };
  //       const friendListresponse = await dispatch(friendsRequestsSearch(friendListpayload)).unwrap();
  //       dispatch(setMyNewFriedList([...friendListresponse?.data?.Data]));
  //       navigate("../dashboard/friendrequest")
  //       // const pendingReceiveRequests = requestsReceivedList?.filter((items) => {
  //       //   return items?._id !== reqId
  //       // })
  //       // setRequestsReceivedList(pendingReceiveRequests)

  //       // friendsRequestsReceivedData();
  //       // allFriendsRequest();
  //       // friendsRequestsSentData();
  //     }
  //   } catch (error) {
  //     Secondary("SOMETHING WENT WRONG.");
  //   }
  // };

  useEffect(() => {
    // friendsRequestsReceivedData();
    // friendsRequestsSentData();
  }, []);

  // useEffect(() => {
  //   if (status !== "") {
  //     FriendRequestsUpdateAbs();
  //   }
  // }, [status]);


  useEffect(() => {
    dispatch(profileGet())
  }, [])

  return (
    <>
      <main style={{ height: "100vh" }}>
        <header className="z-50">
          <div className="flex items-center px-5 whitespace-nowrap">
            <h3>
              <a className="icon-back text-chatlook-sky mr-4" onClick={() => navigate(-1)} />
              Requests
            </h3>
          </div>
          <div className="flex lg:justify-center items-center w-full">
            <div className="tab-menu flex items-center space-x-2 py-2 px-2 bg-chatlook-grayLight rounded-md">
              <button
                data-tab="tab-friend"
                className={
                  isFriendReq == "receive"
                    ? "hover:bg-white hover:text-chatlook-sky text-sm font-medium py-2.5 px-5 rounded-sm uppercase whitespace-nowrap current"
                    : "hover:bg-white hover:text-chatlook-sky text-sm font-medium py-2.5 px-5 rounded-sm uppercase whitespace-nowrap"
                }
                onClick={() => setIsFriendReq("receive")}
              >
                friend request
              </button>
              <button
                data-tab="tab-send"
                className={
                  isFriendReq == "send"
                    ? "hover:bg-white hover:text-chatlook-sky text-sm font-medium py-2.5 px-5 rounded-sm uppercase whitespace-nowrap current"
                    : "hover:bg-white hover:text-chatlook-sky text-sm font-medium py-2.5 px-5 rounded-sm uppercase whitespace-nowrap"
                }
                onClick={() => setIsFriendReq("send")}
              >
                send request
              </button>
              <button
                data-tab="tab-send"
                className={
                  isFriendReq == "block"
                    ? "hover:bg-white text-red-500  text-sm font-medium py-2.5 px-5 rounded-sm uppercase whitespace-nowrap active"
                    : "hover:bg-white text-red-500 text-sm font-medium py-2.5 px-5 rounded-sm uppercase whitespace-nowrap"
                }
                onClick={() => setIsFriendReq("block")}
              >
                Block List
              </button>
            </div>
          </div>
        </header>
        <div className="px-4 info-text current hidden" id="tab-friend">
          <div className="w-full my-auto h-full max-w-[800px] mx-auto">
            {isFriendReq == "receive" && (
              <>
                <div className="h-[790px] mt-10 w-full  overflow-y-auto" ref={outerReceiveRequest} onScroll={handleScrollReceiveRequests}>

                  {requestsReceivedList?.length > 0 ? (
                    requestsReceivedList?.map((val, index) => {
                      return (
                        <div className="w-full max-w-[800px] pr-10 mx-auto">
                          <div className="md:flex items-center justify-between py-5 border-b">
                            <div className="flex items-start pr-3">
                              <div>
                                <div className="w-12 h-12 overflow-hidden rounded-full bg-chatlook-grayLight">
                                  {!val.profileimage == "" ? (
                                    <img
                                      src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val.profileimage}`}
                                      alt="Profile Image"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex justify-center items-center icon-user text-2xl rounded-full text-chatlook-gray" />
                                  )}
                                </div>
                              </div>
                              <div className="pl-3">
                                <h5 className="text-base font-medium text-chatlook-dark pb-1">
                                  {val.fullName}
                                </h5>
                                <p className="text-sm text-chatlook-gray leading-[22px]">
                                  {val.aboutUs}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="pb-4">
                                <span>{moment(val.createdAt).format("LT")}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <button
                                  className="w-24 h-7 uppercase border border-chatlook-red text-chatlook-red text-xs rounded-[5px]"
                                  onClick={() => {
                                    setIsReject(true);
                                    setReqId(val.request_id);
                                  }}
                                >
                                  reject
                                </button>
                                <button
                                  className="w-24 h-7 uppercase bg-chatlook-sky text-white text-xs rounded-[5px]"
                                  onClick={() => {
                                    setIsAccept(true);
                                    setReqId(val.request_id);
                                  }}
                                >
                                  accept
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    )

                  ) : <h1 className="w-full  text-3xl px-5 text-center mt-6">Empty Receive Requests</h1>
                  }
                </div>
                {/* <InfiniteScroll fetchData={friendsRequestsReceivedData} loading={requestsReceivedLoading} hasMore={requestsReceivedHasMore} /> */}
              </>
            )}
            {isFriendReq == "send" && (
              <>
                <div className="h-[790px] mt-10 w-full  overflow-y-auto" ref={outerSendRequest} onScroll={handleScrollSendRequests}>
                  {requestsSentList?.length > 0 ? (
                    requestsSentList?.map((val, index) => {
                      return (
                        <div className="md:flex items-center justify-between pr-10 py-5 border-b" key={index}>
                          <div className="flex items-start pr-2">
                            <div>
                              <div className="w-12 h-12 overflow-hidden rounded-full bg-chatlook-grayLight">
                                {!val.profileimage ? (
                                  <div className="w-full h-full flex justify-center items-center icon-user text-2xl rounded-full text-chatlook-gray" />
                                ) : (
                                  <img
                                    src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val.profileimage}`}
                                    alt="Profile Image"
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="pl-3">
                              <h5 className="text-base font-medium text-chatlook-dark pb-1 capitalize">
                                {val.fullName}
                              </h5>
                              <p className="text-sm text-chatlook-gray leading-[22px] max-w-[500px]">
                                {val.aboutUs}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="pb-4">
                              <span>{moment(val.createdAt).format("LT")}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button
                                type="button"
                                className="uppercase text-red-500"
                                onClick={() => {
                                  setDeleteModelOpen(true);
                                  setDeleteData(val);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h1 className="w-full  text-3xl px-5 text-center mt-6">Empty Send Requests</h1>
                  )}
                </div>
                {/* <InfiniteScroll fetchData={friendsRequestsSentData} loading={requestsSentloading} hasMore={requestsSentHasMore} /> */}
              </>
            )}
            {isFriendReq == "block" && (
              <>
                <div className="h-[790px] mt-10 w-full  overflow-y-auto" ref={outerBlockFriends} onScroll={handleScrollBlockFriends}>
                  {blockFriendList?.length > 0 ? (
                    blockFriendList?.map((val, index) => {
                      return (
                        <div className="md:flex items-center justify-between pr-10 py-5 border-b" key={index}>
                          <div className="flex items-start pr-2">
                            <div>
                              <div className="w-12 h-12 overflow-hidden rounded-full bg-chatlook-grayLight">
                                {!val.profileimage ? (
                                  <div className="w-full h-full flex justify-center items-center icon-user text-2xl rounded-full text-chatlook-gray" />
                                ) : (
                                  <img
                                    src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val.profileimage}`}
                                    alt="Profile Image"
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="pl-3">
                              <h5 className="text-base font-medium text-chatlook-dark pb-1 capitalize">
                                {val.fullName}
                              </h5>
                              <p className="text-sm text-chatlook-gray leading-[22px] max-w-[500px]">
                                {val.aboutUs}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="pb-4">
                              <span>{moment(val.createdAt).format("LT")}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button
                                type="button"
                                className="uppercase text-red-500"
                                onClick={() => {
                                  setUnBlockModelOpen(true);
                                  setBlockData(val);
                                }}
                              >
                                UnBlock
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h1 className="w-full  text-3xl px-5 text-center mt-6">Empty Blocklist</h1>
                  )}
                </div>
                {/* <InfiniteScroll fetchData={friendsRequestsSentData} loading={requestsSentloading} hasMore={requestsSentHasMore} /> */}
              </>
            )}
          </div>
        </div>
      </main >
      {isAccept && (
        <Modal isOpen={isAccept}>
          <FriendRequestAcceptPopUp
            handleClose={setIsAccept}
            setStatus={setStatus}
            reqId={reqId}
            setRequestsReceivedList={setRequestsReceivedList}
            requestsReceivedList={requestsReceivedList}
          />
        </Modal>
      )
      }
      {
        isReject && (
          <Modal isOpen={isReject}>
            <FriendRequestRejectPopUp
              handleClose={setIsReject}
              setStatus={setStatus}
              reqId={reqId}
              setRequestsReceivedList={setRequestsReceivedList}
              requestsReceivedList={requestsReceivedList}
            />
          </Modal>
        )
      }
      <Modal isOpen={deletePopUpOpen}  >
        <DeletePop handleClose={setDeleteModelOpen} requestsSentList={requestsSentList} setRequestsSentList={setRequestsSentList} deleteData={deleteData} />
      </Modal>
      <Modal isOpen={unBlockPopUpOpen}  >
        <UnBlockFriend handleClose={setUnBlockModelOpen} blockFriendList={blockFriendList} seBlockFriendList={seBlockFriendList} blockData={blockData} />
      </Modal>
    </>
  );
}
