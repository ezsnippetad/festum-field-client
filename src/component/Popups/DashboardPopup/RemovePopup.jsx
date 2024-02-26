import React from "react";
import Remove from "../src/assets/images/Remove.png"

const RemovePopup = () => {
  return (
    <div>
      <div className="w-full h-full  fixed flex py-10 px-5 bg-black/30 items-center justify-center ">
        <div className="max-w-[335px] bg-white p-[30px] flex flex-col items-center justify-center rounded-2xl">
          <img src={Remove} className="w-[188px] h-[137px]" />
          <h1 className="font-bold text-xl pt-4"> Delete Product</h1>
          <p className="text-sm text-center pt-2.5">
            Are you sure you want to delete this item?
          </p>
          <div className="pt-8">
            <button className="border border-[#888888] w-32 h-10 bg-white rounded">
              CANCEL{" "}
            </button>
            <button className=" bg-chatlook-sky text-white ml-3 w-32 h-10 border border-chatlook-sky rounded">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemovePopup;
