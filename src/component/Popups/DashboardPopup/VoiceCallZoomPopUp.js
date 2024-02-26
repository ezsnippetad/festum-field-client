import React from "react";
import User from "../../../assets/images/user.png";
export default function VoiceCallZoomPopUp({ handleClose }) {
  return (
    <>
      <div
        id="call-pop"
        className="absolute top-full shadow-one right-5 z-20 space-y-5 bg-white min-w-[375px] rounded-lg py-10 open fix-open"
      >
        <div className="w-28 h-28 border-4 border-white rounded-full mx-auto overflow-hidden flex justify-center">
          <img src={User} alt="user" />
        </div>
        <div className="user-name text-center space-y-2">
          <h3 className="">John Hosier</h3>
          <h4 className="text-chatlook-gray font-light">Ringing...</h4>
        </div>
        <div className="flex space-x-3 justify-center call-btns">
          <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg">
            <i className="icon-video-calling" aria-hidden="true"></i>
          </span>
          <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
            <i className="icon-speaker" aria-hidden="true"></i>
          </span>
          <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
            <i className="icon-mute" aria-hidden="true"></i>
          </span>
          <span
            onclick="removeFunction('call-pop', 'open')"
            className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red text-chatlook-gray rounded-lg hover:bg-chatlook-red"
            onClick={() => handleClose(false)}
          >
            <i className="icon-disconnect-call text-white" aria-hidden="true"></i>
          </span>
        </div>
        <span
          className="icon-full-screen text-chatlook-gray text-xl absolute right-5 top-0 cursor-pointer"
          onclick="addFunction1('call-pop', 'fix-open')"
        ></span>
        <span
          className="icon-zoom-out text-chatlook-gray text-xl absolute right-5 top-0 cursor-pointer hidden"
          onclick="removeFunction('call-pop', 'fix-open')"
        ></span>
      </div>
    </>
  );
}
