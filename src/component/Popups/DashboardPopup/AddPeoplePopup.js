import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Profile from "../../../assets/images/profile.png";
import CreateNewGroupPopUp from "./CreateNewGroupPopUp";
import Modal from "../../../Common/Modals/Modal";
import {
  friendsRequestsSearch,
  gropusRequestsSearch,
  setMyNewGroupList,
  useFriendsRequests,
  useMyGroupList,
} from "../../../redux/Slice/requestSlice";
import { Secondary, Success } from "../../../redux/services/toastServices";
import { useDispatch } from "react-redux";
import { addGroupMembers, getSingleGroup, setCurrentChatUser, useCurrentChatUser } from "../../../redux/Slice/chatSlice";
import { Context } from "../../../createContext";
import { useParams } from "react-router-dom";

export default function AddPeoplePopup({ handleClose, data }) {
  const myNewGroupList = useMyGroupList()
  // const data = useCurrentChatUser()
  const { id } = useParams()
  // const data = myNewGroupList?.find((items) => {
  //   return items?._id == id
  // })

  // const data = groupData
  const { allFriendsRequest } = useContext(Context);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [myFriendsList, setMyFriendsList] = useState([]);
  const [myFriendsSearchList, setMyFriendsSearchList] = useState([]);
  const [searchrequest, setSearchRequest] = useState("");
  const outerRefFriendList = useRef()

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
      setMyFriendsList([]);
      setMyFriendsSearchList([...response?.data?.Data])
    }
  }, [dispatch, searchrequest]);

  const handleScroll = useCallback(() => {
    const outerElement = outerRefFriendList.current;
    if (outerElement) {
      const { scrollTop, clientHeight, scrollHeight } = outerElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [outerRefFriendList]);
  useEffect(() => {
    infiniteData(page);
  }, [infiniteData, page, searchrequest]);

  const groupMembers = data?.members.map((items) => {
    return items?._id?._id;
  });


  const friendsRequests = useFriendsRequests();
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {


  }, [])

  const handleCheckboxChange = (user) => {
    if (selectedFriends?.includes(user?._id)) {
      const updatedFriends = selectedFriends.filter(
        (friend) => friend !== user._id
      );
      setSelectedFriends(updatedFriends);
    } else {
      const updatedFriends = [...selectedFriends, user._id];
      setSelectedFriends(updatedFriends);
    }
  }

  const friendsList = myFriendsList?.map((user, index) => {
    if (!user.members && !groupMembers?.includes(user._id)) {
      return (
        <React.Fragment key={index}>
          <div className="flex items-center relative space-y-2  userSelact">
            <input
              type="checkbox"
              name="userSelect2"
              id={user._id}
              checked={selectedFriends?.includes(user._id)}
              onChange={() => handleCheckboxChange(user)}
              className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {
                  user?.profileimage !== "" ? (
                    <img
                      src={`https://festumfield.s3.ap-south-1.amazonaws.com/${user?.profileimage}`}
                      alt="G-user"
                      className="h-full w-full"
                    />
                  ) : (
                    <div
                      className="icon-user h-full w-full text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"

                    />
                  )
                }
              </div>
              <span className="text-base font-bold text-chatlook-dark">
                {user?.fullName ?? user.nickName}
              </span>
            </div>
            <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
              <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
            </div>
          </div>
        </React.Fragment>
      );
    }
  });
  const friendsSearchList = myFriendsSearchList?.map((user, index) => {
    if (!user.members && !groupMembers?.includes(user._id)) {
      return (
        <React.Fragment key={index}>
          <div className="flex items-center relative space-y-2  userSelact">
            <input
              type="checkbox"
              name="userSelect2"
              id={user._id}
              checked={selectedFriends?.includes(user._id)}
              onChange={() => handleCheckboxChange(user)}
              className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {
                  user?.profileimage !== "" ? (
                    <img
                      src={`https://festumfield.s3.ap-south-1.amazonaws.com/${user?.profileimage}`}
                      alt="G-user"
                      className="h-full w-full"
                    />
                  ) : (
                    <div
                      className="icon-user h-full w-full text-chatlook-gray rounded-full text-2xl justify-center items-center flex icon-user overflow-hidden object-cover"

                    />
                  )
                }
              </div>
              <span className="text-base font-bold text-chatlook-dark">
                {user?.fullName ?? user.nickName}
              </span>
            </div>
            <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
              <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
            </div>
          </div>
        </React.Fragment>
      );
    }
  });

  async function onNextClick() {
    const payload = {
      groupid: data._id,
      members: selectedFriends,
    };
    const response = await dispatch(addGroupMembers(payload));
    dispatch(setCurrentChatUser(response.payload?.data?.Data))
    if (response.payload?.data?.IsSuccess) {
      Success("Members added in group");
      const payloadUpdate = {
        page: 1,
        limit: 20,
        search: "",
      };
      dispatch(getSingleGroup({ groupid: id }))
      const updateResponse = await dispatch(gropusRequestsSearch(payloadUpdate)).unwrap();
      dispatch(setMyNewGroupList([...updateResponse?.data?.Data]));
      // allFriendsRequest();
    } else {
      Secondary("Failed to add members in group");
    }

    handleClose(false);
  }

  return (
    <div className="fixed inset-0 w-full h-full min-h-screen flex items-center justify-center py-10 px-5 bg-black/60">
      <div
        className="w-full max-w-[480px] bg-white p-8 rounded-[15px]"
        style={{ zIndex: "9999999999999" }}
      >
        <div className="w-full relative">
          <h2 className="text-xl lg:text-2xl font-bold text-center">Add People</h2>
          <div
            className="absolute top-0 right-0 z-50 text-black font-bold cursor-pointer"
            onClick={() => {
              handleClose(false);
            }}
          >
            <i className="icon-close text-lg cursor-pointer"></i>
          </div>
        </div>
        <div className="w-full h-full min-h-[380px] max-h-[380px] bg-white overflow-y-auto mt-5" ref={outerRefFriendList} onScroll={handleScroll} >
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
                  setTimeout(() => {
                    setSearchRequest(e.target.value);
                  }, 500);
                }}
              />
              <i className="icon-search"></i>
            </label>
          </div>
          <div className="w-full flex flex-wrap items-center space-x-1.5 py-2">
            {/* {selectedFriendsElement} */}
          </div>
          <div className="w-full py-2 border-t border-chatlook-grayLight space-y-3 pr-2">
            {
              searchrequest === "" ? friendsList : friendsSearchList
            }
            {/* {friendsList}
            {friendsSearchList} */}
          </div>
        </div>
        <button
          onClick={onNextClick}
          className="w-12 h-12 bg-chatlook-sky rounded-full mx-auto block"
        >
          <i className="icon-next-arrow text-white text-xl"></i>
        </button>
      </div>
      {/* <Modal isOpen={isCreateNewGroupPopUpOpen}>
        <CreateNewGroupPopUp
          selectedFriendsList={selectedFriends.map((item) => item._id)}
          handleClose={setIsCreateNewGroupPopUpOpen}
          setOldPopUp={handleClose}
        />
      </Modal> */}
    </div>
  );
}
