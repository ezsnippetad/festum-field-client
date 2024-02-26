import React, { useCallback, useEffect, useRef, useState } from "react";
import Profile from "../../../assets/images/profile.png";
import CreateNewGroupPopUp from "./CreateNewGroupPopUp";
import Modal from "../../../Common/Modals/Modal";
import {
  friendsRequestsSearch,
  useFriendsRequests,
} from "../../../redux/Slice/requestSlice";
import { Secondary } from "../../../redux/services/toastServices";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5"
import SidebarChatListItem from "../../Chat/SidebarChatListItem";
import { PulseLoader } from "react-spinners";

export default function NewGroupPopUp({ handleClose }) {
  const dispatch = useDispatch();
  const [isCreateNewGroupPopUpOpen, setIsCreateNewGroupPopUpOpen] =
    useState(false);
  const friendsRequests = useFriendsRequests();
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [searchrequest, setSearchRequest] = useState("");

  const [loading, setLoading] = useState(false)
  const [filterFriend, setFilterFriend] = useState([]);

  const [page, setPage] = useState(1);
  const [myFriendsList, setMyFriendsList] = useState([]);
  const [myFriendsSearchList, setMyFriendsSearchList] = useState([]);

  // const myFriendsList = myFriendsList?.filter((items, index) => {
  //   return !items?.members
  // })

  function onSelectHandler(e, user) {
    if (e.target.checked) {
      setSelectedFriends(function (prevState) {
        return [...prevState, user];
      });
    } else {
      setSelectedFriends(function (prevState) {
        return prevState.filter((item) => item._id !== user._id);
      });
    }
  }

  function removeSelectedFriend(user) {
    setSelectedFriends(function (prevState) {
      return prevState.filter((item) => item._id !== user._id);
    });
  }

  function onNextClick() {
    if (selectedFriends.length < 2) {
      Secondary("Please select at least 2 users.");
    } else {
      setIsCreateNewGroupPopUpOpen(true);
    }
  }

  // const searchFriendFunction = async () => {
  //   const payload = {
  //     page: 1,
  //     limit: 10,
  //     search: searchrequest,
  //   };
  //   setLoading(true)
  //   const response = await dispatch(friendsRequestsSearch(payload));
  //   setLoading(false)
  //   setFilterFriend(response?.payload?.data?.Data);
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     searchFriendFunction();
  //   }, 1000);
  // }, [searchrequest]);

  const selectedFriendsElement = selectedFriends?.map((data) => (
    <div className="w-10 h-10 relative m-1">
      <div className="w-full h-full rounded-full overflow-hidden">
        {data?.profileimage == "" ? <div className="icon-user h-full w-full bg-gray-200 text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"></div> : <img
          src={`https://festumfield.s3.ap-south-1.amazonaws.com/${data?.profileimage}`}
          alt="G-user"
          className="h-full w-full"
        />}
      </div>
      <span
        onClick={() => removeSelectedFriend(data)}
        className="w-4 h-4 rounded-full flex items-center justify-center bg-chatlook-sky border border-white absolute bottom-0 right-0 z-30 cursor-pointer"
      >
        <i className="icon-close text-[6px] text-white"></i>
      </span>
    </div>
  ));



  const filterFriendSearch = myFriendsSearchList?.map((user) => {
    return (
      <>  <div className="flex items-center relative userSelact">
        <input
          type="checkbox"
          name="userSelect2"
          id="userSelect2"
          checked={
            selectedFriends.findIndex((item) => item._id === user._id) >= 0
          }
          onChange={(e) => onSelectHandler(e, user)}
          className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {user?.profileimage == "" ? <div className="icon-user h-full w-full bg-gray-200 text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"></div> : <img
              src={`https://festumfield.s3.ap-south-1.amazonaws.com/${user?.profileimage}`}
              alt="G-user"
              className="h-full w-full"
            />}
          </div>
          <span className="text-base font-bold text-chatlook-dark">
            {user.fullName ?? user.nickName}
          </span>
        </div>
        <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
          <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
        </div>
      </div>
      </>
    )
  });
  // const handleScroll = () => {
  //   const isAtBottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
  //   if (isAtBottom && !loading) {
  //     // Fetch more data when scrolled to the bottom and not currently loading
  //     // setPage((prevPage) => prevPage + 1);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []); // Add/remove scroll event listener on mount/unmount

  // useEffect(() => {
  //   const outerElement = document.getElementById('outer');

  //   const handleScroll = () => {
  //     const { scrollTop, clientHeight, scrollHeight } = outerElement;
  //     if (scrollTop + clientHeight >= scrollHeight) {
  //       console.log('END');
  //     }
  //   };

  //   outerElement.addEventListener('scroll', handleScroll);

  //   return () => {
  //     outerElement.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const outerRef = useRef(null);
  // const [page, setPage] = useState(1)
  // const [myFriendsList, setMyFriendsList] = useState([])
  // console.log('myFriendsList', myFriendsList)
  // console.log('page', page)

  // const infiniteData = useCallback(async () => {

  //   const payload = {
  //     page: page,
  //     limit: 10,
  //     search: ""
  //   }
  //   const response = await dispatch(friendsRequestsSearch(payload)).unwrap();
  //   setMyFriendsList([...myFriendsList, ...response?.data?.Data])
  //   console.log('response', response)
  // }, [page])

  // const handleScroll = () => {
  //   const outerElement = outerRef.current;
  //   if (outerElement) {
  //     const { scrollTop, clientHeight, scrollHeight } = outerElement;
  //     if (scrollTop + clientHeight >= scrollHeight) {
  //       setPage(page + 1)
  //       infiniteData()
  //     }
  //   }
  // };



  const infiniteData = useCallback(async (currentPage) => {
    const payload = {
      page: currentPage,
      limit: 20,
      search: searchrequest,
      isGroup: false
    };
    const response = await dispatch(friendsRequestsSearch(payload)).unwrap();
    if (searchrequest === "") {
      setMyFriendsList((prevList) => [...prevList, ...response?.data?.Data]);
      setMyFriendsSearchList([])
    } else {
      setPage(1)
      setMyFriendsSearchList([...response?.data?.Data])
      setMyFriendsList([])
    }
  }, [dispatch, searchrequest]);

  const handleScroll = useCallback(() => {
    const outerElement = outerRef.current;
    if (outerElement) {
      const { scrollTop, clientHeight, scrollHeight } = outerElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [outerRef]);
  useEffect(() => {
    infiniteData(page);
  }, [infiniteData, page, searchrequest]);

  const friendsList = myFriendsList?.map((user, index) => (
    <div className="flex items-center relative userSelact" key={index}>
      <input
        type="checkbox"
        name="userSelect2"
        id="userSelect2"
        checked={
          selectedFriends.findIndex((item) => item._id === user._id) >= 0
        }
        onChange={(e) => onSelectHandler(e, user)}
        className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
      />
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {user?.profileimage == "" ? <div className="icon-user h-full w-full bg-gray-200 text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"></div> : <img
            src={`https://festumfield.s3.ap-south-1.amazonaws.com/${user?.profileimage}`}
            alt="G-user"
            className="h-full w-full"
          />}


        </div>
        <span className="text-base font-bold text-chatlook-dark">
          {/* {user.fullName} */}
          {user.fullName ? user.fullName : user.nickName}
        </span>
      </div>
      <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
        <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
      </div>
    </div>
  ));



  return (
    <div className="fixed inset-0 w-full h-full min-h-screen flex items-center justify-center py-10 px-5 bg-black/60">
      <div
        className="w-full max-w-[480px] bg-white p-8 rounded-[15px]"
        style={{ zIndex: "9999999999999" }}
      >
        <div className="w-full relative">
          <h2 className="text-xl lg:text-2xl font-bold text-center">New Group </h2>
          <div
            className="absolute top-0 right-0 z-50 text-black font-bold cursor-pointer"
            onClick={() => {
              handleClose(false);
            }}
          >
            <IoClose className="text-red-600 font-bold text-2xl cursor-pointer" />
          </div>
        </div>
        <div className="w-full h-full min-h-[380px] max-h-[380px] bg-white overflow-y-auto mt-5" id="outer" ref={outerRef} onScroll={handleScroll}>
          <div className="w-full sticky top-0 bg-white z-20">
            <label
              htmlFor="search"
              className="w-full py-2 px-3 flex items-center rounded-md border bg-[#F1F1F1] border-chatlook-grayLight"
            >
              <input
                type="search"
                name="Search"
                id="Search"
                placeholder="Search"
                className="w-full outline-none"
                onChange={(e) => {
                  setLoading(true)
                  setTimeout(() => {
                    setSearchRequest(e.target.value);
                  }, 500);
                  setLoading(false)
                }}
              />
              <i className="icon-search"></i>
            </label>
          </div>
          <div className="w-full flex flex-wrap items-center space-x-1.5 py-2">
            {selectedFriendsElement}
          </div>
          <div className="w-full py-2 border-t border-chatlook-grayLight  space-y-3 pr-2">
            {
              loading ? (
                <div className="flex  justify-center" >
                  <PulseLoader color="#36d7b7" />
                </div>
              ) : searchrequest === "" ? (
                friendsList
              ) : (
                filterFriendSearch
              )
            }

          </div>
          {/* <div className="w-full" id="inner">
            {myFriendsList.map((val, index) => {
              return (
                <React.Fragment key={index}>
                  <SidebarChatListItem key={index} val={val} />
                </React.Fragment>
              );
            })}
          </div> */}
          {/* {friendsList} */}
        </div>
        <button
          onClick={onNextClick}
          className="w-12 h-12 bg-chatlook-sky rounded-full mx-auto block"
        >
          <i className="icon-next-arrow text-white text-xl"></i>
        </button>
      </div>
      <Modal isOpen={isCreateNewGroupPopUpOpen}>
        <CreateNewGroupPopUp
          selectedFriendsList={selectedFriends.map((item) => item._id)}
          handleClose={setIsCreateNewGroupPopUpOpen}
          setOldPopUp={handleClose}
        />
      </Modal>
    </div>
  );
}
