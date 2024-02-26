import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Common/Modals/Modal";
import CreateYourProfile from "../../component/Popups/DashboardPopup/CreateYourProfile";
import HeaderDashboard from "../../Common/HeaderDashboard";
import { profileGet, useProfileGets, businessList, getBusinessCategories } from "../../redux/Slice/profileSlice";
import { Context } from "../../createContext";
import { useDispatch } from "react-redux";
import { getProfile } from "../../redux/services/profileServices";
import NewCreateBusinessProfile from "../../component/Popups/DashboardPopup/NewCreateBusinessProfile";

function Home() {
  const profileGets = useProfileGets();
  const dispatch = useDispatch()
  const [emptyProfilePopup, setEmptyProfilePopUp] = useState(true);
  useEffect(() => {
    dispatch(profileGet())
    dispatch(businessList())
    dispatch(getBusinessCategories())
  }, []);

  return (
    <>
      {/* <NewCreateBusinessProfile /> */}
      <HeaderDashboard />
      <main>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center p-3 w-full max-w-sm mx-auto">
            <div className="w-36 h-36 flex items-center justify-center text-7xl rounded-full bg-chatlook-sky mx-auto">
              {profileGets?.profileimage ? (
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={`https://festumfield.s3.ap-south-1.amazonaws.com/${profileGets?.profileimage}`}
                  alt="Profile pic"
                />
              ) : (
                <div className="icon-user h-full w-full text-white rounded-full text-6xl justify-center items-center flex icon-user overflow-hidden object-cover"></div>
              )}
            </div>
            <div className="space-y-3 mt-6 mb-3">
              <h5 className="text-4xl font-bold">Welcome</h5>
              {profileGets?.contact_no && (
                <h5 className="text-4xl font-normal text-chatlook-gray">
                  + {profileGets?.contact_no}
                </h5>
              )}
            </div>
            <span className="chat pt-3 text-[#888888] text-base">
              Search for some to start chatting with or go to contacts to see
              who is available
            </span>
          </div>
        </div>
        {profileGets?.fullname === "" && (
          <Modal isOpen={emptyProfilePopup}>
            <CreateYourProfile setEmptyProfilePopUp={setEmptyProfilePopUp} />
          </Modal>
        )}
      </main>
    </>
  );
}

export default Home;
