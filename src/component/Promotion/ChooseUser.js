import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../Common/Modals/Modal";
import SelectUserModal from "../Popups/DashboardPopup/SelectUserModal";

function ChooseUser() {
  const [isShow, setIsShow] = useState(false);
  const [isExistingUsers, setIsExistingUsers] = useState(false);
  const [isAppUsers, setIsAppUsers] = useState(false);

  const navigate = useNavigate();
  const [isUsersPopupOpen, setIsUsersPopupOpen] = useState(false);

  return (
    <div className="">
      <main className="relative h-screen overflow-clip">
        <div className="py-10 px-5 lg:px-12">
          {/* <!-- back button  --> */}
          <div className="pb-8 flex items-center space-x-3">
            <div
              className="icon-back text-chatlook-sky text-3xl inline-block"
              onClick={() => navigate(-1)}
            ></div>
            <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
              Promotion
            </h4>
          </div>
          {/* <!-- edit area  --> */}
          <div className="relative pt-7">
            <div className="w-full">
              <div className="flex flex-wrap -mx-3 2xl:-mx-8">
                <div className="w-full xl:w-1/2 xl:p-3 2xl:p-8 flex">
                  <div className="w-full">
                    <label className="interested_in flex items-center text-chatlook-dark mb-0 cursor-pointer space-x-3">
                      <input
                        type="checkbox"
                        className="circle sky"
                        style={{ borderRadius: "50%" }}
                        onChange={(e) => setIsExistingUsers(e.target.checked)}
                      />
                      <span className="text-base block text-chatlook-dark font-bold">
                        {isShow ? "Existing Users" : "Existing Users"}
                      </span>
                    </label>
                    {isExistingUsers && (
                      <div className="space-y-2 pt-4">
                        <span className="text-chatlook-dark text-sm">
                          (if you have excel file first upload it after select
                          user)
                        </span>
                        <div className="relative p-3 bg-chatlook-grayLight rounded-md overflow-hidden border border-dashed border-chatlook-gray">
                          <input
                            type="file"
                            name="excel_upload"
                            id="excel_upload"
                            className="inset-0 w-full h-full absolute opacity-0"
                          />
                          <div className="flex items-center justify-center space-x-3">
                            <i className="icon-excel-file text-chatlook-gray text-xl"></i>
                            <span className="text-sm">Upload Excel File</span>
                          </div>
                        </div>
                        <div className="flex justify-between pt-2">
                          <a className="flex items-center space-x-1">
                            <span className="icon-download text-chatlook-sky text-base inline-block"></span>
                            <span className="text-chatlook-sky inline-block">
                              Sample Exe File
                            </span>
                          </a>
                          <div className="ml-auto">
                            <button className="p-1.5 px-3 bg-chatlook-sky text-xs rounded uppercase font-medium ml-auto mr-2">
                              <i className="icon-upload-2 mr-1 invert"></i>
                              <span className="text-white">upload file</span>
                            </button>
                            <button
                              className="p-1.5 px-3 bg-chatlook-dark text-white text-xs rounded uppercase font-medium"
                              onClick={() => setIsUsersPopupOpen(true)}
                            >
                              Select user
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full xl:w-1/2 xl:p-3  2xl:p-8 flex">
                  <div className="w-full">
                    <label className="interested_in flex items-center text-chatlook-dark mb-0 cursor-pointer space-x-3">
                      <input
                        type="checkbox"
                        className="circle sky"
                        style={{ borderRadius: "50%" }}
                        onChange={(e) => setIsAppUsers(e.target.checked)}
                      />
                      <span className="text-base block text-chatlook-dark font-bold">
                        App Users
                      </span>
                    </label>
                    {isAppUsers && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center lg:pl-7 py-5">
                          <span className="text-sm text-chatlook-sky inline-block">
                            For 999 Users
                          </span>
                          <button className="p-1.5 px-3 bg-chatlook-dark text-white text-xs rounded uppercase font-medium">
                            Select Package
                          </button>
                        </div>
                        <div className="relative w-full border-b border-chatlook-grayLight">
                          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-1 bg-white">
                            OR
                          </span>
                        </div>
                        <div className="lg:pl-7">
                          {/* <!-- user slaction  --> */}
                          <div className="w-full py-3">
                            <div className="rounded-[5px] relative">
                              <span className="icon-down-arrow text-base text-chatlook-dark absolute right-4 -translate-y-1/2 top-1/2 z-10 pointer-events-none touch-none"></span>
                              <select
                                name=""
                                id=""
                                className="bg-chatlook-grayLight p-3 rounded-[5px] w-full text-sm text-chatlook-gray font-normal focus-visible:outline-none appearance-none relative"
                              >
                                <option value="">Select Number of Users</option>
                                <option value="">Category 1</option>
                                <option value="">Category 2</option>
                                <option value="">Category 3</option>
                                <option value="">Category 4</option>
                              </select>
                            </div>
                          </div>
                          {/* <!-- location  --> */}
                          <div className="w-full py-3">
                            <label className="w-full flex items-center text-chatlook-gray mb-1 mr-1">
                              <span className="icon-location text-lg inline-block"></span>
                              Target Audience Location
                            </label>
                            <div className="bg-chatlook-grayLight p-3 rounded-[5px] relative flex items-center">
                              <input
                                type="text"
                                placeholder="Location"
                                className="w-full"
                              />
                              <span className="icon-mark text-chatlook-sky text-lg leading-6"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-7">
            <button
              className="w-full max-w-[250px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium mx-auto"
              onClick={() => navigate("/dashboard/selectpackage")}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
      <Modal isOpen={isUsersPopupOpen}>
        <SelectUserModal
          handleClose={setIsUsersPopupOpen}
          isUsersPopupOpen={isUsersPopupOpen}
        />
      </Modal>
    </div>
  );
}

export default ChooseUser;
