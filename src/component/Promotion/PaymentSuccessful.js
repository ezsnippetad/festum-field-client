import React from "react";
import paymentImg from "../../assets/images/payment.png";
import { useNavigate } from "react-router";

export default function PaymentSuccessful(props) {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/dashboard/promotionbilldetails");
  }, 3000);

  return (
    <div>
      <main className="relative h-screen">
        <div className="w-full h-full flex items-center justify-center">
          <div className="p-7 text-center">
            <img src={paymentImg} alt="payment-successful" />
            <div className="mt-7">
              <h2 className="text-xl md:text-2xl text-chatlook-dark">
                payment successful!
              </h2>
              <h2 className="text-xl md:text-2xl text-chatlook-gray mt-3">
                $ 230.00
              </h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
