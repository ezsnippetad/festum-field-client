import React from "react";
import ProductImg from "../../assets/images/noti-1.png";
import { useNavigate } from "react-router-dom";
import ApplyCouponModal from "../Popups/DashboardPopup/ApplyCouponModal";
import { useState } from "react";
import Modal from "../../Common/Modals/Modal";

export default function PromotionBill() {
  const navigate = useNavigate();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [discountValue, setDiscountValue] = useState();

  return (
    <div>
      <main className="relative h-screen">
        <div className="py-10 px-5 lg:px-12">
          {/* <!-- back button  --> */}
          <div className="pb-8 flex items-center space-x-3">
            <div
              className="icon-back text-chatlook-sky text-3xl inline-block"
              onClick={() => navigate(-1)}
            ></div>
            <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
              Your Promotion Bill
            </h4>
          </div>
          {/* <!-- edit area  --> */}
          <div className="relative pt-7">
            {/* <!-- bill details  --> */}
            <div className="flex flex-wrap -mx-3">
              <div className="w-full xl:w-1/2 p-3 space-y-3">
                <div className="w-full bg-chatlook-grayLight rounded-md flex p-5">
                  <div className="w-4/12 min-h-[80px] rounded-md overflow-hidden">
                    <img
                      src={ProductImg}
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
                  </div>
                </div>
                <div className="w-full bg-chatlook-grayLight rounded-md p-5">
                  <h2 className="text-xl font-bold">Publish Date and Time</h2>
                  <p className="line-clamp-2 text-base text-chatlook-sky font-bold mt-1">
                    30 may 2022 - Monday
                  </p>
                </div>
                <div className="w-full flex justify-between bg-chatlook-grayLight rounded-md p-5">
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsCouponModalOpen(true)}
                  >
                    <h2 className="text-xl font-bold">Apply Coupon</h2>
                    {discountValue && (
                      <p className="line-clamp-2 text-base text-chatlook-sky font-bold mt-1">
                        {discountValue}% Saving coupon
                      </p>
                    )}
                  </div>
                  {discountValue && (
                    <div>
                      <h2
                        onClick={() => setDiscountValue(null)}
                        className="cursor-pointer text-base text-chatlook-red"
                      >
                        Remove
                      </h2>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full xl:w-1/2 p-3">
                <div className="w-full bg-chatlook-grayLight p-5 py-6 rounded-md space-y-5">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <span className="icon-notification text-chatlook-sky text-2xl inline-block"></span>
                      <div className="pl-3">
                        <h2 className="text-base text-chatlook-dark ml-auto">
                          Notification
                        </h2>
                        <span className="text-sm text-chatlook-gray block font-bold">
                          Free
                        </span>
                      </div>
                    </div>
                    <h2 className="text-base text-chatlook-dark ml-auto">₹20</h2>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <span className="icon-mail text-chatlook-sky text-2xl inline-block"></span>
                      <div className="pl-3">
                        <h2 className="text-base text-chatlook-dark ml-auto">
                          Email
                        </h2>
                        <span className="text-sm text-chatlook-gray block font-bold">
                          100 Email ID x 0.06
                        </span>
                      </div>
                    </div>
                    <h2 className="text-base text-chatlook-dark ml-auto">₹10</h2>
                  </div>
                  <div className="flex items-center pb-6">
                    <div className="flex items-center">
                      <span className="icon-message text-chatlook-sky text-2xl inline-block"></span>
                      <div className="pl-3">
                        <h2 className="text-base text-chatlook-dark ml-auto">
                          SMS
                        </h2>
                        <span className="text-sm text-chatlook-gray block font-bold">
                          280 Phone Number x 0.18
                        </span>
                      </div>
                    </div>
                    <h2 className="text-base text-chatlook-dark ml-auto">₹10</h2>
                  </div>
                  {/* <!-- total  --> */}
                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-chatlook-gray">
                    <h2 className="text-base text-chatlook-dark">Total:</h2>
                    <h2 className="text-base text-chatlook-sky">₹40</h2>
                  </div>
                  {discountValue && (
                    <>
                      <div className="flex items-center justify-between pb-4 border-b border-chatlook-gray">
                        <h2 className="text-base text-chatlook-red">
                          {discountValue}% Discount Coupon
                        </h2>
                        <h2 className="text-base text-chatlook-red">₹10</h2>
                      </div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-base text-chatlook-dark">Total:</h2>
                        <h2 className="text-base text-chatlook-sky">₹30</h2>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-7">
            <button
              className="w-full max-w-[250px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium mx-auto"
              onClick={() => navigate("/dashboard/payment")}
            >
              Pay Now
            </button>
          </div>
        </div>
      </main>
      <Modal isOpen={isCouponModalOpen}>
        <ApplyCouponModal
          setDiscountValue={setDiscountValue}
          handleClose={() => setIsCouponModalOpen(false)}
          isCouponModalOpen={isCouponModalOpen}
        />
      </Modal>
    </div>
  );
}
