import React from "react";
import BillDetailImg from "../../assets/images/noti-1.png";
import { useNavigate } from "react-router-dom";

export default function BillDetails() {
  const navigate = useNavigate();

  return (
    <main className="relative h-screen">
      <div className="py-10 px-5 lg:px-12">
        {/* //   <!-- back button  --> */}
        <div className="pb-8 flex items-center space-x-3">
          <a
            className="icon-back text-chatlook-sky text-3xl inline-block"
            onClick={() => navigate(-1)}
          ></a>
          <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
            Your Promotion Bill
          </h4>
        </div>
        {/* //   <!-- edit area  --> */}
        <div className="relative pt-7">
          {/* // <!-- bill details  --> */}
          <div className="flex flex-wrap -mx-3">
            <div className="w-full xl:w-1/2 p-3 space-y-3">
              <div className="w-full bg-chatlook-grayLight rounded-md flex p-5">
                <div className="w-4/12 min-h-[80px] rounded-md overflow-hidden">
                  <img
                    src={BillDetailImg}
                    className="w-full h-full object-cover"
                    alt="noti-1"
                  />
                </div>
                <div className="w-8/12 pl-3">
                  <h2 className="text-base font-bold">Festival Offer</h2>
                  <p className="line-clamp-2 text-sm text-chatlook-dark mt-1">
                    It is a long established fact that a reader will be
                    distracted by the ....
                  </p>
                  <a className="text-sm text-chatlook-sky">www.companyname.com</a>
                </div>
              </div>
              <div className="w-full bg-chatlook-grayLight rounded-md p-5">
                <h2 className="text-xl font-bold">Publish Date and Time</h2>
                <p className="line-clamp-2 text-base text-chatlook-sky font-bold mt-1">
                  30 may 2022 - Monday
                </p>
              </div>
            </div>
            <div className="w-full xl:w-1/2 p-3">
              <div className="w-full bg-chatlook-grayLight p-5 py-6 rounded-md space-y-5">
                <h2>Transaction Details</h2>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className="icon-date-time text-chatlook-sky text-2xl inline-block"></span>
                    <div className="pl-3">
                      <h2 className="text-base text-chatlook-dark ml-auto">
                        Transaction Date & Time
                      </h2>
                      <span className="text-sm text-chatlook-gray block font-bold">
                        21 April 2022, 12:15 pm
                      </span>
                    </div>
                  </div>
                  <h2 className="text-base text-chatlook-dark ml-auto">₹20</h2>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className="icon-hashtag text-chatlook-sky text-2xl inline-block"></span>
                    <div className="pl-3">
                      <h2 className="text-base text-chatlook-dark ml-auto">
                        Transaction Id{" "}
                      </h2>
                      <span className="text-sm text-chatlook-gray block font-bold">
                        0123654896
                      </span>
                    </div>
                  </div>
                  <h2 className="text-base text-chatlook-dark ml-auto">₹10</h2>
                </div>
                <div className="flex items-center pb-6">
                  <div className="flex items-center">
                    <span className="icon-accept-request text-chatlook-sky text-2xl inline-block"></span>
                    <div className="pl-3">
                      <h2 className="text-base text-chatlook-dark ml-auto">
                        Payment Status
                      </h2>
                      <span className="text-sm text-chatlook-sky block font-bold">
                        Successful
                      </span>
                    </div>
                  </div>
                  <h2 className="text-base text-chatlook-dark ml-auto">₹10</h2>
                </div>
                {/* //   <!-- total  --> */}
                <div className="flex items-center justify-between pt-6 border-t border-dashed border-chatlook-gray">
                  <h2 className="text-base text-chatlook-dark">Total:</h2>
                  <h2 className="text-base text-chatlook-sky">₹40</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center space-x-5 mt-7">
          <button className="w-full max-w-[250px] block bg-white text-chatlook-sky uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium border border-chatlook-sky mb-0">
            <span className="icon-arrow-down text-lg mr-1"></span>
            <i className="icon-download mr-1"></i>download invoice
          </button>
          <button className="w-full max-w-[250px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium">
            Ok
          </button>
        </div>
      </div>
    </main>
  );
}
