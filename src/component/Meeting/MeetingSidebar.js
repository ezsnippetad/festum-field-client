import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, Link } from "react-router-dom";
import socket from '../../socket';
import Modal from "../../Common/Modals/Modal";
import Woman from "../../assets/images/woman.png";
import { Context } from "../../createContext";
import { useNotificationslist } from "../../redux/Slice/notificationSlice";
import { profileGet, useProfileGets } from "../../redux/Slice/profileSlice";
import MeetingList from "./MeetingList";
import JoinMeetingList from "./JoinMeetingList";
import PastMeetingList from "./PastMeetingList";
import CreateNewMeeting from "./Popups/CreateNewMeeting";
import CreateNewMeetingMember from "./Popups/CreateNewMeetingMember";
import { PulseLoader } from "react-spinners";
import store from "../../redux/store";

function MeetingSidebar() {
    //const { socket } = useSocket();
    //const { data, notificationList, allFriendsRequest, rightSidebarToggle } = useContext(Context);
    const navigate = useNavigate();

    const [csc, setCsc] = useState("host");
    const [isNewMeetingPopUpOpen, setIsNewMeetingPopUpOpen] = useState(false);
    const [isCreateNewMeetingMemberPopUpOpen, setIsCreateNewMeetingMemberPopUpOpen] = useState(false);
    const handleSubmit = (term) => {
        console.log("print on parent");
        console.log(term);
        setIsNewMeetingPopUpOpen(false);
        setIsCreateNewMeetingMemberPopUpOpen(true);
    };

    return (
        <>
        <div className="flex items-start overflow-hidden main h-screen">

            <aside className="flex flex-col h-full">
                <div className="">
                    <div className="px-3.2 bg-white border-b bg-white">
                        <header className="border-b-0 flex font-bold items-center z-50">
                            <div className="flex items-start whitespace-nowrap">
                                <h3 className="text-xl xl:text-2xl">
                                    <Link
                                        className="icon-back text-chatlook-sky mr-2"
                                        to={"/dashboard"}
                                    ></Link>
                                    Meetings
                                </h3>
                            </div>
                        </header>
                    </div >

                    < div className="aside-tabs w-full px-3.5 py-4" >
                        {/* <!-- tab-header  --> */}
                        <div div className="tab-menu flex justify-between p-[10px]  bg-chatlook-grayLight rounded-md" >
                            <div onClick={() => {setCsc("host");}}
                                className={
                                    csc === "host"
                                        ? "py-2 px-5 bg-white text-chatlook-sky text-sm w-1/2 cursor-pointer font-bold text-center uppercase shadow rounded-md "
                                        : "py-2 px-5 text-sm font-bold uppercase cursor-pointer w-1/2 text-center"
                                }
                            >
                                host
                            </div>
                            <div
                                onClick={() => { setCsc("join"); }}
                                className={
                                    csc === "join"
                                        ? "py-2 px-5 bg-white text-chatlook-sky text-sm font-bold uppercase shadow rounded-md"
                                        : "py-2 px-5 text-sm font-bold uppercase cursor-pointer"
                                }
                            >
                                join
                            </div>
                            <div
                                onClick={() => { setCsc("past"); }}
                                className={
                                    csc === "past"
                                        ? "py-2 px-5 bg-white text-chatlook-sky text-sm  w-1/2 text-center font-bold uppercase shadow rounded-md"
                                        : "py-2 px-5 text-sm font-bold uppercase  w-1/2 text-center  cursor-pointer"
                                }
                            >
                                past
                            </div>
                        </div >
                    </div >
                </div>
                {/* <!-- all tabs --> */}
                <div>
                    {(
                        <>
                        <div className="w-full ">
                            <div className="tab-holder ">
                                <div className="chats-holder" id="chats">
                                    {csc === "host" && (
                                        <>
                                        <MeetingList/>
                                        </>
                                    )}
                                    {csc === "join" && (
                                        <>
                                        <JoinMeetingList/>
                                        </>
                                    )}
                                    {csc === "past" && (
                                        <>
                                        <PastMeetingList/>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </aside >
            <div id="main-content" className="main-content h-full overflow-auto">
                <header className="">
                    <div className="flex justify-end items-center w-full">
                        <button onClick={() => setIsNewMeetingPopUpOpen(true)} className="inline-block bg-white text-chatlook-sky border border-chatlook-sky rounded-md px-3.5 py-2.5 text-sm font-medium">
                            <span className="icon-plus text-chatlook-sky"></span> Add New Meeting
                        </button>
                    </div>
                </header>

                <Outlet />
            </div>
        </div>
        <Modal isOpen={isNewMeetingPopUpOpen}>
            <CreateNewMeeting handleClose={setIsNewMeetingPopUpOpen} onPressingEnter={handleSubmit}/>
        </Modal>
        <Modal isOpen={isCreateNewMeetingMemberPopUpOpen}>
            <CreateNewMeetingMember handleClose={setIsCreateNewMeetingMemberPopUpOpen}/>
        </Modal>
        </>
    );
}

export default MeetingSidebar;
