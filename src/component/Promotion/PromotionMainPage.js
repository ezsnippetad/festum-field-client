import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import notificationImg from "../../assets/images/noti-1.png";
import { useState } from "react";
import {
  listOfNotification,
  useNotificationGetId,
  useNotificationslist,
} from "../../redux/Slice/notificationSlice";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import DeleteNotificationPopUp from "../Popups/DashboardPopup/DeleteNotificationPopUp";
import Modal from "../../Common/Modals/Modal";

const PromotionMainPage = () => {
  const navigate = useNavigate();
  const [isHistory, setIsHistory] = useState(false);
  const [deleteNotificationData, setDeletenotificationData] = useState({})
  const dispatch = useDispatch()
  const notificationslist = useNotificationslist();
  const [tab, setTab] = useState("running") //history
  const [deleteNotification, setDeleteNotification] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleReadMore = (index) => {
        setExpandedItems((prev) => {
            const newExpandedItems = [...prev];
            newExpandedItems[index] = !newExpandedItems[index];
            return newExpandedItems;
        });
  };

  const getNotificationList = async () => {

    const payload = {
      page: 1,
      limit: 10,
      search: "", // can be perform on 'title', 'description','link'
      sortfield: "title", // can be 'title', 'description','link'
      sortoption: 1 // can be 1 (asending) or -1 (descending)
    }
    const response = await dispatch(listOfNotification(payload)).unwrap()

  }
  useEffect(() => {
    getNotificationList()
  }, [dispatch])

  return (
    <>
      <header className="border-b-0 flex font-bold items-center z-50">
        <div className="flex items-center px-5 whitespace-nowrap">
          <h3 className="text-xl xl:text-3xl">
            <Link
              className="icon-back text-chatlook-sky mr-2"
              to={"/dashboard"}
            ></Link>
            Promotion
          </h3>
        </div>
      </header>
      <main>
        <div className="w-full px-5 lg:px-12">
          <div className="flex items-center justify-between xl:justify-center w-full sticky top-0 inset-x-0 bg-white">
            <div className="tab-menu flex items-center space-x-2 py-2 px-2 xl:px-5 bg-chatlook-grayLight rounded-md xl:mx-auto">
              <button
                data-tab="tab_pro_running"
                className={
                  tab == "running"
                    ? "hover:bg-white hover:text-chatlook-sky text-sm font-medium py-1.5 lg:py-2.5 px-3 lg:px-5 rounded-sm uppercase whitespace-nowrap current"
                    : "hover:bg-white hover:text-chatlook-sky text-sm font-medium py-1.5 lg:py-2.5 px-3 lg:px-5 rounded-sm uppercase whitespace-nowrap"
                }
                onClick={() => setTab("running")}
              >
                Running
              </button>
              <button
                data-tab="tab_pro_history"
                className={
                  tab == "history"
                    ? "hover:bg-white hover:text-chatlook-sky text-sm font-medium py-1.5 lg:py-2.5 px-3 lg:px-5 rounded-sm uppercase whitespace-nowrap current"
                    : "hover:bg-white hover:text-chatlook-sky text-sm font-medium py-1.5 lg:py-2.5 px-3 lg:px-5 rounded-sm uppercase whitespace-nowrap"
                }
                onClick={() => setTab("history")}
              >
                history
              </button>
            </div>
            <button
              className="block bg-chatlook-sky text-white uppercase rounded-md py-2.5 px-2 lg:px-3 xl:px-4 text-sm xl:text-lg font-medium xl:absolute xl:right-0"
              onClick={() => navigate("/dashboard/createnotification")}
            >
              Create notification
            </button>
          </div>
          {
            tab == "running" && (
              <>
                <div className="max-w-screen-xl flex  flex-wrap py-5 mx-auto">
                  {notificationslist?.docs?.length > 0 &&
                    notificationslist?.docs?.map((val, index) => {
                      return (
                          <div key={index} className="p-3 w-full md:w-1/2 lg:w-1/3 rounded-md">
                            <div className="h-36 xl:h-44 rounded-md bg-chatlook-grayLight p-3">
                              <img
                                src={val?.imageUrl}
                                alt="noti-1"
                                className="w-full h-full "
                              />
                            </div>
                            <div className="card-text pt-3.5 bg-chatlook-grayLight p-3">
                              <h4 className="text-sm 2xl:text-base mb-1 font-bold">
                                {val?.title}
                              </h4>
                              <p className={`text-xs 2xl:text-sm leading-4 text-chatlook-dark ${expandedItems[index] ? '' : 'line-clamp-3'}`}>
                                {val?.description}
                              </p>
                              <button onClick={() => toggleReadMore(index)} className="text-blue-500 hover:underline focus:outline-none">
                              {expandedItems[index] ? 'Read less' : 'Read more'}
                              </button>
                              <span className="text-xs 2xl:text-sm text-chatlook-sky block">
                                <a>{val.link}</a>
                              </span>
                              <div className="flex flex-wrap  justify-center pt-3 w-full ">
                                <div className="p-1.5  text-xs rounded uppercase font-medium md:w-1/2 w-full">
                                  <button className="border w-full border-chatlook-sky h-10 text-chatlook-sky rounded" onClick={() => { navigate(`/dashboard/editnotification/${val._id}`) }}>
                                    <i className="icon-pencil mr-1"></i>Edit
                                    notification
                                  </button>
                                </div>
                                <div className="p-1.5  text-xs rounded uppercase font-medium md:w-1/2 w-full  ">

                                  <button
                                    className="border w-full  h-10 bg-chatlook-sky text-white text-xs rounded"
                                    onClick={() =>
                                      navigate("/dashboard/promotionplan")
                                    }
                                  >
                                    <i className="icon-promotion mr-2" />
                                    promotion
                                  </button>
                                </div>
                                {/* <button className="flex items-start justify-star p-1.5 border border-red-400 md:w-1/3 w-full text-red-400 text-xs rounded uppercase font-medium" onClick={() => { setDeleteNotification(true); setDeletenotificationData(val) }} >
                                  <Trash2 />
                                  Delete Notification
                                </button> */}
                              </div>
                            </div>
                          </div>
                      );
                    })}
                </div>
              </>
            )
          }

        </div>
        <Modal isOpen={deleteNotification}>
          <DeleteNotificationPopUp deleteNotificationData={deleteNotificationData} handleClose={setDeleteNotification} />
        </Modal>
      </main>
    </>
  );
};

export default PromotionMainPage;
