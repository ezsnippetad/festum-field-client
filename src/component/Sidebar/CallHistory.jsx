import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { callsOfList } from "../../redux/Slice/callSlice";
import { useProfileGets } from "../../redux/Slice/profileSlice";
import moment from "moment";
import NoImage from "../../assets/images/no-image.png";
import { useTime } from "react-timer-hook";

const CallHistory = () => {
  const [calldata, setCallData] = useState([]);
  const profileGets = useProfileGets();
  const profileId = profileGets?._id;

  ///////////////////////////
  const dispatch = useDispatch();

  // const [myGroupList, setMyGroupsList] = useState([]);
  const [pageCallHis, setPageCallHis] = useState(1);
  const [myGroupSearchList, setMyGroupsSearchList] = useState([]);
  const outerCallHistoryRefTwo = useRef();
  const [myGroupList, setMyGroupFriendList] = useState([]);
  const [myFriendsSearchList, setMyFriendsSearchList] = useState([]);
  const [lastPage, setLastPage] = useState("");

  // const fetchCallHistoryData = async () => {
  //   try {
  //     // setCallLoading(true);
  //     const payload = {
  //       page: 1,
  //       limit: 12,
  //     };

  //     const response = await dispatch(callsOfList(payload)).unwrap();
  //     const newCallData = await response?.data?.Data?.docs;

  //     if (!response?.data?.Data?.hasNextPage) {
  //     }

  //     setCallData((prevData) => [...prevData, ...newCallData]);

  //     // setCallPage((prevPage) => prevPage + 1);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     // setCallLoading(false);
  //   }
  // };
  const infiniteDataForCallHistory = useCallback(async (currentPage) => {
    const payload = {
      page: currentPage,
      limit: 12,
      search: "",
    };

    const response = await dispatch(callsOfList(payload)).unwrap();

    if ([...response?.data?.Data?.docs].length < 12) {
      setLastPage("lastPage");
    } else {
      setLastPage("");
    }
    // setMyGroupsList((prevList) => [...prevList, ...response?.data?.Data]);
    // setMyGroupFriendList((pre) => [...pre, ...response?.data?.Data]);
    // dispatch(setMySearchGroupsList([]));
    setCallData((prevData) => [...prevData, ...response?.data?.Data?.docs]);
  }, []);
  // useEffect(() => {
  //   dispatch(setMyNewGroupList(myGroupList));
  // }, [myGroupList]);
  useEffect(() => {
    if (lastPage == "lastPage") {
      return;
    }
    infiniteDataForCallHistory(pageCallHis);
    return () => {
      // dispatch(clearmYFriendList());
    };
  }, [infiniteDataForCallHistory, pageCallHis]);

  const handleScrollCallHistory = useCallback(() => {
    const outerElement = outerCallHistoryRefTwo.current;
    if (outerElement) {
      const { scrollTop, clientHeight, scrollHeight } = outerElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPageCallHis((prevgrpPage) => prevgrpPage + 1);
      }
    }
  }, [outerCallHistoryRefTwo]);

  const formatDateTime = (timestamp) => {
    const now = moment();
    const date = moment(timestamp);

    if (now.isSame(date, "day")) {
      // Today
      return `Today ${date.format("hh:mm A")}`;
    } else if (now.subtract(1, "day").isSame(date, "day")) {
      // Yesterday
      return `Yesterday ${date.format("hh:mm A")}`;
    } else {
      // Other days
      return date.format("DD MMMM YYYY, hh:mm A");
    }
  };

  // useEffect(() => {
  //   fetchCallHistoryData();
  // }, []);
  return (
    <div
      key="call-history"
      className="tab-holder h-[calc(100vh-226px)] px-3.5 overflow-y-auto px-5 pt-2"
      ref={outerCallHistoryRefTwo}
      onScroll={handleScrollCallHistory}
    >
      <div className="" id="call">
        {calldata.map((item, index) => {
          return (
              <React.Fragment key={index}>
              {item?.from?._id === profileId ? (
                <div  className={"flex justify-between items-center " + (index === 0 ? '' : 'pt-5')}>
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full overflow-hidden  mr-4">
                      {item?.to !== null && item?.to?.profileimage !== "" ? (
                        <img
                          src={`https://festumfield.s3.ap-south-1.amazonaws.com/${item?.to?.profileimage}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={NoImage}
                          alt="no-image"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="">
                      <h4>
                        {item?.to?.members !== undefined
                          ? item?.to?.name
                          : item?.to?.fullName}
                      </h4>
                      <div className="pt-1">
                        <i className="icon-outgoing-call text-green-400 text-sm mr-2"></i>
                        <span>{formatDateTime(item?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  {item?.isAudioCall ? (
                    <button className="icon-phone-calling text-chatlook-sky text-2xl"></button>
                  ) : (
                    <button className="icon-video-on text-chatlook-sky text-2xl"></button>
                  )}
                </div>
              ) : (
                  <div  className={"flex justify-between items-center " + (index === 0 ? '' : 'pt-5')}>

                  <div className="flex">
                    <div className="w-10 h-10 rounded-full overflow-hidden  mr-4">
                      {item?.from !== null &&
                      item?.from?.profileimage !== "" ? (
                        <img
                          src={`https://festumfield.s3.ap-south-1.amazonaws.com/${item?.from?.profileimage}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={NoImage}
                          alt="no-image"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="">
                      <h4>
                        {item?.from?.members !== undefined
                          ? item?.from?.name
                          : item?.from?.fullName}
                      </h4>
                      <div className="pt-1">
                        <i className="icon-incoming-call text-red-400 text-sm mr-2"></i>
                        <span>{formatDateTime(item?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  {item?.isVideoCall ? (
                    <button className="icon-video-on text-chatlook-sky text-2xl"></button>
                  ) : (
                    <button className="icon-phone-calling text-chatlook-sky text-2xl"></button>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CallHistory;
