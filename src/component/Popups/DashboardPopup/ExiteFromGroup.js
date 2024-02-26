import React, { useContext, useState } from "react";
import Delete from "../../../assets/images/svg/Delete.svg"
import { useDispatch } from "react-redux";
import { friendBlockorUnfriend, friendRequestRemove, friendsRequestsSearch, gropusRequestsSearch, setMyNewFriedList, setMyNewGroupList } from "../../../redux/Slice/requestSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../createContext";
import { PulseLoader } from "react-spinners";
import { UserX } from "lucide-react";
import { useProfileGets } from "../../../redux/Slice/profileSlice";
import { getSingleGroup, removeGroupMember } from "../../../redux/Slice/chatSlice";

export default function ExiteFromGroup({ groupData, handleClose }) {
    const myProfile = useProfileGets()
    const myIsInGroupMember = groupData?.members?.find((items) => {
        return items?._id?._id === myProfile?._id
    })
    const { id } = useParams()

    const { rightSidebarToggle, } = useContext(Context);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const exitfromGroupFunction = async () => {

        try {
            const payload = {
                groupid: groupData?._id,
                members: [myIsInGroupMember?._id?._id]
            };
            setLoading(true)
            const response = await dispatch(removeGroupMember(payload))

            dispatch(getSingleGroup({ groupid: id }))
            if (response?.payload?.data?.IsSuccess) {
                toast.success("Exit Group Successfully")
                const friendListpayload = {
                    page: 1,
                    limit: 50,
                    search: "",
                };
                const groupListresponse = await dispatch(gropusRequestsSearch(friendListpayload)).unwrap();
                dispatch(setMyNewGroupList([...groupListresponse?.data?.Data]));
                rightSidebarToggle("")
                navigate("../dashboard")
            }
            handleClose()
        } catch (error) {
            console.warn(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            id="rejectPop"
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
                        <div className="bg-white p-8 text-center">
                            <button
                                className="icon-close absolute right-0 p-5 top-0 text-xl"
                                onClick={() => handleClose(false)}
                            ></button>
                            {/* <img src={Delete} className="text-7xl inline-block pt-3" /> */}
                            {/* <span className="icon-reject-request text-chatlook-red text-7xl inline-block pt-3"></span> */}
                            <UserX className=" inline-block m-2" size={50} color="#FC5858" />
                            <h2 className="capitalize pt-5">Exit From Friend</h2>
                            <h4 className="chat text-chatlook-gray font-normal pt-4">
                                Are you sure you want to Leave this Group ?
                            </h4>
                            <div className="pt-7 space-y-5">
                                <button
                                    className="w-full inline-block bg-[#FC5858] text-white uppercase rounded-md px-12 py-2.5 text-lg font-medium"
                                    onClick={exitfromGroupFunction}
                                >
                                    {loading ? <PulseLoader color="white" /> : "Leave Group"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
