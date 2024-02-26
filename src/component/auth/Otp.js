import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { otpVerify, useOtp } from "./authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useTimer } from "react-timer-hook";
import Logo from "../../assets/images/logo.png";
import { Secondary, Success } from "../../redux/services/toastServices";
import { PulseLoader } from "react-spinners";
var errrorMessager = ""

const Otp = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 30);
  const { seconds, minutes, restart, isRunning } = useTimer({
    time,
    onExpire: () => {
      console.warn("onExpire called")
      localStorage.removeItem("token")
    },
  });
  const [otpInput, setOtpInput] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false)
  //console.log('otpInput', otpInput)

  //console.log('errrorMessager', errrorMessager)
  // const [errrorMessager, setErrorMessage] = useState(``)
  let isEmptyOtp = false
  let resData = otpInput.filter((item) => item != "").length;
  if (resData == 4) {
    errrorMessager = ""
  } else if (resData != 0) {
    errrorMessager = "Enter otp First"
  }


  const { otps, countryCodes } = useOtp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const RouteChange = () => {
    navigate(-1);
  };

  useLayoutEffect(() => {
    restart(time);
  }, []);

  const OtpVerify = async (values) => {
    let payload = { otp: values };
    setLoading(true)
    try {
      const response = await dispatch(otpVerify(payload)).unwrap();
      // console.log(response, "responseresponse");
      if (response.data.IsSuccess) {
        //console.log(response.data.Data.token, "response.data.Data.tokenresponse.data.Data.token");
        localStorage.setItem("token", response.data.Data.token ? JSON.stringify(response.data.Data.token) : undefined);

        Success(response.data.Message);
        navigate("/dashboard", { replace: true });
      } else {
        Secondary(response.data.Message);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };

  let error = ``

  const onSubmit = (e) => {
    e.preventDefault();
    otpInput.map((items) => {
      if (items === "")
        isEmptyOtp = true
      else {
        isEmptyOtp = false
      }
    })
    if (isEmptyOtp) {
      errrorMessager = "enter Valid otp"
      // console.log('errrorMessager', errrorMessager)
      return;
    }
    if (otpInput.join("").length < 5) OtpVerify(otpInput.join(""));
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtpInput([
      ...otpInput.map((d, idx) => (idx === index ? element.value : d)),
    ]);
    if (element.value) {
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    } else {
      if (element.previousSibling) {
        element.previousSibling.focus();
      }
    }
  };
  return (
    <div>
      <div className="w-full h-full md:h-screen flex flex-col items-center justify-center py-5 px-3 lg:px-0">
        <div className="pb-[30px]">
          <img
            src={Logo}
            width="239"
            height="49"
            viewBox="0 0 239 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          />
        </div>
        <div className="w-auto bg-white p-[50px] shadow-one rounded-[10px]">
          <a
            className="icon-back text-[27px] text-chatlook-sky"
            onClick={() => RouteChange()}
          ></a>
          <h2 className="pb-[19px] pt-6">Verify your phone number</h2>
          <p className="pb-[19px] leading-[30px]">
            Enter the OTP you received to +{countryCodes + " " + otps}
          </p>
          <form onSubmit={onSubmit} action="" id="codeverifyForm">
            <div className="flex flex-col space-y-3 justify-center">
              <div className="flex items-center justify-center space-x-6">
                {otpInput.map((data, index) => {
                  return (
                    <input
                      type="text"
                      name="otp"
                      placeholder="0"
                      className="w-[60px] h-[60px] bg-chatlook-grayLight text-xl text-chatlook-dark text-center rounded-[5px] otp"
                      key={index}
                      value={data ? data : 0}
                      // onKeyUp="tabChange(1)"
                      // onInput="digitValidate(this)"
                      maxLength="1"
                      id="verificationCodeDigit1"
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  );
                })}
              </div>
              <div className="text-red-500 ml-20  text-sm">
                {errrorMessager}
              </div>

            </div>
            <p className="text-center pt-[30px] pb-7 inline-block text-chatlook-dark flex justify-center">
              <span className="text-base text-chatlook-dark px-0.5">
                {minutes} : {seconds}
              </span>
            </p>
            <div className="md:flex justify-end items-center">
              <a
                className="text-chatlook-sky text-lg font-normal leading-[22px] pr-5"
                onClick={() => {
                  const time = new Date();
                  time.setSeconds(time.getSeconds() + 30);
                  restart(time);
                }}
              >
                Resend code
              </a>
              <button type="submit" disabled={!isRunning || loading} className="btn-form">
                {loading ? <PulseLoader color="white" /> : "Verify"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
