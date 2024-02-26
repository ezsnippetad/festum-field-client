import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectPackage() {
  const navigate = useNavigate();
  return (
    <>
      <main className="relative h-screen">
        <div className="py-10 px-5 lg:px-12">
          {/* <!-- back button  --> */}
          <div className="pb-8 flex items-center space-x-3">
            <div
              className="icon-back text-chatlook-sky text-3xl inline-block"
              onClick={() => navigate(-1)}
            ></div>
            <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
              Select Package
            </h4>
          </div>
          {/* <!-- edit area  --> */}
          <div className="relative pt-7">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 p-4">
                <div className="pk1 w-full rounded-xl p-5 relative">
                  <label className="interested_in flex items-center mb-0 cursor-pointer space-x-3">
                    <input
                      type="radio"
                      name="pk1"
                      className="circle sky"
                      style={{ borderRadius: "50%" }}
                    />
                    <span className="text-lg xl:text-xl block text-white font-bold">
                      FOR 999 USERS
                    </span>
                  </label>
                  <ul className="flex flex-wrap px-7 pt-5">
                    <li className="w-1/2 text-base font-medium py-1">
                      Notification
                    </li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      69 FOR 999 USERS
                    </li>
                    <li className="w-1/2 text-base font-medium py-1">SMS</li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      399 FOR 999 USERS
                    </li>
                    <li className="w-1/2 text-base font-medium py-1">Email</li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      89 FOR 999 USERS
                    </li>
                    <li className="w-1/2 text-base font-medium py-1">All</li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      475 FOR 999 USERS
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4">
                <div className="pk2 w-full rounded-xl p-5 relative">
                  <label className="interested_in flex items-center mb-0 cursor-pointer space-x-3">
                    <input
                      type="radio"
                      name="pk1"
                      className="circle sky"
                      style={{ borderRadius: "50%" }}
                    />
                    <span className="text-lg xl:text-xl block text-white font-bold">
                      FOR 9999 USERS
                    </span>
                  </label>
                  <ul className="flex flex-wrap px-7 pt-5">
                    <li className="w-1/2 text-base font-medium py-1">
                      Notification
                    </li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      69 FOR 999 USERS
                    </li>
                    <li className="w-1/2 text-base font-medium py-1">SMS</li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      399 FOR 999 USERS
                    </li>
                    <li className="w-1/2 text-base font-medium py-1">Email</li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      89 FOR 999 USERS
                    </li>
                    <li className="w-1/2 text-base font-medium py-1">All</li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      475 FOR 999 USERS
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4">
                <div className="pk3 w-full rounded-xl p-5 relative">
                  <label className="interested_in flex items-center mb-0 cursor-pointer space-x-3">
                    <input
                      type="radio"
                      name="pk1"
                      className="circle sky"
                      style={{ borderRadius: "50%" }}
                    />
                    <span className="text-lg xl:text-xl block text-white font-bold">
                      FOR 99999 USERS
                    </span>
                  </label>
                  <ul className="flex flex-wrap px-7 pt-5">
                    <li className="w-1/2 text-base font-medium py-1">
                      Notification
                    </li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      69 FOR 999 USERS
                    </li>
                    <li className="w-1/2 text-base font-medium py-1">SMS</li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      399 FOR 999 USERS
                    </li>
                    <li className="w-1/2 text-base font-medium py-1">Email</li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      89 FOR 999 USERS
                    </li>
                    <li className="w-1/2 text-base font-medium py-1">All</li>
                    <li className="w-1/2 text-base font-medium py-1 text-right">
                      475 FOR 999 USERS
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-7">
            <button
              className="w-full max-w-[250px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium mx-auto"
              onClick={() => navigate("/dashboard/publishing")}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default SelectPackage;
