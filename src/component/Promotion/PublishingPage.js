import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

export default function PublishingPage() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="">
        <main className="relative h-screen">
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
                <h2 className="text-lg xl:text-xl text-chatlook-dark font-bold">
                  Publish Date and Time
                </h2>
                <div className="flex flex-wrap -mx-3 mt-2">
                  <div className="w-full lg:w-1/2 p-3">
                    <div className="bg-chatlook-grayLight p-3 rounded-[5px] relative flex items-center">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-full"
                      />
                      <span className="icon-calendar text-chatlook-sky text-lg leading-6"></span>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 p-3">
                    <div className="bg-chatlook-grayLight p-3 rounded-[5px] relative flex items-center">
                      <input
                        type="text"
                        placeholder="Select Time"
                        className="w-full"
                      />
                      <span className="icon-watch text-chatlook-sky text-lg leading-6"></span>
                    </div>
                  </div>
                </div>
                <h2 className="text-lg xl:text-xl text-chatlook-dark font-bold">
                  Select Category
                </h2>
                <div className="flex flex-wrap mt-2 space-x-3">
                  <div className="w-auto flex items-center space-x-2 py-1">
                    <div className="relative">
                      <input
                        className="absolute inset-0 opacity-0 w-full h-full z-20"
                        type="checkbox"
                        name="ct-1"
                        checked
                      />
                      <label
                        for="#"
                        className="w-6 h-6 flex items-center justify-center rounded border border-chatlook-gray selecgt"
                      >
                        <span className="icon-selected text-chatlook-sky text-sm opacity-0"></span>
                      </label>
                    </div>
                    <span className="text-base text-chatlook-dark inline-block font-bold">
                      Notification
                    </span>
                  </div>
                  <div className="w-auto flex items-center space-x-2 py-1">
                    <div className="relative">
                      <input
                        className="absolute inset-0 opacity-0 w-full h-full z-20"
                        type="checkbox"
                        name="ct-3"
                      />
                      <label
                        for="#"
                        className="w-6 h-6 flex items-center justify-center rounded border border-chatlook-gray selecgt"
                      >
                        <span className="icon-selected text-chatlook-sky text-sm opacity-0"></span>
                      </label>
                    </div>
                    <span className="text-base text-chatlook-dark inline-block font-bold">
                      Email
                    </span>
                  </div>
                  <div className="w-auto flex items-center space-x-2 py-1">
                    <div className="relative">
                      <input
                        className="absolute inset-0 opacity-0 w-full h-full z-20"
                        type="checkbox"
                        name="ct-2"
                      />
                      <label
                        for="#"
                        className="w-6 h-6 flex items-center justify-center rounded border border-chatlook-gray selecgt"
                      >
                        <span className="icon-selected text-chatlook-sky text-sm opacity-0"></span>
                      </label>
                    </div>
                    <span className="text-base text-chatlook-dark inline-block font-bold">
                      SMS
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-7">
              <button
                className="w-full max-w-[250px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium mx-auto"
                onClick={() => navigate("/dashboard/billing")}
              >
                Continue
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
