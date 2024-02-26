import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from 'react-redux';
import socket from '../../socket';
import {useProfileGets} from '../../redux/Slice/profileSlice';
import Woman from "../../assets/images/woman.png";
import {PulseLoader} from 'react-spinners';

function PastMeetingDetails() {
    const dispatch = useDispatch();
    const profileGets = useProfileGets();
    const {id} = useParams();

    return (
        <main className="w-full overflow-auto">
            <div className="relative flex flex-col justify-between h-full px-12">
                <div className="w-full flex items-center sticky top-0 z-20 bg-white py-5">
                    <div className="w-full flex items-center space-x-3 cursor-pointer">
                        <div className="w-14 h-14 rounded-full bg-slate-200 flex overflow-hidden">
                            <img className="object-cover w-full h-full rounded-full"
                                 src="https://festumfield.s3.ap-south-1.amazonaws.com/659f72c66bfb074b2f73e45e/profile/IMG/IMG-47477033952104897.jpeg"
                                 alt="Profile pic"/>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center">
                                <h4 className="mt-1 text-2xl xl:text-3xl text-chatlook-dark font-bold capitalize">Mark
                                    Wood</h4>
                                <div className="flex items-center space-x-8 ml-auto">
                                    <span className="">28/01/2024</span>
                                    <span className="">08:30 PM</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="text-chatlook-gray text-sm">35 Participate</span>
                                <div className="flex items-center ml-auto">
                                    <span className="">00:50</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="details-holder h-full overflow-y-auto">
                    <div className="w-full border-b pb-5">
                        <div className="chat rounded-md">
                            <div className="flex items-center space-x-3 cursor-pointer">
                                <div className="w-14 h-14 rounded-full bg-slate-200 flex overflow-hidden">
                                    <img className="object-cover w-full h-full rounded-full"
                                         src="https://festumfield.s3.ap-south-1.amazonaws.com/659f72c66bfb074b2f73e45e/profile/IMG/IMG-47477033952104897.jpeg"
                                         alt="Profile pic"/>
                                </div>
                                <div><h6 class="mt-1 text-chatlook-dark font-bold capitalize pb-1">Mark Wood</h6><span
                                    class="text-chatlook-gray text-sm block">Host Meeting</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pt-5 pb-5">
                        <div className="chat rounded-md">
                            <div className="flex items-center space-x-3 cursor-pointer">
                                <div className="w-14 h-14 rounded-full bg-slate-200 flex overflow-hidden">
                                    <img className="object-cover w-full h-full rounded-full"
                                         src="https://festumfield.s3.ap-south-1.amazonaws.com/659f72c66bfb074b2f73e45e/profile/IMG/IMG-47477033952104897.jpeg"
                                         alt="Profile pic"/>
                                </div>
                                <div><h6 class="mt-1 text-chatlook-dark font-bold capitalize pb-1">Hunter Bryan</h6><span
                                    class="text-chatlook-gray text-sm block">Lorem ipsum dollar</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pb-5">
                        <div className="chat rounded-md">
                            <div className="flex items-center space-x-3 cursor-pointer">
                                <div className="w-14 h-14 rounded-full bg-slate-200 flex overflow-hidden">
                                    <img className="object-cover w-full h-full rounded-full"
                                         src="https://festumfield.s3.ap-south-1.amazonaws.com/659f72c66bfb074b2f73e45e/profile/IMG/IMG-47477033952104897.jpeg"
                                         alt="Profile pic"/>
                                </div>
                                <div><h6 class="mt-1 text-chatlook-dark font-bold capitalize pb-1">Hunter Bryan</h6><span
                                    class="text-chatlook-gray text-sm block">Lorem ipsum dollar</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pb-5">
                        <div className="chat rounded-md">
                            <div className="flex items-center space-x-3 cursor-pointer">
                                <div className="w-14 h-14 rounded-full bg-slate-200 flex overflow-hidden">
                                    <img className="object-cover w-full h-full rounded-full"
                                         src="https://festumfield.s3.ap-south-1.amazonaws.com/659f72c66bfb074b2f73e45e/profile/IMG/IMG-47477033952104897.jpeg"
                                         alt="Profile pic"/>
                                </div>
                                <div><h6 class="mt-1 text-chatlook-dark font-bold capitalize pb-1">Hunter Bryan</h6><span
                                    class="text-chatlook-gray text-sm block">Lorem ipsum dollar</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pb-5">
                        <div className="chat rounded-md">
                            <div className="flex items-center space-x-3 cursor-pointer">
                                <div className="w-14 h-14 rounded-full bg-slate-200 flex overflow-hidden">
                                    <img className="object-cover w-full h-full rounded-full"
                                         src="https://festumfield.s3.ap-south-1.amazonaws.com/659f72c66bfb074b2f73e45e/profile/IMG/IMG-47477033952104897.jpeg"
                                         alt="Profile pic"/>
                                </div>
                                <div><h6 class="mt-1 text-chatlook-dark font-bold capitalize pb-1">Hunter Bryan</h6><span
                                    class="text-chatlook-gray text-sm block">Lorem ipsum dollar</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default PastMeetingDetails