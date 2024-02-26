import React from "react";
import ProfileImg from "../../../assets/images/profile.png";
import { useState } from "react";

export default function SelectUserModal({ handleClose }) {
  const [isFilterOptionPopUpOpen, setIsFilterOptionPopUpOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 w-full h-full min-h-screen overflow-y-auto flex items-center justify-center py-10 px-5 bg-black/60">
        <div
          className="absolute z-10 top-0 right-0 bottom-0 left-0 h-full w-full"
          onClick={() => handleClose(false)}
        ></div>
        <div
          className="w-full max-w-[480px] bg-white p-8 rounded-[15px] space-y-4"
          style={{ zIndex: "9999999999999" }}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-center">Select User</h2>
          <div className="w-full">
            <div className="w-full flex items-center space-x-3 relative">
              <label
                for="search"
                className="w-full py-2 px-3 flex items-center rounded-md border bg-[#F1F1F1] border-chatlook-grayLight"
              >
                <i className="icon-search text-chatlook-gray mr-2"></i>
                <input
                  type="search"
                  name="Search"
                  id="Search"
                  placeholder="Search"
                  className="w-full outline-none"
                />
              </label>
              {/* <!-- FILLTER OPTION BUTTON --> */}
              <div
                onClick={() =>
                  setIsFilterOptionPopUpOpen(!isFilterOptionPopUpOpen)
                }
              >
                <div className="text-xl w-10 h-10 flex items-center justify-center bg-chatlook-sky shadow rounded-lg text-[#8094ae]">
                  <i
                    className="icon-filtr text-white"
                    aria-hidden="true"
                    onClick={() => {
                      setIsFilterOptionPopUpOpen(true);
                    }}
                  ></i>
                </div>
              </div>
              {/* <!-- FILLTER OPTION  --> */}
              {isFilterOptionPopUpOpen && (
                <div
                  id="fillter_poup"
                  className="fixed inset-0 h-[280px] w-full absolute top-full right-0 z-20 max-w-sm bg-white rounded-lg shadow-lg p-5 translate-y-4 anim"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg xl:text-xl text-chatlook-dark">
                      Filter Option
                    </h2>
                    <span
                      className="icon-close text-base"
                      onClick={() => setIsFilterOptionPopUpOpen(false)}
                    ></span>
                  </div>

                  <div className="w-full py-3 space-y-4">
                    <div className="flex items-center relative userSelact">
                      <input
                        type="checkbox"
                        name="userSelect"
                        id="userSelect"
                        className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                        checked
                      />
                      <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray flex items-center justify-center">
                        <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                      </div>
                      <span className="text-base block text-chatlook-gray font-bold pl-2">
                        Existing Users
                      </span>
                    </div>
                    <div className="flex items-center relative userSelact">
                      <input
                        type="checkbox"
                        name="userSelect"
                        id="userSelect"
                        className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                        checked
                      />
                      <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray flex items-center justify-center">
                        <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                      </div>
                      <span className="text-base block text-chatlook-gray font-bold pl-2">
                        app friend
                      </span>
                    </div>
                    <div className="flex items-center relative userSelact">
                      <input
                        type="checkbox"
                        name="userSelect"
                        id="userSelect"
                        className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                        checked
                      />
                      <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray flex items-center justify-center">
                        <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                      </div>
                      <span className="text-base block text-chatlook-gray font-bold pl-2">
                        excel File friend
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center -mx-2">
                    <div className="w-1/2 p-2">
                      <button
                        className="w-full py-3 px-2 rounded-md border border-chatlook-gray text-chatlook-gray text-center text-base uppercase font-medium"
                        onClick={() => handleClose(false)}
                      >
                        Clear
                      </button>
                    </div>
                    <div className="w-1/2 p-2">
                      <button className="w-full py-3 px-2 rounded-md border bg-chatlook-sky text-white text-center text-base uppercase font-medium">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex flex-wrap items-center space-x-1.5 py-2">
              <div className="w-10 h-10 relative m-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={ProfileImg} alt="G-user" />
                </div>
                <span className="w-4 h-4 rounded-full flex items-center justify-center bg-chatlook-sky border border-white absolute bottom-0 right-0 z-10 cursor-pointer">
                  <i className="icon-close text-[6px] text-white"></i>
                </span>
              </div>
              <div className="w-10 h-10 relative m-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={ProfileImg} alt="G-user" />
                </div>
                <span className="w-4 h-4 rounded-full flex items-center justify-center bg-chatlook-sky border border-white absolute bottom-0 right-0 z-10 cursor-pointer">
                  <i className="icon-close text-[6px] text-white"></i>
                </span>
              </div>
              <div className="w-10 h-10 relative m-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={ProfileImg} alt="G-user" />
                </div>
                <span className="w-4 h-4 rounded-full flex items-center justify-center bg-chatlook-sky border border-white absolute bottom-0 right-0 z-10 cursor-pointer">
                  <i className="icon-close text-[6px] text-white"></i>
                </span>
              </div>
            </div>
            <div className="w-full py-2 border-t border-chatlook-grayLight space-y-3 max-h-[400px] overflow-y-auto">
              <div className="flex items-center justify-between relative px-2">
                <span>150 People Selected</span>
                <a className="text-chatlook-sky rext-sm">Select All</a>
              </div>
              <div className="flex items-center relative userSelact pr-2">
                <input
                  type="checkbox"
                  name="userSelect"
                  id="userSelect"
                  className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                  checked
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={ProfileImg} alt="G-user" />
                  </div>
                  <span className="text-base font-bold text-chatlook-dark">
                    Ahmed Medi
                  </span>
                </div>
                <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                  <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                </div>
              </div>
              <div className="flex items-center relative userSelact pr-2">
                <input
                  type="checkbox"
                  name="userSelect2"
                  id="userSelect2"
                  className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={ProfileImg} alt="G-user" />
                  </div>
                  <span className="text-base font-bold text-chatlook-dark">
                    Ahmed Medi
                  </span>
                </div>
                <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                  <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                </div>
              </div>
              <div className="flex items-center relative userSelact pr-2">
                <input
                  type="checkbox"
                  name="userSelect3"
                  id="userSelect3"
                  className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={ProfileImg} alt="G-user" />
                  </div>
                  <span className="text-base font-bold text-chatlook-dark">
                    Ahmed Medi
                  </span>
                </div>
                <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                  <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                </div>
              </div>
              <div className="flex items-center relative userSelact pr-2">
                <input
                  type="checkbox"
                  name="userSelect4"
                  id="userSelect4"
                  className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={ProfileImg} alt="G-user" />
                  </div>
                  <span className="text-base font-bold text-chatlook-dark">
                    Ahmed Medi
                  </span>
                </div>
                <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                  <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                </div>
              </div>
              <div className="flex items-center relative userSelact pr-2">
                <input
                  type="checkbox"
                  name="userSelect6"
                  id="userSelect6"
                  className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={ProfileImg} alt="G-user" />
                  </div>
                  <span className="text-base font-bold text-chatlook-dark">
                    Ahmed Medi
                  </span>
                </div>
                <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                  <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                </div>
              </div>
              <div className="flex items-center relative userSelact pr-2">
                <input
                  type="checkbox"
                  name="userSelect7"
                  id="userSelect7"
                  className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={ProfileImg} alt="G-user" />
                  </div>
                  <span className="text-base font-bold text-chatlook-dark">
                    Ahmed Medi
                  </span>
                </div>
                <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                  <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                </div>
              </div>
              <div className="flex items-center relative userSelact pr-2">
                <input
                  type="checkbox"
                  name="userSelect8"
                  id="userSelect8"
                  className="absolute w-full h-full z-10 inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={ProfileImg} alt="G-user" />
                  </div>
                  <span className="text-base font-bold text-chatlook-dark">
                    Ahmed Medi
                  </span>
                </div>
                <div className="userCheck w-5 h-5 rounded-full border-2 border-chatlook-gray ml-auto flex items-center justify-center">
                  <span className="icon-double-tick text-chatlook-sky text-xs inline-block opacity-0"></span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-12 h-12 bg-chatlook-sky rounded-full rotate-180 mx-auto block">
            <i className="icon-back text-white text-xl"></i>
          </button>
        </div>
      </div>
    </>
  );
}
