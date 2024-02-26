import React from "react";
import Profile from "../../../assets/images/profile.png";
import { useNavigate } from "react-router-dom";

export default function NewBroadcastPopUp({ handleClose }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-full h-full min-h-screen overflow-y-auto flex items-center justify-center py-10 px-5 bg-black/60">
      <div
        className="absolute z-10 top-0 right-0 bottom-0 left-0 h-full w-full"
        onClick={() => handleClose(false)}
      ></div>
      <div
        className="w-full max-w-[480px] bg-white p-8 rounded-[15px] space-y-4"
        style={{ zIndex: "9999999999999" }}
      >
        <h2 className="text-xl lg:text-2xl font-bold text-center">New Broadcast</h2>
        <div className="w-full">
          <label
            for="search"
            className="w-full py-2 px-3 flex items-center rounded-md border bg-[#F1F1F1] border-chatlook-grayLight"
          >
            <input
              type="search"
              name="Search"
              id="Search"
              placeholder="Search"
              className="w-full outline-none"
            />
            <i className="icon-search"></i>
          </label>
          <div className="w-full flex flex-wrap items-center space-x-1.5 py-2">
            <div className="w-10 h-10 relative m-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={Profile} alt="G-user" />
              </div>
              <span className="w-4 h-4 rounded-full flex items-center justify-center bg-chatlook-sky border border-white absolute bottom-0 right-0 z-30 cursor-pointer">
                <i className="icon-close text-[6px] text-white"></i>
              </span>
            </div>
            <div className="w-10 h-10 relative m-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={Profile} alt="G-user" />
              </div>
              <span className="w-4 h-4 rounded-full flex items-center justify-center bg-chatlook-sky border border-white absolute bottom-0 right-0 z-30 cursor-pointer">
                <i className="icon-close text-[6px] text-white"></i>
              </span>
            </div>
            <div className="w-10 h-10 relative m-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={Profile} alt="G-user" />
              </div>
              <span className="w-4 h-4 rounded-full flex items-center justify-center bg-chatlook-sky border border-white absolute bottom-0 right-0 z-30 cursor-pointer">
                <i className="icon-close text-[6px] text-white"></i>
              </span>
            </div>
          </div>
          <div className="w-full py-2 border-t border-chatlook-grayLight space-y-3 max-h-[400px] overflow-y-auto">
            <div className="flex items-center relative userSelact">
              <input
                type="checkbox"
                name="userSelect"
                id="userSelect"
                className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                checked
              />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={Profile} alt="G-user" />
                </div>
                <span className="text-base font-bold text-chatlook-dark">
                  Ahmed Medi
                </span>
              </div>
              <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
              </div>
            </div>
            <div className="flex items-center relative userSelact">
              <input
                type="checkbox"
                name="userSelect2"
                id="userSelect2"
                className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={Profile} alt="G-user" />
                </div>
                <span className="text-base font-bold text-chatlook-dark">
                  Ahmed Medi
                </span>
              </div>
              <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
              </div>
            </div>
            <div className="flex items-center relative userSelact">
              <input
                type="checkbox"
                name="userSelect3"
                id="userSelect3"
                className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={Profile} alt="G-user" />
                </div>
                <span className="text-base font-bold text-chatlook-dark">
                  Ahmed Medi
                </span>
              </div>
              <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
              </div>
            </div>
            <div className="flex items-center relative userSelact">
              <input
                type="checkbox"
                name="userSelect4"
                id="userSelect4"
                className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={Profile} alt="G-user" />
                </div>
                <span className="text-base font-bold text-chatlook-dark">
                  Ahmed Medi
                </span>
              </div>
              <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
              </div>
            </div>
            <div className="flex items-center relative userSelact">
              <input
                type="checkbox"
                name="userSelect6"
                id="userSelect6"
                className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={Profile} alt="G-user" />
                </div>
                <span className="text-base font-bold text-chatlook-dark">
                  Ahmed Medi
                </span>
              </div>
              <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
              </div>
            </div>
            <div className="flex items-center relative userSelact">
              <input
                type="checkbox"
                name="userSelect7"
                id="userSelect7"
                className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={Profile} alt="G-user" />
                </div>
                <span className="text-base font-bold text-chatlook-dark">
                  Ahmed Medi
                </span>
              </div>
              <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
              </div>
            </div>
            <div className="flex items-center relative userSelact">
              <input
                type="checkbox"
                name="userSelect8"
                id="userSelect8"
                className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={Profile} alt="G-user" />
                </div>
                <span className="text-base font-bold text-chatlook-dark">
                  Ahmed Medi
                </span>
              </div>
              <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
              </div>
            </div>
          </div>
          <button
            className="w-24 lg:w-[138px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium mt-3 mx-auto"
            onClick={() => {
              handleClose(false);
              navigate("/dashboard/chats/newbroadcastchat");
            }}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
