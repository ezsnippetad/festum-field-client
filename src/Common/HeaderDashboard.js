import React, { useContext, useEffect } from "react";
import { Context } from "../createContext";
import { useNavigate } from "react-router-dom";
import { profileGet, useProfileGets } from "../redux/Slice/profileSlice";
import { useDispatch } from "react-redux";

const HeaderDashboard = () => {
  const { rightSidebarToggle } = useContext(Context);
  const getProfile = useProfileGets()
  const navigate = useNavigate();


  return (
    <header className="">
      <div className="w-full flex items-center">
        <div className="flex items-center space-x-3 lg:space-x-4 xl:space-x-6 ml-auto xl:pr-10">
          {/* <a  
            className="inline-block text-2xl text-chatlook-dark"
            onClick={() => rightSidebarToggle("like")}
          >
            <i className="icon-like-"></i>
          </a> */}

          {/* <a
            className="inline-block text-2xl text-chatlook-dark"
            onClick={() => navigate("/dashboard/myreels")}
          >
            <i className="icon-reels"></i>
          </a> */}
          {
            getProfile?.is_business_profile_created && (

              <a
                className="inline-block text-2xl text-chatlook-dark"
                onClick={() => navigate("/dashboard/promotions")}
              >
                <i className="icon-promotion"></i>
              </a>
            )
          }
          {
            getProfile?.is_business_profile_created && (
              <>
                <a
                  className="inline-block text-2xl text-chatlook-dark"
                  onClick={() => navigate("/dashboard/newproductslist")}
                >
                  <i className="icon-store"></i>
                </a>
              </>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
