import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { authorizedPermissionsSet, useProfileGets } from "../../../redux/Slice/profileSlice";
import { friendsRequest, friendsRequestsSearch, getSingleFriend, setMyNewFriedList, useFriendRequestFromId, useMyFriendsList, } from "../../../redux/Slice/requestSlice";
import { useCurrentChatUser } from "../../../redux/Slice/chatSlice";

export default function AuthorizedGroupPermissionPopUp({ handleClose }) {
    const { id } = useParams()
    const [isLoading, setLoading] = useState(false)
    const userProfile = useProfileGets()
    const dispatch = useDispatch()
    const [values, setValues] = useState({})
    // useEffect(() => {
    //     const getOneFriend = async () => {
    //         const response = await dispatch(getSingleFriend({ friendid: id }))
    //         setValues(response?.payload?.data?.Data?.permissions)
    //     }
    //     getOneFriend()
    // }, [])
    // const handleChange = async (e) => {
    //     const { name, checked } = e.target;
    //     setValues({
    //         ...values,
    //         [name]: checked,
    //     });
    //     const payload = {
    //         friendid: id,
    //         authorized_permissions: {
    //             ...values,
    //             fullname: true,
    //             [name]: checked,
    //         }
    //     }

    //     const response = await dispatch(authorizedPermissionsSet(payload)).unwrap();
    //     const updatepayload = {
    //         page: 1,
    //         limit: 50,
    //         search: "",
    //     };
    //     const updateResponse = await dispatch(friendsRequestsSearch(updatepayload)).unwrap();
    //     dispatch(setMyNewFriedList(updateResponse?.data?.Data));
    //     // setValues(response?.data?.Data?.sender_scope)
    // }


    return (
        <div className="fixed inset-0 w-full h-full min-h-screen overflow-y-auto flex items-center justify-center py-10 px-5 bg-[rgba(0,0,0,0.2)]">
            <div
                className="absolute z-10 top-0 right-0 bottom-0 left-0 h-full w-full"
                onClick={() => handleClose(false)}
            ></div>
            <div
                className="w-full max-w-[480px] bg-white p-8 rounded-[15px] space-y-4"
                style={{ zIndex: "9999999999999" }}
            >
                <h2 className="text-xl lg:text-2xl font-bold text-center">
                    Group Authorized Permission
                </h2>

                <div className="w-full space-y-5">
                    {/* <div className="flex items-start space-x-2.5 w-full">
            <span className="icon-call flex text-xl"></span>
            <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
              <h4>Full Name</h4>
              <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                {userProfile.fullName}
              </span>
            </div>
            <form className="flex justify-center ml-auto">
              {!isLoading["fullname"] ? (
                <div className="form-check form-switch relative">
                  <input
                    className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                    type="checkbox"
                    name="fullname"
                    role="switch"
                    checked={values.fullname}
                    onChange={handleChange}
                  // onChange={(e) => {
                  //   setChangedPermissionKey("fullname");
                  //   setValues({
                  //     ...values,
                  //     fullname: e.target.checked,
                  //   });
                  // }}
                  />
                  <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                  <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                    Off
                  </span>
                  <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                    ON
                  </span>
                </div>
              ) : (
                <p className="text-xs">Loading...</p>
              )}
            </form>
          </div> */}
                    {/* <div className="flex items-start space-x-2.5 w-full">
                        <span className="icon-call flex text-xl"></span>
                        <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                            <h4>Phone Number</h4>
                            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                                +{userProfile?.contact_no}
                            </span>
                        </div>
                        <div className="flex justify-center ml-auto">
                            {!isLoading["contactnumber"] ? (
                                <div className="form-check form-switch relative">
                                    <input
                                        className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                                        type="checkbox"
                                        name="contactnumber"
                                        role="switch"
                                        checked={values?.contactnumber}
                                        onChange={handleChange}
                                    // checked={permissions.contactnumber}
                                    // onChange={(e) => {
                                    //   setChangedPermissionKey("contactnumber");
                                    //   setValues({
                                    //     ...values,
                                    //     contactnumber: e.target.checked,
                                    //   });
                                    // }}
                                    />
                                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        Off
                                    </span>
                                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        ON
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xs">Loading...</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                        <span className="icon-call flex text-xl"></span>
                        <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                            <h4>Email</h4>
                            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {userProfile?.emailId}
                            </span>
                        </div>
                        <div className="flex justify-center ml-auto">
                            {!isLoading["email"] ? (
                                <div className="form-check form-switch relative">
                                    <input
                                        className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                                        type="checkbox"
                                        name="email"
                                        role="switch"
                                        checked={values?.email}
                                        onChange={handleChange}
                                    // checked={permissions.email}
                                    // onChange={(e) => {
                                    //   setChangedPermissionKey("email");
                                    //   setValues({
                                    //     ...values,
                                    //     email: e.target.checked,
                                    //   });
                                    // }}
                                    />
                                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        Off
                                    </span>
                                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        ON
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xs">Loading...</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                        <span className="icon-call flex text-xl"></span>
                        <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                            <h4>Date of birth</h4>
                            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {userProfile.dob}
                            </span>
                        </div>
                        <div className="flex justify-center ml-auto">
                            {!isLoading["dob"] ? (
                                <div className="form-check form-switch relative">
                                    <input
                                        className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                                        type="checkbox"
                                        name="dob"
                                        role="switch"
                                        checked={values?.dob}
                                        onChange={handleChange}
                                    // checked={permissions.dob}
                                    // onChange={(e) => {
                                    //   setChangedPermissionKey("dob");
                                    //   setValues({
                                    //     ...values,
                                    //     dob: e.target.checked,
                                    //   });
                                    // }}
                                    />
                                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        Off
                                    </span>
                                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        ON
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xs">Loading...</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                        <span className="icon-call flex text-xl"></span>
                        <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                            <h4>Gender</h4>
                            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {userProfile?.gender}
                            </span>
                        </div>
                        <div className="flex justify-center ml-auto">
                            {!isLoading["gender"] ? (
                                <div className="form-check form-switch relative">
                                    <input
                                        className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                                        type="checkbox"
                                        name="gender"
                                        role="switch"
                                        checked={values?.gender}
                                        onChange={handleChange}
                                    // checked={permissions.gender}
                                    // onChange={(e) => {
                                    //   setChangedPermissionKey("gender");
                                    //   setValues({
                                    //     ...values,
                                    //     gender: e.target.checked,
                                    //   });
                                    // }}
                                    />
                                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        Off
                                    </span>
                                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        ON
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xs">Loading...</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                        <span className="icon-call flex text-xl"></span>
                        <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                            <h4>social media</h4>
                            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                                Privacy and Security
                            </span>
                        </div>
                        <div className="flex justify-center ml-auto">
                            {!isLoading["socialmedia"] ? (
                                <div className="form-check form-switch relative">
                                    <input
                                        className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                                        type="checkbox"
                                        role="socialmedia"
                                        name="socialmedia"
                                        onChange={handleChange}
                                        checked={values?.socialmedia}
                                    // checked={permissions.socialmedia}
                                    // onChange={(e) => {
                                    //   setChangedPermissionKey("socialmedia");
                                    //   setValues({
                                    //     ...values,
                                    //     socialmedia: e.target.checked,
                                    //   });
                                    // }}
                                    />
                                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        Off
                                    </span>
                                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        ON
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xs">Loading...</p>
                            )}
                        </div>
                    </div> */}
                    <div className="flex items-start space-x-2.5 w-full">
                        <span className="icon-call flex text-xl"></span>
                        <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                            <h4>Video Call</h4>
                            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                                Privacy and Security
                            </span>
                        </div>
                        <div className="flex justify-center ml-auto">
                            {!isLoading["videocall"] ? (
                                <div className="form-check form-switch relative">
                                    <input
                                        className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                                        type="checkbox"
                                        role="switch"
                                        name="videocall"
                                        checked={values?.videocall}
                                        // onChange={handleChange}
                                    // checked={permissions.videocall}
                                    // onChange={(e) => {
                                    //   setChangedPermissionKey("videocall");
                                    //   setValues({
                                    //     ...values,
                                    //     videocall: e.target.checked,
                                    //   });
                                    // }}
                                    />
                                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        Off
                                    </span>
                                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        ON
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xs">Loading...</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start space-x-2.5 w-full">
                        <span className="icon-call flex text-xl"></span>
                        <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                            <h4>Audio Call</h4>
                            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                                Privacy and Security
                            </span>
                        </div>
                        <div className="flex justify-center ml-auto">
                            {!isLoading["audiocall"] ? (
                                <div className="form-check form-switch relative">
                                    <input
                                        className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                                        name="audiocall"
                                        type="checkbox"
                                        role="switch"
                                        // onChange={handleChange}
                                        checked={values?.audiocall}
                                    // checked={values.audiocall}
                                    // onChange={(e) => {
                                    //   setChangedPermissionKey("audiocall");
                                    //   setValues({
                                    //     ...values,
                                    //     audiocall: e.target.checked,
                                    //   });
                                    // }}
                                    />
                                    <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                                    <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        Off
                                    </span>
                                    <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                                        ON
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xs">Loading...</p>
                            )}
                        </div>
                    </div>
                    {/* <div className="flex items-start space-x-2.5 w-full">
            <span className="icon-call flex text-xl"></span>
            <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
              <h4>Mute Notification</h4>
              <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                Privacy and Security
              </span>
            </div>
            <div className="flex justify-center ml-auto">
              <div className="form-check form-switch relative">
                <input
                  className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  role="switch"
                  
                // // onChange={(e) =>
                // //   setValues({
                // //     ...values,
                // //     fullname: e.target.checked,
                // //   })
                // // }
                // />
                <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  Off
                </span>
                <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                  ON
                </span>
              </div>
            </div>
          </div> */}
                </div>

            </div>
        </div>
    );
}
