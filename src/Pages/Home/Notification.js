import React, { useContext, useEffect, useState } from "react";
import Woman from "../../assets/images/woman.png";
import NotificationPreview from "../../assets/images/noti-1.png";
import HeaderDashboard from "../../Common/HeaderDashboard";
import {
  listOfNotification,
  useNotification,
  useNotificationslist,
} from "../../redux/Slice/notificationSlice";
import { useDispatch } from "react-redux";
import { Context } from "../../createContext";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

function Notification() {
  const dispatch = useDispatch();
  const { notificationList, pagi, setPagi } = useContext(Context);
  const notifi = useNotification();
  const notificationslist = useNotificationslist();
  useEffect(() => {
    notificationList();
  }, [pagi]);

  return (
    <>
      <HeaderDashboard />
      <main>
        <div className="relative">
          <div className="py-7 md:p-7 md:px-3.5">
            <div className="w-full px-5 lg:px-12 mx-auto space-y-7">
              <div className="flex items-center">
                <span className="text-4xl w-14 h-14 flex items-center justify-center bg-chatlook-sky shadow rounded-full text-[#8094ae] mr-3">
                  <i className="icon-notification text-white"></i>
                </span>
                <div>
                  <h4 className="mt-1 text-2xl xl:text-3xl text-chatlook-dark font-bold">
                    Notifications
                  </h4>
                  <span className="text-sm block">Advertisement</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-holdr h-[calc(100vh-192px)] overflow-y-auto">
            <PerfectScrollbar
              onScrollY={(container) => {
                console.log(
                  container.scrollHeight - container.scrollTop,
                  "containercontainer",
                );

                if (container.scrollTop === 0) {
                  if (notificationslist?.totalPages !== pagi?.page) {
                    setPagi({ ...pagi, limit: pagi.limit + 10 });
                  }
                }
              }}
            >
              <div className="chatting-bar py-7 md:p-7 md:px-3.5">
                <div className="w-full px-5 lg:px-12 mx-auto space-y-7">
                  <div className="relative py-2">
                    <hr />
                    <span className="absolute left-1/2 -translate-x-1/2 -mt-1.5 bg-white">
                      Today
                    </span>
                  </div>
                  {notificationslist?.docs &&
                    notificationslist.docs?.map((val) => {
                      return (
                        <>
                          <div className="max-w-[500px]">
                            <div className="hidden md:flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-slate-200 flex mb-2 overflow-hidden">
                                <img
                                  src={val.imageUrl}
                                  className="object-cover w-full h-full"
                                  alt="woman"
                                />
                              </div>
                              <div className="w-[calc(100%-52px)]">
                                <h4 className="text-[16px]">{val.title}</h4>
                                <div className="flex items-center justify-between mt-1">
                                  <span>Latte Cafe</span>
                                  <span>10:03</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-3 bg-chatlook-grayLight rounded-r-md rounded-bl-md mt-1">
                              <div className="img-card rounded-md min-h-[280px] max-h-80 overflow-hidden">
                                <img
                                  src={val.imageUrl}
                                  alt="noti-1"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="card-text pt-3.5 space-y-3">
                                <h4 className="text-[16px]">{val.title}</h4>
                                <p className="text-[14px] leading-4 text-chatlook-dark">
                                  {val.description}
                                </p>
                                <span className="text-chatlook-sky block">
                                  <a>{val.link}</a>
                                </span>
                                <div className="flex justify-end">
                                  <button className="py-1 px-3 bg-chatlook-sky text-white text-[12px] rounded-sm">
                                    message
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </main>
    </>
  );
}

export default Notification;
