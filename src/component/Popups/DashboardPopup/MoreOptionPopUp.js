import React from "react";

export default function MoreOptionPopUp({ handleClose }) {
  console.log("option");
  return (
    <div
      id="moreoption"
      className="w-[calc(100%-350px)] h-full bg-white/25 backdrop-blur fixed right-0 inset-y-0 z-10 ml-auto p-5 block"
    >
      <div className="w-full h-auto max-w-xs relative bg-white rounded-md mx-auto top-1/2 -translate-y-1/2">
        <div className="text-center py-4">
          <span
            className="icon-close absolute top-3 right-3 text-sm"
            onClick={() => handleClose(false)}
          ></span>
          <h2 className="text-lg xl:text-xl text-chatlook-dark">More Option</h2>
        </div>
        <div className="w-full block py-4 border-t border-t-chatlook-grayLight">
          <div className="w-max mx-auto space-y-2">
            <a className="flex items-center space-x-2">
              <span className="icon-delete text-lg text-red-400 inline-block"></span>
              <h4 className="text-sm text-red-400 font-medium">Delete Reels</h4>
            </a>
            <a className="flex items-center space-x-2">
              <span className="icon-note text-lg inline-block"></span>
              <h4 className="text-sm text-chatlook-gray font-medium">
                Edit Reels
              </h4>
            </a>
            <a className="flex items-center space-x-2">
              <span className="icon-link text-lg inline-block"></span>
              <h4 className="text-sm text-chatlook-gray font-medium">
                Copy Link
              </h4>
            </a>
            <a className="flex items-center space-x-2">
              <span className="icon-share text-lg inline-block"></span>
              <h4 className="text-sm text-chatlook-gray font-medium">
                Share Reels
              </h4>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
