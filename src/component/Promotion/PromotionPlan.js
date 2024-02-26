import React from "react";
import { useNavigate } from "react-router-dom";

function PromotionPlan() {
  const navigate = useNavigate();

  return (
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
              promotion plan
            </h2>
            <span className="block text-sm mt-1">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour.
            </span>
            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full lg:w-auto p-3 flex">
                <i className="icon-ball inline-block text-xl text-chatlook-sky"></i>
                <div className="ml-2">
                  <h2>Notification</h2>
                  <span>0.06</span>
                </div>
              </div>
              <div className="w-full lg:w-auto p-3 flex">
                <span className="icon-mail inline-block text-xl text-chatlook-sky"></span>
                <div className="ml-2">
                  <h2>Email</h2>
                  <span className="inline-block">0.06 Rupees per Email</span>
                </div>
              </div>
              <div className="w-full lg:w-auto p-3 flex">
                <span className="icon-message inline-block text-xl text-chatlook-sky"></span>
                <div className="ml-2">
                  <h2>SMS</h2>
                  <span>0.18 Rupees per SMS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-7">
          <button
            className="w-full max-w-[250px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium mx-auto"
            onClick={() => navigate("/dashboard/promoteuser")}
          >
            Start Promotion
          </button>
        </div>
      </div>
    </main>
  );
}

export default PromotionPlan;
