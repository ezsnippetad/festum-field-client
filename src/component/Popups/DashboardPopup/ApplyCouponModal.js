import React from "react";

export default function ApplyCouponModal({ handleClose, setDiscountValue }) {
  const discountCoupons = [10, 20, 30].map((val) => (
    <div className="w-full p-5 bg-chatlook-grayLight rounded-md">
      <div className="flex items-center justify-between pb-4 border-b border-dashed border-chatlook-gray">
        <h2 className="text-base">{val}% Save</h2>
        <button
          onClick={() => {
            setDiscountValue(val);
            handleClose();
          }}
          className="py-1.5 px-4 bg-chatlook-sky rounded-md text-sm text-white uppercase font-bold"
        >
          apply
        </button>
      </div>
      {/* <!-- para detils  --> */}
      <div className="pt-4">
        <p className="line-clamp-2 text-sm">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>
    </div>
  ));

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center py-10 px-5 bg-[rgba(0,0,0,0.2)]">
      <div
        className="absolute z-10 top-0 right-0 bottom-0 left-0 h-full w-full"
        onClick={() => handleClose(false)}
      ></div>
      <div
        className="w-full max-w-[480px] bg-white p-8 rounded-[15px] space-y-4"
        style={{ zIndex: "9999999999999" }}
      >
        <h2 className="text-xl lg:text-2xl font-bold text-center">Apply Coupon</h2>
        <div className="space-y-5">{discountCoupons}</div>
      </div>
    </div>
  );
}
