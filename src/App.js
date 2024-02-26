import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider";
import VideoProvider from "./context/VideoProvider";
import { Context } from "./createContext";
import "./firebase";
import { getNotificationToken, onMessageListener } from "./firebase";
import {
  listOfNotification,
  useNotification,
} from "./redux/Slice/notificationSlice";
import { listOfProduct } from "./redux/Slice/productSlice";
import { businessProfileGet, profileGet, useProfileGets } from "./redux/Slice/profileSlice";
import { friendsRequest } from "./redux/Slice/requestSlice";
import { ChatNotification } from "./redux/services/toastServices";
import AllRoutes from "./routes/allRoutes";
import NewCreateBusinessProfileTow from "./component/Popups/DashboardPopup/NewCreateBusinessProfileTow";
import NewCreateBusinessProfile from "./component/Popups/DashboardPopup/NewCreateBusinessProfile";
import NewCreatePersonalProfile from "./component/Popups/DashboardPopup/NewCreatePersonalProfile";
import BusinessHourPopup from "./component/Popups/DashboardPopup/BusinessHourPopup";

const App = () => {
  const [rightSidebar, setRightSidebar] = useState("");
  const getProfile = useProfileGets()
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortfield: "title",
    sortoption: 1,
  });
  const [productPagination, setProductPagination] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortfield: "title",
    sortoption: 1,
  });
  const [permissions, setPermissions] = useState({
    fullname: true,
    contactnumber: false,
    email: false,
    dob: false,
    gender: false,
    socialmedia: false,
    videocall: true,
    audiocall: true,
  });
  const notifications = useNotification();

  useEffect(() => {
    getNotificationToken();

    onMessageListener()
      .then((payload) => {
        ChatNotification(payload.notification.title, payload.notification.body);
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  const dispatch = useDispatch();
  document.querySelector("body")?.classList.add("app");

  const context = useMemo(
    () => ({
      rightSidebarToggle: (data) => {
        setRightSidebar(data);
      },
      productListApi: async () => {
        try {
          if (getProfile?.is_business_profile_created) {
            let payload = productPagination;
            await dispatch(listOfProduct(payload)).unwrap();
          }
        } catch (error) {
          console.log(error);
        }
      },
      notificationList: async () => {
        try {
          let payload = pagination;
          const response = await dispatch(listOfNotification(payload)).unwrap();
        } catch (error) {
          console.log(error);
        }
      },
      personalProfileGetApi: async () => {
        try {
          await dispatch(profileGet()).unwrap();
        } catch (error) {
          console.log(error);
        }
      },
      businessProfileGetApi: async () => {
        try {
          if (getProfile?.is_business_profile_created) {
            await dispatch(businessProfileGet()).unwrap();

          }
        } catch (error) {
          console.log(error, "err");
        }
      },
      // allFriendsRequest: async () => {
      //   const payload = filter;
      //   try {
      //     const response = await dispatch(friendsRequest(payload)).unwrap();
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
      data: rightSidebar,
      setPagi: setPagination,
      pagi: pagination,
      productPagi: productPagination,
      setProductPagi: setProductPagination,
      permissions,
      setPermissions,
    }),
    [rightSidebar, pagination, productPagination, permissions]
  );

  return (
    <React.Fragment>
      <BrowserRouter>
        <Context.Provider value={context}>
          <SocketProvider>
              <AllRoutes />
          </SocketProvider>
        </Context.Provider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
