import React from "react";
import Woman from "../../assets/images/woman.png";
import Profile from "../../assets/images/profile.png";

export default function Status() {
  return (
    <div className="bg-white w-full h-screen flex justify-center items-center">
      <div className="text-center">
        <span className="icon-read text-chatlook-sky text-8xl"></span>
        <p className="pt-5">Click on a contact to view their status updates</p>
      </div>
    </div>
  );
}
