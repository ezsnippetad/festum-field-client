import React from "react";
import User from "../../../assets/images/user.png";
import Product from "../../../assets/images/product.png";

export default function VideoCallPopUp({ handleClose }) {
  return (
    <div
      id="video-pop"
      class="absolute top-0 shadow-one right-5 z-50 space-y-5 bg-white min-w-[375px] rounded-lg py-10 overflow-hidden open"
    >
      <div class="w-28 h-28 border-4 border-white rounded-full mx-auto overflow-hidden flex justify-center">
        <img src={User} alt="user" />
      </div>
      <div class="user-name text-center space-y-2">
        <h3 class="text-white">John Hosier</h3>
        <h4 class="text-white font-light">Ringing...</h4>
      </div>
      <div
        class="absolute inset-0 w-full h-full -z-10"
        style={{ marginTop: 0 }}
      >
        <img
          src={Product}
          class="object-cover w-full h-full blur-sm"
          alt="product"
        />
        <div class="absolute w-full h-full inset-0 bg-chatlook-dark opacity-60"></div>
      </div>
      <div class="flex space-x-3 justify-center call-btns">
        <span class="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg">
          <i class="icon-video-calling" aria-hidden="true"></i>
        </span>
        <span class="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
          <i class="icon-speaker" aria-hidden="true"></i>
        </span>
        <span class="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
          <i class="icon-mute" aria-hidden="true"></i>
        </span>
        <span
          onClick={() => handleClose(false)}
          class="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red rounded-lg hover:bg-chatlook-red"
        >
          <i class="icon-disconnect-call text-white" aria-hidden="true"></i>
        </span>
      </div>
      <div class="absolute right-5 top-0 screen-resize bg-transparent">
        <span
          class="icon-full-screen text-chatlook-gray text-xl cursor-pointer"
          onclick="addFunction1('video-pop', 'fix-open')"
        ></span>
        <span
          class="icon-zoom-out text-chatlook-gray text-xl cursor-pointer hidden"
          onclick="removeFunction('video-pop', 'fix-open')"
        ></span>
      </div>
    </div>
  );
}
