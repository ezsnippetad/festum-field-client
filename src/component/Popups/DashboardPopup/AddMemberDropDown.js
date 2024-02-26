import React from "react";
import ViewProfile from "../../../assets/images/svg/ViewProfile.svg";
import RemoveMember from "../../../assets/images/svg/RemoveMember.svg";
import SendMessage from "../../../assets/images/svg/SendMessage.svg";
import { useDispatch } from "react-redux";
import { removeGroupMember, setCurrentChatUser } from "../../../redux/Slice/chatSlice";
import { allFriendsRequest } from "../../../redux/services/requestServices";
import { useContext } from "react";
import { Context } from "../../../createContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { gropusRequestsSearch, setMyNewGroupList } from "../../../redux/Slice/requestSlice";

export default function AddMemberDropDown({ seletedMemberId, groupId, groupData, profileGets }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allFriendsRequest } = useContext(Context);
  const { rightSidebarToggle } = useContext(Context);
  const removeMember = async () => {

    const payload = {
      groupid: groupId,
      members: [seletedMemberId],
    };

    const response = await dispatch(removeGroupMember(payload));
    // dispatch(setCurrentChatUser(response?.payload?.data?.Data))
    const payloadUpdate = {
      page: 1,
      limit: 50,
      search: "",
    };
    const updateResponse = await dispatch(gropusRequestsSearch(payloadUpdate)).unwrap();
    dispatch(setMyNewGroupList([...updateResponse?.data?.Data]));

    if (response?.payload?.data?.IsSuccess) {
      toast.success(response?.payload?.data?.Data?.Message);
      // allFriendsRequest();
    }
  };
  const sendMessagetoMember = () => {
    navigate(`/dashboard/chats/chatdetails/${seletedMemberId}`);
    rightSidebarToggle("")
  };
  const viewMemberProfile = () => {
    navigate(`/dashboard/chats/chatdetails/${seletedMemberId}`);
    rightSidebarToggle("userprofile")
  }
  return (
    <div
      id="chat-drop"
      className=" shadow-one bg-white  rounded-lg min-w-[150px] max-w-[180px] origin-top anim absolute w-full top-6 -left-2 z-10"
    >
      <h4
        className="flex items-center hover:bg-gray-200 duration-300 p-3  rounded-lg justify-start space-x-2 cursor-pointer"
        onClick={sendMessagetoMember}
      >
        <img src={SendMessage} />
        <a> Message</a>
      </h4>
      {/* <h4 className="flex items-center  hover:bg-gray-200 duration-300 justify-start rounded-lg space-x-2 p-3 cursor-pointer" onClick={viewMemberProfile} >
        <img src={ViewProfile} />
        <a>View Profile</a>
      </h4> */}
      {/* {item?._id?._id?.includes(groupData?.createdBy)} */}
      {groupData?.createdBy == profileGets?._id && (<h4
        className="flex items-center  hover:bg-gray-200 duration-300 justify-start p-3 rounded-lg space-x-2 cursor-pointer"
        onClick={removeMember}
      >
        <img src={RemoveMember} />
        <a>Remove Member</a>
      </h4>)}

    </div>
  );
}
