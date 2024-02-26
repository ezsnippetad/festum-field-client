import React, { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Modal from "../../Common/Modals/Modal";
import MeetingSidebar from "./MeetingSidebar";
//import { useProfileGets } from "../redux/Slice/profileSlice";

function MeetingMainPage() {
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
                                <MeetingSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MeetingMainPage;
