import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../createContext";
import { useDispatch } from "react-redux";
import { friendRequestsUpdate, friendsRequestsSearch, setMyNewFriedList } from "../../../redux/Slice/requestSlice";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

export default function FriendRequestAcceptPopUp({
  handleClose,
  setStatus,
  reqId,
  setRequestsReceivedList,
  requestsReceivedList
}) {
  // const { setPermissions, permissions } = useContext(Context);
  const dispatch = useDispatch()
  const initialValues = { fullname: true, contactnumber: false, email: false, dob: false, gender: false, socialmedia: false, videocall: true, audiocall: true }

  const [permissions, setPermission] = useState(initialValues)
  const [loading, setLoading] = useState(false)



  const handleChange = (event) => {
    const { name, checked } = event.target
    setPermission({
      ...permissions,
      [name]: checked,
    });
  }

  const acceptFriendRequest = async () => {
    const payload = {
      friendrequestid: reqId,
      status: "accepted",
      authorized_permissions: permissions,
    };
    try {
      setLoading(true)
      const response = await dispatch(friendRequestsUpdate(payload)).unwrap();

      if (response?.data?.IsSuccess) {
        toast.success(response?.data?.Message)
        const friendListpayload = {
          page: 1,
          limit: 50,
          search: "",
        };
        const friendListresponse = await dispatch(friendsRequestsSearch(friendListpayload)).unwrap();
        dispatch(setMyNewFriedList([...friendListresponse?.data?.Data]));
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
      id="acceptPop"
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
              <span className="icon-selected text-chatlook-sky text-7xl inline-block pt-3"></span>
              <h2 className="capitalize pt-5">accept Request</h2>
              <h4 className="chat text-chatlook-gray font-normal pt-4 leading-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </h4>

              <div className="flex items-center justify-between pt-5">
                <div className="flex items-center space-x-3 video-btn-sky">
                  <span className="icon-call text-2xl"></span>
                  <p className="text-base text-chatlook-dark font-semibold">
                    Phone Number
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="form-check form-switch relative">
                    <input
                      className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-chatlook-grayLight bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox"
                      name="contactnumber"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={permissions.contactnumber}
                      onChange={handleChange}
                    />
                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      Off
                    </span>
                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      ON
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-5">
                <div className="flex items-center space-x-3 video-btn-sky">
                  <span className="icon-call text-2xl"></span>
                  <p className="text-base text-chatlook-dark font-semibold">
                    Email
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="form-check form-switch relative">
                    <input
                      className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-chatlook-grayLight bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox"
                      name="email"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={permissions.email}
                      onChange={handleChange}
                    />
                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      Off
                    </span>
                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      ON
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-5">
                <div className="flex items-center space-x-3 video-btn-sky">
                  <span className="icon-call text-2xl"></span>
                  <p className="text-base text-chatlook-dark font-semibold">
                    Date of birth
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="form-check form-switch relative">
                    <input
                      className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-chatlook-grayLight bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox"
                      name="dob"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={permissions.dob}
                      onChange={handleChange}
                    />
                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      Off
                    </span>
                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      ON
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-5">
                <div className="flex items-center space-x-3 video-btn-sky">
                  <span className="icon-call text-2xl"></span>
                  <p className="text-base text-chatlook-dark font-semibold">
                    Gender
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="form-check form-switch relative">
                    <input
                      className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-chatlook-grayLight bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox"
                      name="gender"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={permissions.gender}
                      onChange={handleChange}
                    />
                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      Off
                    </span>
                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      ON
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-5">
                <div className="flex items-center space-x-3 video-btn-sky">
                  <span className="icon-call text-2xl"></span>
                  <p className="text-base text-chatlook-dark font-semibold">
                    Social Media
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="form-check form-switch relative">
                    <input
                      className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-chatlook-grayLight bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox"
                      role="switch"
                      name="socialmedia"
                      id="flexSwitchCheckDefault"
                      checked={permissions.socialmedia}
                      onChange={handleChange}
                    />
                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      Off
                    </span>
                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      ON
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-7">
                <div className="flex items-center space-x-3 video-btn-sky">
                  <span className="icon-video text-2xl"></span>
                  <p className="text-base text-chatlook-dark font-semibold">
                    Video Call
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="form-check form-switch relative">
                    <input
                      className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-chatlook-grayLight bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox"
                      name="videocall"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={permissions.videocall}
                      onChange={handleChange}
                    />
                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      Off
                    </span>
                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      ON
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-5">
                <div className="flex items-center space-x-3 video-btn-sky">
                  <span className="icon-call text-2xl"></span>
                  <p className="text-base text-chatlook-dark font-semibold">
                    Audio Call
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="form-check form-switch relative">
                    <input
                      className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-chatlook-grayLight bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox"
                      role="switch"
                      name="audiocall"
                      id="flexSwitchCheckDefault"
                      checked={permissions.audiocall}
                      onChange={handleChange}
                    />
                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      Off
                    </span>
                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                      ON
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center pt-7 space-x-5">
                <button
                  className="w-full inline-block border border-chatlook-gray text-chatlook-gray uppercase rounded-md px-12 py-2.5 text-lg font-medium"
                  onClick={() => {
                    handleClose(false);
                  }}
                >
                  Cancle
                </button>
                <button
                  className="w-full inline-block bg-chatlook-sky text-white uppercase rounded-md px-9 py-2.5 text-lg font-medium"
                  onClick={acceptFriendRequest}
                >
                  {loading ? <PulseLoader color="white" /> : "accept"}

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
