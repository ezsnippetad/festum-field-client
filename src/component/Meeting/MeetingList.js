import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import socket from '../../socket';
import { useProfileGets } from '../../redux/Slice/profileSlice';
import Woman from "../../assets/images/woman.png";
import { PulseLoader } from 'react-spinners';
import HostMeetingDetails from "./HostMeetingDetails";

function MeetingList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileGets = useProfileGets();
    const outerRefTwo = useRef()
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



    const [lastPage, setLastPage] = useState("");



    const infiniteDatafriendList = async (currentPage) => {
        setLoading(true);
        setLoading(false);
    }

    useEffect(() => {
        infiniteDatafriendList(page);
        return () => {
        };
    }, [page]);


    const handleScroll = useCallback(() => {
        const outerElement = outerRefTwo.current;
        if (outerElement) {
            const { scrollTop, clientHeight, scrollHeight } = outerElement;
            if (scrollTop + clientHeight >= scrollHeight) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }, [outerRefTwo]);




    return (
        <div>
            <div className="h-[calc(100vh-226px)] px-3.5 overflow-y-auto" ref={outerRefTwo} onScroll={handleScroll} id="chats-list">
                <div className="cursor-pointer p-2.5 notifications-box user-box rounded-lg group">
                    <div className="flex items-center space-x-3" onClick={() => {
                        navigate(`/meeting/WswrQew121324`,{ replace: true });
                    }}>
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex overflow-hidden">
                                    <img src={Woman} className="object-cover w-full h-full" alt="woman"/>
                            </div>
                        </div>
                        <div className="w-[calc(100%-54px)] mt-1">
                            <div className="user-name flex justify-between ">
                                <h4 className="whitespace-nowrap overflow-ellipsis overflow-hidden capitalize font-bold">
                                    Mark Wood
                                </h4>
                            </div>
                            <div className="mt-1.5 flex items-center justify-between">
                               <span className="whitespace-nowrap w-[90%] overflow-ellipsis overflow-hidden text-chatlook-gray">
                                   24/01/2024 - 20:10 AM
                               </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeetingList

