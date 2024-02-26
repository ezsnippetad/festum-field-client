import React from "react";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../assets/images/business-info.png";

export default function BusinessProfile() {
  const navigate = useNavigate();

  return (
    <main className="h-screen">
      <div className="flex flex-col items-center justify-center py-16 max-h-[554px] h-full bg-chatlook-sky">
        <div className="w-44 h-44 relative">
          <img
            src={ProfilePic}
            alt=""
            className="object-cover profial-image w-44 h-44 border-2 border-white rounded-full overflow-hidden"
          />
          <input type="file" name="" id="profial" className="hidden" />
          <label
            for="profial"
            className="w-12 h-12 absolute bottom-0 right-0 bg-white rounded-full z-10 block icon-pen before:content-['\e93f'] before:flex before:items-center before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:justify-center before:text-2xl before:text-chatlook-sky"
          ></label>
        </div>
        <p className="text-white font-bold pt-6">Caroline Case</p>
        <h3 className="text-white font-normal pt-2">Caroline</h3>
        <div className="flex items-center mt-5">
          <div
            onClick={() => navigate("/dashboard/profile/editbusinessprofile")}
            className="bg-white text-chatlook-sky rounded-md text-sm uppercase mr-4 px-3 py-3"
          >
            Edit Business Profile
          </div>
          <a className="inline-block bg-white rounded-md px-3 py-2">
            <span className="icon-store text-xl text-chatlook-sky"></span>
          </a>
        </div>
      </div>
    </main>
  );
}
