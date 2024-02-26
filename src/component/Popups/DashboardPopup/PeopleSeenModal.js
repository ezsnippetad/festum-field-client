import React from "react";
import notificationImg from "../../../assets/images/noti-1.png";

export default function PeopleSeenModal({ handleClose }) {
  return (
    <div className="fixed inset-0 w-full h-full min-h-screen overflow-y-auto flex items-center justify-center py-10 px-5 bg-black/60">
      <div className="w-full max-w-[480px] bg-white p-8 rounded-[15px] space-y-4 relative">
        <h2 className="text-xl lg:text-[22px] font-bold text-center">
          People Seen Notification
        </h2>
        <span
          className="icon-close text-lg absolute top-4 right-5 cursor-pointer"
          onClick={() => handleClose(false)}
        ></span>
        <div className="space-y-3">
          <div className="rounded-lg flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
              <img src={notificationImg} className="object-cover" alt="woman" />
            </div>
            <div className="w-[calc(100%-54px)]">
              <h4 className="whitespace-nowrap w-full font-bold text-base overflow-ellipsis overflow-hidden capitalize">
                Ahmed Medi
              </h4>
              <span className="whitespace-nowrap w-full text-sm overflow-ellipsis overflow-hidden">
                ahmadmedi@gmail.com
              </span>
            </div>
          </div>
          <div className="rounded-lg flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
              <img src={notificationImg} className="object-cover" alt="woman" />
            </div>
            <div className="w-[calc(100%-54px)]">
              <h4 className="whitespace-nowrap w-full font-bold text-base overflow-ellipsis overflow-hidden capitalize">
                Daniel Dwyer
              </h4>
              <span className="whitespace-nowrap w-full text-sm overflow-ellipsis overflow-hidden">
                danieldwyer@gmail.com
              </span>
            </div>
          </div>
          <div className="rounded-lg flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
              <img src={notificationImg} className="object-cover" alt="woman" />
            </div>
            <div className="w-[calc(100%-54px)]">
              <h4 className="whitespace-nowrap w-full font-bold text-base overflow-ellipsis overflow-hidden capitalize">
                Amanda Williams
              </h4>
              <span className="whitespace-nowrap w-full text-sm overflow-ellipsis overflow-hidden">
                Hunterbryan@gmail.com
              </span>
            </div>
          </div>
          <div className="rounded-lg flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
              <img src={notificationImg} className="object-cover" alt="woman" />
            </div>
            <div className="w-[calc(100%-54px)]">
              <h4 className="whitespace-nowrap w-full font-bold text-base overflow-ellipsis overflow-hidden capitalize">
                Ken Dejong
              </h4>
              <span className="whitespace-nowrap w-full text-sm overflow-ellipsis overflow-hidden">
                Hunterbryan@gmail.com
              </span>
            </div>
          </div>
          <div className="rounded-lg flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
              <img src={notificationImg} className="object-cover" alt="woman" />
            </div>
            <div className="w-[calc(100%-54px)]">
              <h4 className="whitespace-nowrap w-full font-bold text-base overflow-ellipsis overflow-hidden capitalize">
                Benjamin Blackburn
              </h4>
              <span className="whitespace-nowrap w-full text-sm overflow-ellipsis overflow-hidden">
                Hunterbryan@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
