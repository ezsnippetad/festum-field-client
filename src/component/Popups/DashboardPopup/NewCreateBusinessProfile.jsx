import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  brochureSet,
  businessProfileGet,
  businessProfilePickSet,
  businessProfileSet,
  uplaodbusinessBrochure,
  uplaodbusinessPhotos,
  uplaodbusinessVideo,
  useBusinessProfileGets,
  useProfileGets,
} from "../../../redux/Slice/profileSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImagePicker from "../../../Common/ImagePicker";
import Maps from "../../../Common/Maps";
import { Context } from "../../../createContext";
import { Secondary, Success } from "../../../redux/services/toastServices";
import useNavigatorPermissions from "react-use-navigator-permissions";
import image from "../../../../src/assets/images/Caterer-img.png";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import Twitter from "../../../../src/assets/images/Group.svg";
import ptt from "../../../../src/assets/images/ptt.png";
import yt from "../../../../src/assets/images/yt.png";
import Modal from "../../../Common/Modals/Modal";

let marker;
let links = [
  {
    platform: "Facebook",
    url: "",
  },
  {
    platform: "Instagram",
    url: "",
  },
  {
    platform: "Twitter",
    url: "",
  },
  {
    platform: "Linkdin",
    url: "",
  },
  {
    platform: "Pinterest",
    url: "",
  },
  {
    platform: "Youtube",
    url: "",
  },
];
export default function NewCreateBusinessProfile({
  setEmptyProfilePopUp,
  setIsCreatePersonalProfilePopUpOpen,
  setIsBusinessProfileModalOpen,
}) {
  const { businessProfileGetApi } = useContext(Context);
  const navigate = useNavigate();
  const businessProfileGets = useBusinessProfileGets();
  const [pdfError, setPdfError] = useState("");
  const { status, error } = useNavigatorPermissions("geolocation");
  const [uploadedPdfMessage, setUploadedPdfMessage] = useState("");
  const [maxFile, setMaxFile] = useState(false);
  const [allBrochure, setAllBrochure] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  console.log("allBrochure", allBrochure);

  const [lati, setLati] = useState(
    businessProfileGets?.location?.coordinates[1]
      ? businessProfileGets?.location?.coordinates[1]
      : 22.1702
  );
  const [long, setLong] = useState(
    businessProfileGets?.location?.coordinates[0]
      ? businessProfileGets?.location?.coordinates[0]
      : 72.8311
  );
  const [locationError, setLocationError] = useState("");

  const [imageProfile, setImageProfile] = useState();

  const [brochureProfile, setbrochureProfile] = useState();
  const [socialmedialinks, setSocialMediaLink] = useState(links);
  console.log("socialmedialinks", socialmedialinks);

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    category: "",
    subCategory: "",
    about: "",
    interestedCategory: "",
    interestedSubCategory: "",
    mobile: "",
    mobile_country_code: "",
    mobile_country_wise_contact: {
      number: "",
      internationalNumber: "",
      nationalNumber: "",
      e164Number: "",
      countryCode: "",
      dialCode: "",
    },
    wamobile: "",
    wamobile_country_code: "",
    wamobile_country_wise_contact: {
      number: "",
      internationalNumber: "",
      nationalNumber: "",
      e164Number: "",
      countryCode: "",
      dialCode: "",
    },
    email: "",
    website: "",
    address: {
      flatno: "",
      street: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("*Name required"),
    category: Yup.string().required("*Category required"),
    subCategory: Yup.string().required("*Subcategory required"),
    about: Yup.string().required("*About required"),
    mobile: Yup.string().required("*Mobile required"),
    interestedCategory: Yup.string().required("*Interested category required"),
    interestedSubCategory: Yup.string().required(
      "*Interested subcategory required"
    ),
    address: Yup.object().shape({
      flatno: Yup.string().required("*Flat No. required"),
      street: Yup.string().required("*Street required"),
      area: Yup.string().required("*Area required"),
      city: Yup.string().required("*City required"),
      state: Yup.string().required("*State required"),
      pincode: Yup.number().required("*Pincode required"),
    }),
  });
  useEffect(() => {
    businessProfileGetApi();
  }, []);

  useEffect(() => {
    if (!businessProfileGets) {
      return;
    }
    setValues({
      ...values,
      name: businessProfileGets?.name ? businessProfileGets?.name : "",
      category: businessProfileGets.category
        ? businessProfileGets.category
        : "",
      subCategory: businessProfileGets.subCategory
        ? businessProfileGets.subCategory
        : "",
      about: businessProfileGets.about ? businessProfileGets.about : "",
      interestedCategory: businessProfileGets.interestedCategory
        ? businessProfileGets.interestedCategory
        : "",
      interestedSubCategory: businessProfileGets.interestedSubCategory
        ? businessProfileGets.interestedSubCategory
        : "",
      latitude: lati,
      longitude: long,
      address: businessProfileGets.address || "",
    });
  }, [businessProfileGets]);
  const nameTypeStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: "#f1f1f1",
      background: "#f1f1f1",
      height: "24px",
    }),
  };
  const genderOption = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "other", label: "other" },
  ];

  const updateBusinessProfilePicture = async (files) => {
    try {
      let formData = new FormData();
      formData.append("file", files[0]);
      const response = await dispatch(
        businessProfilePickSet(formData)
      ).unwrap();
      if (response.data.IsSuccess) {
        Success(response.data.Message);
        setImageProfile(`${response.data.Data.Key}`);
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };
  const updateBrochure = async (files) => {
    try {
      let formData = new FormData();
      formData.append("file", files[0]);
      const response = await dispatch(brochureSet(formData)).unwrap();

      if (response.data.IsSuccess) {
        setbrochureProfile(response.data.Data.Key);
        Success(response.data.Message);
      } else {
        Secondary(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };

  const setBusinessProfile = async (values) => {
    if (pdfError.length > 0) {
      return;
    }

    const brochurLinks = allBrochure.map((items) => {
      return items.url;
    });
    const photoLinks = allPhotos.map((items) => {
      return items.url;
    });
    const videoLinks = allVideos.map((items) => {
      return items.url;
    });

    try {
      let payload = Object.assign({}, values);
      payload["businessid"] = "";
      payload["latitude"] = lati;
      payload["longitude"] = long;
      payload["businessimage"] = imageProfile;
      payload["socialmedialinks"] = socialmedialinks;
      payload["brochures"] = brochurLinks;
      payload["photos"] = photoLinks;
      payload["videos"] = videoLinks;

      const response = await dispatch(businessProfileSet(payload)).unwrap();

      if (response.data.IsSuccess) {
        navigate("/product");
        businessProfileGetApi();
        Success(response.data.Message);
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };

  const handleClick = (address, lng, lat, latlng) => {
    setLati(lat);
    setLong(lng);
    values = {
      lati: lat,
      long: lng,
    };
    marker.setPosition(latlng);
  };

  const loadMap = (map, maps) => {
    marker = new maps.Marker({
      position: { lat: lati, lng: long },
      map,
      draggable: true,
    });
    marker.addListener("dragend", (e) => {
      setLati(marker.getPosition().lat());
      setLong(marker.getPosition().lng());
    });
  };

  const latLngChange = (address) => {
    marker.setPosition(address);
  };
  const onSubmit = (values) => {
    if (locationError !== "") {
      return;
    } else {
      setBusinessProfile(values);
    }
  };
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  console.log("errors", errors);
  console.log("values", values);
  const getInputVal = (key) => {
    let mediaLink = socialmedialinks?.find((val) => val.platform === key);
    return mediaLink?.link;
  };
  const onSocialMedia = (val, key) => {
    let i = socialmedialinks?.findIndex((val) => val.platform === key);
    if (i > -1) {
      let array = Object.assign([], socialmedialinks);
      array[i] = { ...array[i], link: val };
      setSocialMediaLink(array);
    }
  };

  const handleremoveBrochure = (items, index) => {
    console.log("items", items);
    console.log("index", index);
    const updatedBrochure = allBrochure.filter((item, idx) => idx !== index);
    setAllBrochure(updatedBrochure);
  };
  const handleremovePhotos = (items, index) => {
    console.log("items", items);
    console.log("index", index);
    const updatePhotos = allPhotos.filter((item, idx) => idx !== index);
    setAllPhotos(updatePhotos);
  };
  const handleremoveVideo = (items, index) => {
    console.log("items", items);
    console.log("index", index);
    const updatedVideos = allVideos.filter((item, idx) => idx !== index);
    setAllVideos(updatedVideos);
  };

  return (
    <div>
      <div className="fixed inset-0 w-full h-screen overflow-hidden bg-[#f1f1f1] z-50">
        <div className="h-full w-full overflow-y-auto py-10 px-4">
          <div
            className="absolute z-10 top-0 right-0 bottom-0 left-0 h-full w-full"
            onClick={() => {
              // handleClose(false);
              // businessModalClose(false);
              // setIsCreateYourProfilePopUpOpen(false);
            }}
          ></div>
          <div
            className="w-full max-w-[800px] bg-white p-8 xl:p-12 shadow-one rounded-[10px] mx-auto relative"
            style={{ zIndex: "999999999999" }}
          >
            <div className="flex items-center">
              <div
                onClick={() => {
                  setIsBusinessProfileModalOpen(false);
                  setIsCreatePersonalProfilePopUpOpen(true);
                }}
                className="icon-back text-3xl text-chatlook-sky cursor-pointer"
              ></div>
              <h2 className="pl-5">Create Business Profile</h2>
            </div>
            <form onSubmit={handleSubmit} className="pt-5 md:pt-10">
              <div className="relative pb-7">
                <div className="w-32 h-32 bg-white border border-chatlook-sky rounded-full p-1 relative mx-auto">
                  <ImagePicker
                    isDefaultDesign={false}
                    showPreview={true}
                    label={false}
                    classNameMain="flex items-center justify-center w-full h-full"
                    onDrop={(files) => {
                      updateBusinessProfilePicture(files);
                    }}
                  >
                    {imageProfile ? (
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={`https://festumfield.s3.ap-south-1.amazonaws.com/${imageProfile}`}
                          className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                        />
                      </div>
                    ) : businessProfileGets?.businessimage ? (
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                          src={`https://festumfield.s3.ap-south-1.amazonaws.com/${businessProfileGets?.businessimage}`}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex justify-center items-center icon-user text-6xl rounded-full text-chatlook-gray" />
                    )}
                    <div className="pen-div d-flex justify-content-end">
                      <div className="w-9 h-9 absolute bottom-0 right-0 text-lg bg-chatlook-sky text-white rounded-full z-10 icon-pencil flex justify-center items-center"></div>
                    </div>
                  </ImagePicker>
                </div>
              </div>
              <div className="flex flex-wrap  pb-2.5 -mx-2.5">
                <div className="w-full md:w-1/2 p-2.5">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="Business Name"
                      className="w-full"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.name && touched.name && errors.name}
                  </span>
                </div>
                {/* <div className="w-full md:w-1/2 p-2.5">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      className="w-full"
                      value={values.category}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.category && touched.category && errors.category}
                  </span>
                </div> */}
                <div className="w-full md:w-1/2 p-2.5">
                  {/* <div className="bg-chatlook-grayLight p-1.5 rounded-[5px] relative"> */}
                  <div className="rounded-[5px] relative">
                    <Select
                      type="text"
                      name="gender"
                      id=""
                      className="bg-chatlook-grayLight p-3 rounded-[5px]  w-full text-sm text-chatlook-gray font-normal focus-visible:outline-none appearance-none relative"
                      styles={nameTypeStyles}
                      value={genderOption?.filter(
                        (option) => option.value === values.gender
                      )}
                      placeholder="Business Category"
                      options={genderOption}
                      onChange={(selectedOption) => {
                        setFieldValue("gender", selectedOption?.value);
                      }}
                    />
                    {/* </div> */}
                  </div>
                  <span className="error-msg-span">
                    {errors.gender && touched.gender && errors.gender}
                  </span>
                </div>
                {/* <div className="w-full md:w-1/3 p-2.5">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="Business subcategory"
                      className="w-full"
                      name="subCategory"
                      value={values.subCategory}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.subCategory &&
                      touched.subCategory &&
                      errors.subCategory}
                  </span>
                </div> */}
                <div className="flex flex px-3 py-1  w-1/2 flex-col">
                  <label
                    htmlFor="Business Mobile Number"
                    className="text-[14px] font-bold"
                  >
                    Business Mobile Number
                  </label>
                  <label className=" bg-[#F0F0F0] py-1   rounded mb-2">
                    <div className="flex items-center w-full">
                      <div className="Phone-Number-text relative flex items-center w-full">
                        <PhoneInput
                          country={"in"}
                          value={values.mobile?.fullNum}
                          countryCodeEditable={false}
                          defaultErrorMessage="kjnihiou"
                          placeholder="Enter phone Number"
                          onChange={(e, i, a, b) => {
                            setValues({
                              ...values,
                              mobile: e.slice(i.dialCode.length),
                              mobile_country_code: i.dialCode,
                              mobile_country_wise_contact: {
                                number: `0${e.slice(i.dialCode.length)}`,
                                internationalNumber: `${i.dialCode} ${e.slice(
                                  i.dialCode.length
                                )}`,
                                nationalNumber: `0${e.slice(
                                  i.dialCode.length
                                )}`,
                                e164Number: `+${i.dialCode}${e.slice(
                                  i.dialCode.length
                                )}`,
                                countryCode: i.countryCode,
                                dialCode: `+${i.dialCode}`,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </label>
                  <span className="error-msg-span">
                    {errors.mobile && touched.mobile && errors.mobile}
                  </span>
                </div>
                <div className="flex flex px-3 py-1  w-1/2 flex-col">
                  <label
                    htmlFor="Business Mobile Number "
                    className="text-[14px] font-bold "
                  >
                    Business Whatsapp Mobile Number
                  </label>
                  <label className=" bg-[#F0F0F0] py-1  rounded mb-2">
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
                              wamobile: e.slice(i.dialCode.length),
                              wamobile_country_code: i.dialCode,
                              wamobile_country_wise_contact: {
                                number: `0${e.slice(i.dialCode.length)}`,
                                internationalNumber: `${i.dialCode} ${e.slice(
                                  i.dialCode.length
                                )}`,
                                nationalNumber: `0${e.slice(
                                  i.dialCode.length
                                )}`,
                                e164Number: `+${i.dialCode}${e.slice(
                                  i.dialCode.length
                                )}`,
                                countryCode: i.countryCode,
                                dialCode: `+${i.dialCode}`,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </label>
                </div>
                <div className="w-full md:w-1/2 p-2.5">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="Business Email"
                      className="w-full"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span classemail="error-msg-span">
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <div className="w-full md:w-1/2 p-2.5">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="Business Website"
                      className="w-full"
                      name="website"
                      value={values.website}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.website && touched.website && errors.website}
                  </span>
                </div>
                <div className="w-full p-2.5">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <textarea
                      id=""
                      cols="30"
                      rows="4"
                      name="about"
                      placeholder="About Business"
                      className="w-full bg-transparent text-sm border-0 outline-0"
                      value={values.about}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <span className="error-msg-span">
                    {errors.about && touched.about && errors.about}
                  </span>
                </div>
                <div className="w-full p-2.5">
                  <span className="text-sm font-semibold text-chatlook-dark ">
                    Add Brochure
                  </span>
                  <div className="w-full shadow-md rounded-md">
                    <div className="w-full h-10 bg-chatlook-grayLight rounded-md border border-dashed border-chatlook-gray relative flex items-center justify-center">
                      <ImagePicker
                        isDefaultDesign={false}
                        showPreview={true}
                        label={false}
                        className="h-full w-full"
                        classNameMain="h-full w-full justify-center"
                        classNameDiv="h-full w-full"
                        onDrop={(files) => {
                          console.log("file", files);
                          console.log(
                            "allBrochure?.length ",
                            allBrochure?.length
                          );
                          if (allBrochure?.length < 5) {
                            setMaxFile(false);
                            Promise.all(
                              files.map(async (element) => {
                                const pdfs = new FormData();
                                pdfs.append("file", element);
                                const response = await dispatch(
                                  uplaodbusinessBrochure(pdfs)
                                );
                                console.log("response", response);
                                return response?.payload?.data?.Data;
                              })
                            ).then((brochureArray) => {
                              setAllBrochure((pre) => [
                                ...pre,
                                ...brochureArray,
                              ]);
                            });
                          } else {
                            setMaxFile(true);
                            toast.error("please uplaod 5 files");
                          }
                        }}
                        accept=".pdf"
                      >
                        <div className="brochure-main-div h-full w-full">
                          <div className="brochure-div h-full w-full">
                            <div className="flex items-center h-full w-full justify-center">
                              {/* <AiOutlineUpload /> */}
                              <span className="icon-upload-2 text-base text-chatlook-gray"></span>
                              {uploadedPdfMessage !== "" ? (
                                <p className="p-2 text-sm text-green-500">
                                  {uploadedPdfMessage}
                                </p>
                              ) : (
                                <p className="p-2 text-sm font-bold">
                                  Add Brochure
                                </p>
                              )}
                              {/* <p className="p-2 text-sm">Upload Brochure PDF</p> */}
                            </div>
                            <span className="error-msg-span">{pdfError}</span>
                            <p style={{ fontSize: "10px" }}>
                              {brochureProfile ? brochureProfile : null}
                            </p>
                          </div>
                        </div>
                      </ImagePicker>
                    </div>
                    <div className="p-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm icon-description text-chatlook-gray"></span>
                        <span className="text-xs font-semibold text-chatlook-gray block">
                          Max 5 Brochure
                        </span>
                      </div>
                      <div className="flex relative -mx-1">
                        {allBrochure.length > 0 ? (
                          allBrochure?.map((items, index) => {
                            console.log("items", items);
                            return (
                              <div className="w-28 h-28 p-1">
                                <div className="relative w-full h-full overflow-hidden rounded group bg-chatlook-dark">
                                  <img
                                    src={`${items?.s3_url}${items?.url}`}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:opacity-50"
                                  />
                                  <span className="group absolute right-2 top-2 w-7 h-7 rounded-full border border-chatlook-red bg-chatlook-red flex items-center justify-center hover:bg-white cursor-pointer translate-x-20 group-hover:translate-x-0 anim">
                                    <span
                                      className="icon-delete text-sm text-white how hover:text-chatlook-red"
                                      onClick={() => {
                                        handleremoveBrochure(items, index);
                                      }}
                                    ></span>
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <h1 className="w-full flex items-center justify-center">
                            No Brochure Found
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-2.5">
                  <span className="text-sm font-semibold text-chatlook-dark ">
                    Add Brochure
                  </span>
                  <div className="w-full shadow-md rounded-md">
                    <div className="w-full h-10 bg-chatlook-grayLight rounded-md border border-dashed border-chatlook-gray relative flex items-center justify-center">
                      <ImagePicker
                        isDefaultDesign={false}
                        showPreview={true}
                        label={false}
                        className="h-full w-full"
                        classNameMain="h-full w-full justify-center"
                        classNameDiv="h-full w-full"
                        onDrop={(files) => {
                          console.log("file", files);
                          console.log(
                            "allBrochure?.length ",
                            allBrochure?.length
                          );
                          if (allBrochure?.length < 5) {
                            setMaxFile(false);
                            Promise.all(
                              files.map(async (element) => {
                                const pdfs = new FormData();
                                pdfs.append("file", element);
                                const response = await dispatch(
                                  uplaodbusinessPhotos(pdfs)
                                );
                                console.log("response", response);
                                return response?.payload?.data?.Data;
                              })
                            ).then((brochureArray) => {
                              setAllPhotos((pre) => [...pre, ...brochureArray]);
                            });
                          } else {
                            setMaxFile(true);
                            toast.error("please uplaod 5 files");
                          }
                        }}
                        accept=".pdf"
                      >
                        <div className="brochure-main-div h-full w-full">
                          <div className="brochure-div h-full w-full">
                            <div className="flex items-center h-full w-full justify-center">
                              {/* <AiOutlineUpload /> */}
                              <span className="icon-upload-2 text-base text-chatlook-gray"></span>
                              {uploadedPdfMessage !== "" ? (
                                <p className="p-2 text-sm text-green-500">
                                  {uploadedPdfMessage}
                                </p>
                              ) : (
                                <p className="p-2 text-sm font-bold">
                                  Add Image
                                </p>
                              )}
                              {/* <p className="p-2 text-sm">Upload Brochure PDF</p> */}
                            </div>
                            <span className="error-msg-span">{pdfError}</span>
                            <p style={{ fontSize: "10px" }}>
                              {brochureProfile ? brochureProfile : null}
                            </p>
                          </div>
                        </div>
                      </ImagePicker>
                    </div>
                    <div className="p-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm icon-description text-chatlook-gray"></span>
                        <span className="text-xs font-semibold text-chatlook-gray block">
                          Max 5 Images
                        </span>
                      </div>
                      <div className="flex relative -mx-1">
                        {allPhotos.length > 0 ? (
                          allPhotos?.map((items, index) => {
                            console.log("items", items);
                            return (
                              <div className="w-28 h-28 p-1">
                                <div className="relative w-full h-full overflow-hidden rounded group bg-chatlook-dark">
                                  <img
                                    src={`${items?.s3_url}${items?.url}`}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:opacity-50"
                                  />
                                  <span className="group absolute right-2 top-2 w-7 h-7 rounded-full border border-chatlook-red bg-chatlook-red flex items-center justify-center hover:bg-white cursor-pointer translate-x-20 group-hover:translate-x-0 anim">
                                    <span
                                      className="icon-delete text-sm text-white how hover:text-chatlook-red"
                                      onClick={() => {
                                        handleremovePhotos(items, index);
                                      }}
                                    ></span>
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <h1 className="w-full flex items-center justify-center">
                            No Photo Found
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-2.5">
                  <span className="text-sm font-semibold text-chatlook-dark ">
                    Add Brochure
                  </span>
                  <div className="w-full shadow-md rounded-md">
                    <div className="w-full h-10 bg-chatlook-grayLight rounded-md border border-dashed border-chatlook-gray relative flex items-center justify-center">
                      <ImagePicker
                        isDefaultDesign={false}
                        showPreview={true}
                        label={false}
                        className="h-full w-full"
                        classNameMain="h-full w-full justify-center"
                        classNameDiv="h-full w-full"
                        onDrop={(files) => {
                          console.log("file", files);
                          console.log(
                            "allBrochure?.length ",
                            allBrochure?.length
                          );
                          if (allBrochure?.length < 2) {
                            setMaxFile(false);
                            Promise.all(
                              files.map(async (element) => {
                                const pdfs = new FormData();
                                pdfs.append("file", element);
                                const response = await dispatch(
                                  uplaodbusinessVideo(pdfs)
                                );
                                console.log("response", response);
                                return response?.payload?.data?.Data;
                              })
                            ).then((brochureArray) => {
                              setAllVideos((pre) => [...pre, ...brochureArray]);
                            });
                          } else {
                            setMaxFile(true);
                            toast.error("please uplaod 5 files");
                          }
                        }}
                        accept=".pdf"
                      >
                        <div className="brochure-main-div h-full w-full">
                          <div className="brochure-div h-full w-full">
                            <div className="flex items-center h-full w-full justify-center">
                              {/* <AiOutlineUpload /> */}
                              <span className="icon-upload-2 text-base text-chatlook-gray"></span>
                              {uploadedPdfMessage !== "" ? (
                                <p className="p-2 text-sm text-green-500">
                                  {uploadedPdfMessage}
                                </p>
                              ) : (
                                <p className="p-2 text-sm font-bold">
                                  Add Video
                                </p>
                              )}
                              {/* <p className="p-2 text-sm">Upload Brochure PDF</p> */}
                            </div>
                            <span className="error-msg-span">{pdfError}</span>
                            <p style={{ fontSize: "10px" }}>
                              {brochureProfile ? brochureProfile : null}
                            </p>
                          </div>
                        </div>
                      </ImagePicker>
                    </div>
                    <div className="p-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm icon-description text-chatlook-gray"></span>
                        <span className="text-xs font-semibold text-chatlook-gray block">
                          Max 2 Video
                        </span>
                      </div>
                      <div className="flex relative -mx-1">
                        {allVideos.length > 0 ? (
                          allVideos?.map((items, index) => {
                            console.log("items", items);
                            return (
                              <div className="w-28 h-28 p-1">
                                <div className="relative w-full h-full overflow-hidden rounded group bg-chatlook-dark">
                                  <img
                                    src={`${items?.s3_url}${items?.url}`}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:opacity-50"
                                  />
                                  <span className="group absolute right-2 top-2 w-7 h-7 rounded-full border border-chatlook-red bg-chatlook-red flex items-center justify-center hover:bg-white cursor-pointer translate-x-20 group-hover:translate-x-0 anim">
                                    <span
                                      className="icon-delete text-sm text-white how hover:text-chatlook-red"
                                      onClick={() => {
                                        handleremoveVideo(items, index);
                                      }}
                                    ></span>
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <h1 className="w-full flex items-center justify-center">
                            No Video Found
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full w-full my-2">
                <input
                  type="text"
                  placeholder="Interested Business Category"
                  className="w-full bg-chatlook-grayLight p-3 rounded-[5px]"
                  name="interestedCategory"
                  value={values.interestedCategory}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
                <span className="error-msg-span">
                  {errors.interestedCategory &&
                    touched.interestedCategory &&
                    errors.interestedCategory}
                </span>
              </div>
              <div className="pb-2.5">
                <h4 className="mb-2">Location</h4>
                <Maps
                  handleClick={handleClick}
                  latitude={lati ? lati : 21.1702}
                  longitude={long ? long : 72.8311}
                  loadMap={loadMap}
                  latLngChange={latLngChange}
                  search={false}
                  styleHeight={{ height: "300px" }}
                />
                <span className="error-msg-span">{locationError}</span>
              </div>
              <h4 className="">Business Address</h4>
              <div className="flex flex-wrap  pb-2.5 -mx-2.5">
                <div className="w-full md:w-1/2 p-2.5 ">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="Flat No"
                      className="w-full"
                      name="address.flatno"
                      value={values.address?.flatno}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.address?.flatno &&
                      touched.address?.flatno &&
                      errors.address?.flatno}
                  </span>
                </div>
                <div className="w-full md:w-1/2 p-2.5">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="Street No"
                      className="w-full"
                      name="address.street"
                      value={values.address?.street}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.address?.street &&
                      touched.address?.street &&
                      errors.address?.street}
                  </span>
                </div>
                <div className="w-full md:w-1/2 p-2.5 ">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="Area Name"
                      className="w-full"
                      name="address.area"
                      value={values.address?.area}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.address?.area &&
                      touched.address?.area &&
                      errors.address?.area}
                  </span>
                </div>
                <div className="w-full md:w-1/2 p-2.5">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="City*"
                      className="w-full"
                      name="name"
                      value={values.address?.city}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.address?.city &&
                      touched.address?.city &&
                      errors.address?.city}
                  </span>
                </div>
                <div className="w-full md:w-1/2 p-2.5 ">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="State*"
                      className="w-full"
                      name="address.state"
                      value={values.address?.state}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.address?.state &&
                      touched.address?.state &&
                      errors.address?.state}
                  </span>
                </div>
                <div className="w-full md:w-1/2 p-2.5">
                  <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                    <input
                      type="text"
                      placeholder="Pincode*"
                      className="w-full"
                      name="address.pincode"
                      value={values.address?.pincode}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <span className="error-msg-span">
                    {errors.address?.pincode &&
                      touched.address?.pincode &&
                      errors.address?.pincode}
                  </span>
                </div>
              </div>
              <h4>Add Your Social Media Links</h4>
              <div className="w-full flex flex-wrap items-center">
                <div className="w-full md:w-1/2 pt-3 md:pr-2">
                  <label className="flex items-center bg-chatlook-grayLight p-3 rounded">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21Z"
                        fill="#3B5998"
                      />
                      <path
                        d="M13.1395 10.9111H11.2659V17.7751H8.42722V10.9111H7.07715V8.49881H8.42722V6.93779C8.42722 5.82149 8.95748 4.07349 11.2911 4.07349L13.3938 4.08228V6.42381H11.8682C11.618 6.42381 11.2661 6.54884 11.2661 7.08135V8.50105H13.3875L13.1395 10.9111Z"
                        fill="white"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Facebook link"
                      className="px-3 w-full"
                      value={getInputVal("Facebook")}
                      onChange={(e) =>
                        onSocialMedia(e.target.value, "Facebook")
                      }
                      // errors={errors}
                      // touched={touched}
                      //
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/2 pt-3 md:pl-2">
                  <label className="flex items-center bg-chatlook-grayLight p-3 rounded">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 21.5469C16.8249 21.5469 21.5469 16.8249 21.5469 11C21.5469 5.17512 16.8249 0.453125 11 0.453125C5.17512 0.453125 0.453125 5.17512 0.453125 11C0.453125 16.8249 5.17512 21.5469 11 21.5469Z"
                        fill="url(#paint0_linear_1077_807)"
                      />
                      <path
                        d="M13.2408 5.14062H8.76426C6.76738 5.14062 5.14551 6.7625 5.14551 8.75937V13.2359C5.14551 15.2328 6.76738 16.8547 8.76426 16.8547H13.2408C15.2377 16.8547 16.8596 15.2328 16.8596 13.2359V8.75937C16.8596 6.7625 15.2377 5.14062 13.2408 5.14062ZM15.5518 13.2406C15.5518 14.5156 14.5158 15.5562 13.2361 15.5562H8.75957C7.48457 15.5562 6.44395 14.5203 6.44395 13.2406V8.76406C6.44395 7.48906 7.47988 6.44844 8.75957 6.44844H13.2361C14.5111 6.44844 15.5518 7.48438 15.5518 8.76406V13.2406Z"
                        fill="white"
                      />
                      <path
                        d="M11.0002 8.00464C9.35019 8.00464 8.00488 9.34995 8.00488 11C8.00488 12.65 9.35019 13.9953 11.0002 13.9953C12.6502 13.9953 13.9955 12.65 13.9955 11C13.9955 9.34995 12.6502 8.00464 11.0002 8.00464ZM11.0002 12.8187C9.99707 12.8187 9.18144 12.0031 9.18144 11C9.18144 9.99683 9.99707 9.1812 11.0002 9.1812C12.0033 9.1812 12.8189 9.99683 12.8189 11C12.8189 12.0031 12.0033 12.8187 11.0002 12.8187Z"
                        fill="white"
                      />
                      <path
                        d="M14.2237 8.33302C14.4996 8.28828 14.6871 8.02831 14.6423 7.75234C14.5976 7.47638 14.3376 7.28894 14.0617 7.33367C13.7857 7.37841 13.5983 7.63838 13.643 7.91435C13.6877 8.19031 13.9477 8.37775 14.2237 8.33302Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1077_807"
                          x1="2.96933"
                          y1="19.0307"
                          x2="17.9576"
                          y2="4.04239"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FEE411" />
                          <stop offset="0.0518459" stopColor="#FEDB16" />
                          <stop offset="0.1381" stopColor="#FEC125" />
                          <stop offset="0.2481" stopColor="#FE983D" />
                          <stop offset="0.3762" stopColor="#FE5F5E" />
                          <stop offset="0.5" stopColor="#FE2181" />
                          <stop offset="1" stopColor="#9000DC" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <input
                      type="text"
                      placeholder="Intagram link"
                      className="px-3 w-full"
                      value={getInputVal("Instagram")}
                      onChange={(e) =>
                        onSocialMedia(e.target.value, "Instagram")
                      }
                      // errors={errors}
                      // touched={touched}
                      //
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/2 pt-3 md:pr-2">
                  <label className="flex items-center bg-chatlook-grayLight p-3 rounded">
                    <img src={Twitter} className="w-6 h-6" alt="" />
                    <input
                      type="text"
                      placeholder="Twitter link"
                      className="px-3 w-full"
                      value={getInputVal("Twitter")}
                      onChange={(e) => onSocialMedia(e.target.value, "Twitter")}
                      // errors={errors}
                      // touched={touched}
                      //
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/2 pt-3 md:pl-2">
                  <label className="flex items-center bg-chatlook-grayLight p-3 rounded">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21Z"
                        fill="#007AB9"
                      />
                      <path
                        d="M16.7737 11.3448V15.6738H14.2639V11.6349C14.2639 10.6208 13.9015 9.92831 12.9928 9.92831C12.2993 9.92831 11.8873 10.3946 11.7054 10.846C11.6393 11.0074 11.6223 11.2314 11.6223 11.4577V15.6736H9.11233C9.11233 15.6736 9.14602 8.83316 9.11233 8.12509H11.6225V9.19478C11.6174 9.2032 11.6103 9.21144 11.6058 9.21948H11.6225V9.19478C11.956 8.68155 12.5509 7.94783 13.8845 7.94783C15.5357 7.94783 16.7737 9.0267 16.7737 11.3448ZM6.48667 4.48645C5.62811 4.48645 5.06641 5.05003 5.06641 5.79048C5.06641 6.51521 5.61183 7.09507 6.45373 7.09507H6.47001C7.34542 7.09507 7.88972 6.51521 7.88972 5.79048C7.87306 5.05003 7.34542 4.48645 6.48667 4.48645ZM5.21558 15.6738H7.72463V8.12509H5.21558V15.6738Z"
                        fill="#F1F2F2"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Linkedin link"
                      className="px-3 w-full"
                      value={getInputVal("Linkdin")}
                      onChange={(e) => onSocialMedia(e.target.value, "Linkdin")}
                      // errors={errors}
                      // touched={touched}
                      //
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/2 pt-3 md:pr-2">
                  <label className="flex items-center bg-chatlook-grayLight p-3 rounded">
                    <img src={ptt} alt="" />
                    <input
                      type="text"
                      placeholder="Pinterest link"
                      className="px-3 w-full"
                      value={getInputVal("Pinterest")}
                      onChange={(e) =>
                        onSocialMedia(e.target.value, "Pinterest")
                      }
                      // errors={errors}
                      // touched={touched}
                      //
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/2 pt-3 md:pl-2">
                  <label className="flex items-center bg-chatlook-grayLight p-3 rounded">
                    <img src={yt} alt="" />
                    <input
                      type="text"
                      placeholder="YouTube Link"
                      className="px-3 w-full"
                      value={getInputVal("Youtube")}
                      onChange={(e) => onSocialMedia(e.target.value, "Youtube")}
                      // errors={errors}
                      // touched={touched}
                      //
                    />
                  </label>
                </div>
              </div>
              <h4 className="text-chatlook-sky mt-4 cursor-pointer">
                +Business Hours
              </h4>
              {/* <div className="pb-[30px] flex flex-wrap -mx-2.5">
                <div className="w-full md:w-1/2 p-2.5">
                  <input
                    type="text"
                    placeholder="Interested Business Subcategory"
                    className="w-full bg-chatlook-grayLight p-3 rounded-[5px]"
                    name="interestedSubCategory"
                    value={values.interestedSubCategory}
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                  />
                  <span className="error-msg-span">
                    {errors.interestedSubCategory &&
                      touched.interestedSubCategory &&
                      errors.interestedSubCategory}
                  </span>
                </div>
              </div> */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={() => {
                    if (status == "denied") {
                      setLocationError(
                        "Unable to access location. Please enable location permissions to proceed."
                      );
                    } else {
                      setLocationError("");
                    }
                  }}
                  className="btn-form"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
