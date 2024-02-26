import React, { useState } from "react";
import Woman from "../../assets/images/woman.png";
import Profile from "../../assets/images/profile.png";
import noti1 from "../../assets/images/noti-1.png";
import Modal from "../../Common/Modals/Modal";
import VoiceCallPopUp from "../../component/Popups/DashboardPopup/VoiceCallPopUp";
import VideoCallPopUp from "../../component/Popups/DashboardPopup/VideoCallPopUp";
import IncomingCallPopUp from "../../component/Popups/DashboardPopup/IncomingCall";
import HeaderDashboard from "../../Common/HeaderDashboard";

export default function CallLog() {
  const [isAudioCallPopUpOpen, setIsAudioCallPopUpOpen] = useState(false);
  const [isVideoCallPopUpOpen, setIsVideoCallPopUpOpen] = useState(false);
  const [isAudioCallFullScreenPopUpOpen, setIsAudioCallFullScreenPopUpOpen] =
    useState(false);
  const [isVideoCallPopUpFullScreenOpen, setIsVideoCallFullScreenPopUpOpen] =
    useState(false);

  return (
    <>
      <HeaderDashboard />
      <main>
        <div className="relative">
          {/* <!-- PROFILEMENU  --> */}
          <div className="w-full flex items-center relative py-3 px-5 lg:px-12">
            {/* <!-- profile-btn  --> */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onclick="addFunction1('right-side', 'personal');addFunction1('main-content', 'resize');"
            >
              <div className="w-14 h-14 rounded-full bg-slate-200 flex overflow-hidden">
                <img src={Woman} className="object-cover" alt="woman" />
              </div>
              <div>
                <h4 className="mt-1 text-2xl xl:text-3xl text-chatlook-dark font-bold">
                  Hunter Bryan
                </h4>
                <span className="text-chatlook-sky text-sm block">Online</span>
              </div>
            </div>
            {/* <!-- video & call btn  --> */}
            <div className="flex items-center space-x-3 ml-auto relative">
              <span
                className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky shadow rounded-full text-[#8094ae] cursor-pointer"
                onClick={() => setIsVideoCallPopUpOpen(true)}
              >
                <i className="icon-video-calling"></i>
              </span>
              <span
                className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky shadow rounded-full text-[#8094ae] cursor-pointer"
                onClick={() => setIsAudioCallPopUpOpen(true)}
              >
                <i className="icon-phone-calling" aria-hidden="true"></i>
              </span>
            </div>
            {/* <!-- voice-call-pop  --> */}
            <div
              id="call-pop"
              className="absolute top-full shadow-one right-5 z-20 space-y-5 bg-white min-w-[375px] rounded-lg py-10"
            >
              <div className="w-28 h-28 border-4 border-white rounded-full mx-auto overflow-hidden flex justify-center">
                <img src="../assest/images/user.png" alt="user" />
              </div>
              <div className="user-name text-center space-y-2">
                <h3 className="">John Hosier</h3>
                <h4 className="text-chatlook-gray font-light">Ringing...</h4>
              </div>
              <div className="flex space-x-3 justify-center call-btns">
                <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg">
                  <i className="icon-video-calling" aria-hidden="true"></i>
                </span>
                <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
                  <i className="icon-speaker" aria-hidden="true"></i>
                </span>
                <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
                  <i className="icon-mute" aria-hidden="true"></i>
                </span>
                <span
                  className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red rounded-lg hover:bg-chatlook-red"
                >
                  <i
                    className="icon-disconnect-call text-white"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              <span
                className="icon-full-screen text-xl absolute right-5 top-0 cursor-pointer"
              ></span>
              <span
                className="icon-zoom-out text-xl absolute right-5 top-0 cursor-pointer hidden"
              ></span>
            </div>
            {/* <!-- .video-call-pop  --> */}
            <div
              id="video-pop"
              className="absolute top-full shadow-one right-5 z-50 space-y-5 bg-white min-w-[375px] rounded-lg py-10 overflow-hidden"
            >
              <div className="w-28 h-28 border-4 border-white rounded-full mx-auto overflow-hidden flex justify-center">
                <img src="../assest/images/user.png" alt="user" />
              </div>
              <div className="user-name text-center space-y-2">
                <h3 className="text-white">John Hosier</h3>
                <h4 className="text-white font-light">Ringing...</h4>
              </div>
              <div
                className="absolute inset-0 w-full h-full -z-10"
                style={{ marginTop: "0" }}
              >
                <img
                  src="../assest/images/product.png"
                  className="object-cover w-full h-full blur-sm"
                  alt="product"
                />
                <div className="absolute w-full h-full inset-0 bg-chatlook-dark opacity-60"></div>
              </div>
              <div className="flex space-x-3 justify-center call-btns">
                <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight text-chatlook-gray rounded-lg">
                  <i className="icon-video-calling" aria-hidden="true"></i>
                </span>
                <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
                  <i className="icon-speaker" aria-hidden="true"></i>
                </span>
                <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-grayLight text-chatlook-gray rounded-lg">
                  <i className="icon-mute" aria-hidden="true"></i>
                </span>
                <span
                  className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red text-chatlook-gray rounded-lg hover:bg-chatlook-red"
                >
                  <i
                    className="icon-disconnect-call text-white"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              <div className="absolute right-5 top-0 screen-resize">
                <span
                  className="icon-full-screen text-xl cursor-pointer"
                ></span>
                <span
                  className="icon-zoom-out text-xl cursor-pointer hidden"
                ></span>
              </div>
            </div>
            {/* <!-- start-video-pop  -->      */}
            <div
              id="start-video-pop"
              className="absolute top-full shadow-one right-5 z-20 bg-white min-w-[375px] rounded-lg overflow-hidden"
            >
              <div className="start-video">
                <div className="w-50">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/0BrcdIzMzUQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen=""
                  ></iframe>
                </div>
                <div className="w-50">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/0BrcdIzMzUQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen=""
                  ></iframe>
                </div>
              </div>
              <div className="flex space-x-3 justify-center call-btns absolute bottom-3 w-full">
                <span className="text-xl w-10 h-10 flex items-center justify-center bg-gray-200 text-chatlook-gray rounded-lg">
                  <i className="icon-message" aria-hidden="true"></i>
                </span>
                <span className="text-xl w-10 h-10 flex items-center justify-center bg-gray-200 text-chatlook-gray rounded-lg">
                  <i className="icon-video-calling" aria-hidden="true"></i>
                </span>
                <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-gray-200 text-chatlook-gray rounded-lg">
                  <i className="icon-camera-rotate" aria-hidden="true"></i>
                </span>
                <span className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-gray-200 text-chatlook-gray rounded-lg">
                  <i className="icon-mute" aria-hidden="true"></i>
                </span>
                <span
                  className="text-xl w-10 h-10 flex items-center justify-center shadow  bg-chatlook-red text-chatlook-gray rounded-lg hover:bg-chatlook-red"
                >
                  <i
                    className="icon-disconnect-call text-white"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              <div className="absolute right-5 top-5 screen-resize">
                <span
                  className="icon-full-screen text-xl cursor-pointer"
                ></span>
                <span
                  className="icon-zoom-out text-xl cursor-pointer hidden"
                ></span>
              </div>
            </div>
          </div>
          {/* <!-- chat-AREA  --> */}
          <div className="chat-holdr h-[calc(100vh-235px)] overflow-y-auto">
            <div className="chatting-bar py-7 md:p-7 md:px-3.5">
              <div className="w-[90%] xl:w-[80%] mx-auto space-y-7">
                <div className="massge-left w-[80%] lg:w-[60%]">
                  <div className="max-w-max">
                    <p className="chat p-3.5 bg-chatlook-grayLight rounded-md">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humor, or randomised words which
                      don't look even slightly believable.{" "}
                    </p>
                    <div className="text-right mt-1">
                      <span className="flex items-center justify-end">
                        10:03 <i className="ml-1 icon-massage-send text-lg"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="massge-left w-[80%] lg:w-[60%]">
                  <div className="max-w-max">
                    <p className="chat p-3.5 bg-chatlook-grayLight rounded-md">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humor, or randomised words which
                      don't look even slightly believable.{" "}
                    </p>
                    <div className="text-right mt-1">
                      <span className="flex items-center justify-end">
                        10:03 <i className="ml-1 icon-massage-send text-lg"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="massge-right w-[80%] lg:w-[60%] ml-auto">
                  <div className="max-w-max ml-auto">
                    <p className="chat p-3.5 bg-chatlook-skyLight rounded-md">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humor, or randomised words which
                      don't look even slightly believable.{" "}
                    </p>
                    <div className="text-right mt-1">
                      <span className="flex items-center justify-end">
                        10:03 <i className="ml-1 icon-massage-send text-lg"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="massge-right w-[80%] lg:w-[60%] ml-auto">
                  <div className="max-w-max ml-auto">
                    <p className="chat p-3.5 bg-chatlook-skyLight rounded-md">
                      There are many{" "}
                    </p>
                    <div className="text-right mt-1">
                      <span className="flex items-center justify-end">
                        10:03 <i className="ml-1 icon-massage-send text-lg"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative py-2">
                  <hr />
                  <span className="absolute left-1/2 -translate-x-1/2 -mt-1.5 px-3 bg-white">
                    Today
                  </span>
                </div>
                <div className="massge-left w-[80%] lg:w-[60%]">
                  <div className="max-w-max">
                    <div className="chat p-3.5 bg-chatlook-grayLight rounded-md">
                      <img src={noti1} alt="noti-1" />
                    </div>
                    <div className="text-right mt-1">
                      <span className="flex items-center justify-end">
                        10:03 <i className="ml-1 icon-massage-send text-lg"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- chat-input  --> */}
          <div className="w-full bg-white border-t border-chatlook-grayLight py-3">
            <div className="w-[90%] xl:w-[80%] mx-auto flex items-center space-x-3 px-4">
              <label
                for="#type-massage"
                className="chat-input px-3 py-2 flex space-x-3 items-center rounded-full border border-chatlook-grayLight w-[calc(100%-104px)] relative"
              >
                <i className="icon-smile text-xl"></i>
                <input
                  type="text"
                  name="Start a new massage"
                  className="w-full"
                  placeholder="Start a new message"
                  id="type-massage"
                />
                <div className="btns absolute left-full">
                  <div className="flex items-center space-x-3 ml-auto call">
                    <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight shadow rounded-full text-[#8094ae] cursor-pointer">
                      <i className="icon-camera"></i>
                    </span>
                    <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-grayLight shadow rounded-full text-[#8094ae] cursor-pointer relative overflow-hidden">
                      <input
                        type="file"
                        className="absolute top-0 bottom-0 w-full h-full opacity-0"
                      />
                      <i className="icon-image" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="ml-auto hidden send">
                    <span className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky shadow rounded-full text-[#8094ae] cursor-pointer">
                      <i className="icon-send ml-1"></i>
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        {/*<Modal isOpen={isAudioCallPopUpOpen}>*/}
        {/*<VoiceCallPopUp handleClose={setIsAudioCallPopUpOpen} />*/}
        {/*</Modal>*/}
        {/*<Modal isOpen={isAudioCallFullScreenPopUpOpen}>*/}
        {/*<VoiceCallPopUp handleClose={setIsAudioCallFullScreenPopUpOpen} />*/}
        {/*</Modal>*/}
        {/*<Modal isOpen={isVideoCallPopUpFullScreenOpen}>*/}
        {/*<VoiceCallPopUp handleClose={setIsVideoCallFullScreenPopUpOpen} />*/}
        {/*</Modal>*/}
      </main>
    </>
  );
}
