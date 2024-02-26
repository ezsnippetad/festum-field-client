import React, { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Modal from "../Common/Modals/Modal";
import CreateYourProfile from "./Popups/DashboardPopup/CreateYourProfile";
import ProductSidebar from "./ProductSidebar/ProductSidebar";
import Sidebar from "./Sidebar/Sidebar";
import { useProfileGets } from "../redux/Slice/profileSlice";

function App() {
  const params = useParams();
  const location = useLocation();
  document.querySelector("body")?.classList.remove("login-img", "landing-page", "horizontal");
  document.querySelector("body")?.classList.add("app", "sidebar-mini", "ltr", "light-mode");

  return (
    <div>
      <div className="horizontalMenucontainer">
        <div className="page">
          <div className="page-main">
            <div className="sticky">
              {location.pathname == "/product" ||
                location.pathname == "/product/addnewproduct/true" ||
                location.pathname == "/product/addnewproduct/false" ||
                location.pathname == `/product/productdetails/${params.id}` ? (
                <ProductSidebar />
              ) : (
                <Sidebar />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
