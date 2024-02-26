import React from "react";

const CallHistoryPage = () => {
  return (
    <main>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[375px] p-5 shadow-lg flex flex-col">
          <div className=" flex  justify-between w-full">
            <div className="flex  justify-center">
              <div className="h-12 w-12 rounded-full border border-black"></div>
              <div className="flex flex-col">
                <div className="space-x-3">
                  <div></div>
                  <h1 className="text-base font-bold">Jenny Wilson</h1>
                  <p className="text-chatlook-gray text-sm">+92 9876543213</p>
                </div>
                <hr class="h-px my-2.5 bg-gray-200 border-0 dark:bg-[#F1F1F1]  "></hr>
                <p className="text-chatlook-gray text-sm ">14, January 2024</p>
              </div>
            </div>
            <div className="flex  justify-center space-x-7">
              <span className="icon-video-on text-chatlook-sky text-2xl"></span>
              <span className="icon-call-receive text-chatlook-sky text-2xl"></span>
            </div>
          </div>
          <div className="flex flex-col pt-5">
            <div className="w-full  flex justify-between items-center">
              <div className="flex items-start space-x-4  ">
                <span className="icon-incoming-call text-green-500 font-normal text-3xl"></span>
                <div className="flex flex-col items-start">
                  <h1 className="text-base font-bold">Incoming</h1>
                  <span className="flex items-center justify-center space-x-1.5">
                    <span className="icon-call-receive text-lg text-chatlook-sky"></span>
                    <p className="text-[12px]">11:19 am</p>
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-[12px]">0.24</p>
                <p className="text-[12px]">815 kb</p>
              </div>
            </div>
            <div className="w-full  flex justify-between items-center">
              <div className="flex items-start space-x-4  ">
                <span className="icon-outgoing-call text-red-500 font-normal text-3xl"></span>
                <div className="flex flex-col items-start">
                  <h1 className="text-base font-bold">Outgoing</h1>
                  <span className="flex items-center justify-center space-x-1.5">
                    <span className="icon-call-receive text-lg text-chatlook-sky"></span>
                    <p className="text-[12px]">11:19 am</p>
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-[12px]">0.24</p>
                <p className="text-[12px]">815 kb</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CallHistoryPage;
