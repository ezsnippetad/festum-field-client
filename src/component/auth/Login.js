import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { otpSend, setUserLogin, useVerifyOtp } from "./authSlice";
import { useDispatch } from "react-redux";
import Logo from "../../assets/images/logo.png";
import { Secondary, Success } from "../../redux/services/toastServices";
import { ClipLoader, PulseLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const verifyOtps = useVerifyOtp();

  const initialValues = {
    phone_number: "",
    dialCode: "",
  };
  const validationSchema = Yup.object({
    phone_number: Yup.string().required("Phone Number is Require !").matches(/^[1-9]\d{9}$/, 'Enter Valid Mobile Number'),
  });

  const loginData = async (values) => {

    setLoading(true)
    const dialCode = values?.dialCode;
    const num = values?.phone_number;
    const fcm_token = localStorage.getItem("fcm_token");
    let payload = {
      mobile: num,
      country_code: dialCode,
      fcm_token,
      country_wise_contact: {}
    };
    

    try {
      dispatch(setUserLogin(payload))

      const response = await dispatch(otpSend(payload)).unwrap();
      if (response.data.IsSuccess) {
        Success(response.data.Message);
        navigate("/verify");
        // localStorage.setItem("token", response.data.Data.token ? JSON.stringify(response.data.Data.token) : {});
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      Secondary("SOMETHING WENT WRONG.");
    } finally {
      setLoading(false)
    }
  };
  const onSubmit = (values) => {
    loginData(values);
  };
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  // useEffect(() => {
  //   if (verifyOtps) {
  //     navigate("../dashboard")
  //   } else {
  //     navigate("../login")
  //   }
  // }, [])



  return (
    <div>
      <div className="w-full h-full md:h-screen flex flex-col items-center justify-center py-5 px-3 lg:px-0">
        <div className="pb-[30px]">
          <img
            src={Logo}
            width="239"
            height="49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          />
        </div>
        <div className="md:w-[550px] bg-white p-[50px] shadow-one rounded-[10px]">
          <h1 className="text-chatlook-sky text-[40px] pb-[19px] font-bold">
            Welcome!
          </h1>
          <h2 className="pb-[19px]">Enter Your phone number</h2>
          <p className="pb-[19px] leading-[30px]">
            A 6 digit OTP will be sent via SMA to verify your mobile number!
          </p>
          <form action="" onSubmit={handleSubmit}>
            <label className="flex px-3 py-3 items-center w-full bg-[#F0F0F0] rounded-[10px] mb-2">
              <div className="flex items-center w-full">
                <div className="Phone-Number-text relative flex items-center w-full">
                  <PhoneInput
                    country={"in"}
                    value={values.phone_number?.fullNum}
                    countryCodeEditable={false}
                    defaultErrorMessage="kjnihiou"
                    onChange={(e, i) => {
                      setValues({
                        ...values,
                        phone_number: e.slice(i.dialCode.length),
                        dialCode: i.dialCode,
                      });
                    }}
                  />
                </div>
              </div>
            </label>
            {touched.phone_number && errors.phone_number ? (
              <div className="text-red-500 text-sm">{errors.phone_number}</div>
            ) : null}

            <div className="flex justify-end mt-9">
              <button type="submit" className="btn-form">
                {loading ? <PulseLoader color="white" /> : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
