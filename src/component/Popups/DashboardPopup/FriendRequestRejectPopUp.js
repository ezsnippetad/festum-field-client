import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { friendRequestsUpdate } from "../../../redux/Slice/requestSlice";
import { toast } from "react-toastify";
import { localeData } from "moment";
import { PulseLoader } from "react-spinners";

export default function FriendRequestRejectPopUp({ handleClose, setStatus, setRequestsReceivedList, requestsReceivedList, reqId }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const rejectRequest = async () => {
    const payload = {
      friendrequestid: reqId,
      status: "rejected",
    };
    try {
      setLoading(true)
      const response = await dispatch(friendRequestsUpdate(payload)).unwrap();
      if (response?.data?.IsSuccess) {
        toast.success(response?.data?.Message)
        const pendingReceiveRequests = requestsReceivedList.filter((items) => {
          return items?.request_id !== reqId
        })
        setRequestsReceivedList(pendingReceiveRequests)
      }
      handleClose()
    } catch (error) {
      console.log('error', error)
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
              <span className="icon-reject-request text-chatlook-red text-7xl inline-block pt-3"></span>
              <h2 className="capitalize pt-5">reject Request</h2>
              <h4 className="chat text-chatlook-gray font-normal pt-4">
                Are you sure you want to reject this request?
              </h4>
              <div className="pt-7 space-y-5">
                <button
                  className="w-full inline-block bg-[#FC5858] text-white uppercase rounded-md px-12 py-2.5 text-lg font-medium"
                  onClick={rejectRequest}
                >
                  {loading ? <PulseLoader color="white" /> : "reject"}

                </button>
                {/* <button
                  className="w-full inline-block border border-chatlook-red text-chatlook-red uppercase rounded-md px-9 py-2.5 text-lg font-medium"
                  onClick={() => {
                    handleClose(false);
                    setStatus("blocked");
                  }}
                >
                  permanent reject
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
