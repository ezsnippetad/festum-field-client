import React from "react";
import { Route, Routes } from "react-router-dom";
import BusinessChat from "../Pages/Home/BusinessChat";
import Home from "../Pages/Home/Home";
import Notification from "../Pages/Home/Notification";
import SingleChat from "../Pages/Home/SingleChat";
import Status from "../Pages/Home/Status";
import LandingPage from "../Pages/LandingPage/LandingPage";
import EditBusinessProfile from "../Pages/Profile/EditBusinessProfile";
import EditProduct from "../Pages/Profile/EditProduct";
import EditProfile from "../Pages/Profile/EditProfile";
import FindFriends from "../Pages/Profile/FindFriends";
import FriendRequest from "../Pages/Profile/FriendRequest";
import MyReels from "../Pages/Profile/MyReels";
import OurProducts from "../Pages/Profile/OurProducts";
import Profile from "../Pages/Profile/Profile";
import App from "../component/App";
import AddNewProduct from "../component/Products/AddNewProduct";
import AddProduct from "../component/Products/AddProduct";
import NewProductList from "../component/Products/NewProductList";
import NewSingleProduct from "../component/Products/NewSingleProduct";
import ProductsDetails from "../component/Products/ProductsDetails";
import BillDetails from "../component/Promotion/BillDetails";
import ChooseUser from "../component/Promotion/ChooseUser";
import CreateNotification from "../component/Promotion/CreateNotification";
import PaymentSuccessful from "../component/Promotion/PaymentSuccessful";
import PromotionBill from "../component/Promotion/PromotionBill";
import PromotionDetail from "../component/Promotion/PromotionDetail";
import PromotionMainPage from "../component/Promotion/PromotionMainPage";
import PromotionPlan from "../component/Promotion/PromotionPlan";
import PublishingPage from "../component/Promotion/PublishingPage";
import SelectPackage from "../component/Promotion/SelectPackage";
import GroupVideoCall from "../component/VideoCall/GroupVideoCall";
import Login from "../component/auth/Login";
import Otp from "../component/auth/Otp";
import { useVerifyOtp } from "../component/auth/authSlice";
import ErrorPage from "../Pages/Home/ErrorPage";
import FriendSingleChat from "../Pages/Home/FriendSingleChat";
import NewOtp from "../component/auth/NewOtp";
import NewAddProduct from "../component/Products/NewAddProduct";
import NewAddNewProduct from "../component/Products/NewAddNewProduct";
import NewProductDetails from "../component/Products/NewProductDetails";
import MeetingMainPage from "../component/Meeting/MeetingMainPage";
import HostMeetingDetails from "../component/Meeting/HostMeetingDetails";
import PastMeetingDetails from "../component/Meeting/PastMeetingDetails";
import JoinMeetingDetails from "../component/Meeting/JoinMeetingDetails";
import ChatPin from "../component/ChatHideLock/ChatPin";
import CallHistory from "../component/Sidebar/CallHistory";
import CallHistoryPage from "../component/Call/CallHistoryPage";

const AllRoutes = () => {
  const verifyOtps = useVerifyOtp();
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        {verifyOtps && (
          <>
            <Route exact path="/grpVideo" element={<GroupVideoCall />} />

            {/* <Route path="/login" element={<Login />} />
            <Route path="verify" element={<NewOtp />} /> */}
            <Route path="chat/pin/:type" element={<ChatPin />} />
            {/* <Route path="verify" element={<NewOtp />} /> */}
            <Route path={""} element={<App />}>
              <Route path="dashboard" element={<Home />} />
              {/* <Route path="product" element={<AddProduct />} />"" */}
              <Route path="product" element={<NewAddProduct />} />
              {/* <Route
                path="product/addnewproduct/:isedit"
                element={<AddNewProduct />}
              /> */}
              <Route
                path="product/addnewproduct/:isedit"
                element={<NewAddNewProduct />}
              />
              {/* <Route
                path="product/productdetails/:id"
                element={<ProductsDetails />}
              />  */}
              <Route
                path="product/productdetails/:id"
                element={<NewProductDetails />}
              />
              <Route
                path="/dashboard/notification"
                element={<Notification />}
              />
              <Route path="/dashboard/status" element={<Status />} />
              {/* <Route path="/dashboard/calllog" element={<CallLog />} /> */}
              <Route
                path="/dashboard/chats/chatdetails"
                element={<SingleChat />}
              />
              <Route
                path="/dashboard/chats/chatdetails/:id"
                element={<SingleChat />}
              />
              {/* <Route
                path="/dashboard/chats/chatdetails/:id"
                element={<FriendSingleChat />}
              /> */}
              <Route
                path="/dashboard/chats/businesschat"
                element={<BusinessChat />}
              />
              <Route
                path="/dashboard/chats/newbroadcastchat"
                element={<SingleChat />}
              />
              <Route path="dashboard/profile" element={<Profile />} />

              <Route path="dashboard/myreels" element={<MyReels />} />
              <Route
                path="dashboard/profile/editprofile"
                element={<EditProfile />}
              />
              <Route
                path="dashboard/profile/business/:id"
                element={<EditBusinessProfile />}
              />
              <Route
                path="/dashboard/profile/products"
                element={<OurProducts />}
              />
              <Route
                path="/dashboard/profile/products/editproduct"
                element={<EditProduct />}
              />
              <Route
                path="/dashboard/profile/ourproductslist/editproductlist/:id"
                element={<EditProduct />}
              />
              <Route path="/dashboard/findfriends" element={<FindFriends />} />
              <Route
                path="/dashboard/friendrequest"
                element={<FriendRequest />}
              />
              <Route
                path="/dashboard/promotions"
                element={<PromotionMainPage />}
              />
              <Route
                path="/dashboard/createnotification"
                element={<CreateNotification />}
              />
              <Route
                path="/dashboard/editnotification/:id"
                element={<CreateNotification />}
              />
              <Route
                path="/dashboard/promotionplan"
                element={<PromotionPlan />}
              />
              <Route path="/dashboard/promoteuser" element={<ChooseUser />} />
              <Route
                path="/dashboard/selectpackage"
                element={<SelectPackage />}
              />
              <Route
                path="/dashboard/publishing"
                element={<PublishingPage />}
              />
              <Route path="/dashboard/billing" element={<PromotionBill />} />
              <Route
                path="/dashboard/payment"
                element={<PaymentSuccessful />}
              />
              <Route
                path="/dashboard/promotionbilldetails"
                element={<BillDetails />}
              />
              <Route
                path="/dashboard/promotiondetails"
                element={<PromotionDetail />}
              />
              <Route
                path="/dashboard/newproductslist"
                element={<NewProductList />}
              />
              <Route
                path="/dashboard/newsingleproduct/:id"
                element={<NewSingleProduct />}
              />
              <Route path="/dashboard/broacast/:id" />

              <Route path="promotion">
                <Route index element={<PromotionMainPage />} />
                <Route
                  path="createnotification"
                  element={<CreateNotification />}
                />
                <Route path="promotionplan" element={<PromotionPlan />} />
              </Route>
            </Route>
            <Route path="callhistory">
              <Route path=":id" element={<CallHistoryPage />} />
            </Route>
            <Route path="meeting" element={<MeetingMainPage />}>
              <Route path="/meeting/:id" element={<HostMeetingDetails />} />
              <Route path="/meeting/past/:id" element={<PastMeetingDetails />} />
              <Route path="/meeting/join/:id" element={<JoinMeetingDetails />} />
            </Route>
          </>
        )
        }
        <Route path="verify" element={<NewOtp />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
