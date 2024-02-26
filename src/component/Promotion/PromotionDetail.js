import React from "react";
import notificationImg from "../../assets/images/noti-1.png";
import { useState } from "react";
import Modal from "../../Common/Modals/Modal";
import PeopleSeenModal from "../Popups/DashboardPopup/PeopleSeenModal";
import { useNavigate } from "react-router-dom";

export default function PromotionDetail() {
  const [isSeenModalOpen, setIsSeenModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <main className="relative h-screen">
        <div className="py-10 px-5 lg:px-12">
          {/* <!-- back button  --> */}
          <div className="pb-8 flex items-center space-x-3">
            <div
              className="icon-back text-chatlook-sky text-3xl inline-block"
              onClick={() => navigate(-1)}
            ></div>
            <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
              Your Promotion Bill
            </h4>
          </div>
          {/* <!-- edit area  --> */}
          <div className="relative pt-7">
            {/* <!-- ads details  --> */}
            <div className="w-full">
              <div className="relative rounded-md overflow-hidden h-44">
                <img
                  src={notificationImg}
                  className="w-full h-full object-cover"
                  alt="notification-banner"
                />
              </div>
              <div className="w-full mt-10">
                <h2>New Prodcut Offer</h2>
                <p className="text-base mt-3">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour.
                </p>
              </div>
              <div className="flex flex-wrap -mx-3 mt-2">
                <div className="w-full lg:w-1/2 p-3">
                  <ul className="max-w-sm space-y-4">
                    <li className="flex items-center">
                      <h2 className="text-base text-chatlook-dark w-full max-w-[120px]">
                        Notification
                      </h2>
                      <span className="text-sm font-bold pl-5 md:pl-14">
                        Sent to 180 People
                      </span>
                    </li>
                    <li className="flex items-center">
                      <h2 className="text-base text-chatlook-dark w-full max-w-[120px]">
                        SMS
                      </h2>
                      <span className="text-sm font-bold pl-5 md:pl-14">
                        Sent to 150 People
                      </span>
                    </li>
                    <li className="flex items-center">
                      <h2 className="text-base text-chatlook-dark w-full max-w-[120px]">
                        Email
                      </h2>
                      <span className="text-sm font-bold pl-5 md:pl-14">
                        Sent to 80 People
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-1/2 p-3">
                  <div className="flex items-center lg:justify-end space-x-3 ml-auto">
                    <ul className="-space-x-5 flex">
                      <li className="w-9 h-9 rounded-full border border-white overflow-hidden">
                        <img
                          src={notificationImg}
                          className="w-full h-full object-cover"
                          alt="pro-1"
                        />
                      </li>
                      <li className="w-9 h-9 rounded-full border border-white overflow-hidden">
                        <img
                          src={notificationImg}
                          className="w-full h-full object-cover"
                          alt="pro-1"
                        />
                      </li>
                      <li className="w-9 h-9 rounded-full border border-white overflow-hidden">
                        <img
                          src={notificationImg}
                          className="w-full h-full object-cover"
                          alt="pro-1"
                        />
                      </li>
                      <li className="w-9 h-9 rounded-full border border-white overflow-hidden">
                        <img
                          src={notificationImg}
                          className="w-full h-full object-cover"
                          alt="pro-1"
                        />
                      </li>
                      <li className="w-9 h-9 rounded-full border border-white overflow-hidden">
                        <img
                          src={notificationImg}
                          className="w-full h-full object-cover"
                          alt="pro-1"
                        />
                      </li>
                    </ul>
                    <h2 className="text-base text-chatlook-dark font-bold cursor-pointer">
                      <span
                        className="text-chatlook-sky text-base font-bold"
                        onClick={() => setIsSeenModalOpen(true)}
                      >
                        150 People
                      </span>{" "}
                      Seen Notification
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal isOpen={isSeenModalOpen}>
        <PeopleSeenModal
          handleClose={setIsSeenModalOpen}
          isCouponModalOpen={isSeenModalOpen}
        />
      </Modal>
    </div>
  );
}
