import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateBusinessProfile from "./CreateBusinessProfile";
import {
    profileGet,
    profilePictureSet,
    profileSet,
    useProfileGets,
} from "../../../redux/Slice/profileSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImagePicker from "../../../Common/ImagePicker";
import { AiFillEdit } from "react-icons/ai";
import Maps from "../../../Common/Maps";
import Select from "react-select";
import MultiRange from "../../../Common/MultiRange";
import CommonChip from "../../../Common/Chips/CommonChip";
import Slider from "rc-slider";
import { Context } from "../../../createContext";
import Modal from "../../../Common/Modals/Modal";
import DatePicker from "react-datepicker";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { Secondary, Success } from "../../../redux/services/toastServices";

let marker;
let links = [
    {
        platform: "Facebook",
        link: "",
    },
    {
        platform: "Instagram",
        link: "",
    },
    {
        platform: "Twitter",
        link: "",
    },
    {
        platform: "Linkdin",
        link: "",
    },
];
export default function CreatePersonalProfileTwo({
    setIsProfileCreatePopup,
}) {
    const navigate = useNavigate();
    const profileGets = useProfileGets();
    const [startDate, setStartDate] = useState();

    const { personalProfileGetApi } = useContext(Context);
    const [isHide, setIsHide] = useState(true);
    const [hobby, setHobby] = useState([]);
    const [lati, setLati] = useState(profileGets?.location?.coordinates[1]);
    const [long, setLong] = useState(profileGets?.location?.coordinates[0]);
    const [imageProfile, setImageProfile] = useState();
    const [isInterestedIn, setIsInterestedIn] = useState(
        profileGets?.interestedin,
    );
    const [socialMediaLink, setSocialMediaLink] = useState(links);
    const [chips, setChips] = useState(profileGets?.hobbies);

    const onChipsChange = (data) => {
        setChips(data);
    };

    const dispatch = useDispatch();
    // const { isPersonalProfileModal, onPrCloseModal } = props;
    // const [isBusinessProfileModalOpen, setIsBusinessProfileModalOpen] =
    //   useState(false);
    // const onBuCloseModal = () => {
    //   setIsBusinessProfileModalOpen(false);
    // };
    const nameTypeStyles = {
        control: (styles) => ({
            ...styles,
            borderColor: "#f1f1f1",
            background: "#f1f1f1",
            height: "24px",
        }),
    };
    const initialValues = {
        fullName: "",
        userName: "",
        nickName: "",
        emailId: "",
        gender: "",
        areaRange: 0,
        aboutUs: "",
        targetAudienceAgeMin: null,
        targetAudienceAgeMax: null,
    };


    const validationSchema = Yup.object({
        fullName: Yup.string().required("*Fullname require"),
        userName: Yup.string().required("*Username require"),
        nickName: Yup.string().required("*Nickname require"),
        emailId: Yup.string().email("Enter Valid Email Address").required("*Emailid require"),
        // dob: Yup.string().required("*Dob require"),
        gender: Yup.string().required("*Gender require"),
        areaRange: Yup.string().required("*Arearange require"),
        aboutUs: Yup.string().required("*Aboutus require"),
    });

    const updateProfilePicture = async (files) => {
        try {
            let formData = new FormData();
            formData.append("file", files[0]);
            const response = await dispatch(profilePictureSet(formData)).unwrap();
            if (response.data.IsSuccess) {
                Success(response.data.Message);
                setImageProfile(
                    `${response.data.Data.s3_url}${response.data.Data.Key}`,
                );
            } else {
                Secondary(response.Message);
            }
        } catch (error) {
            console.log(error);
            Secondary("SOMETHING WENT WRONG.");
        }
    };
    const setPersonalProfile = async (values) => {

        try {

            let payload = Object.assign({}, values);
            payload["latitude"] = lati;
            payload["longitude"] = long;
            payload["hobbies"] = chips;
            payload["socialMediaLinks"] = socialMediaLink;
            payload["interestedin"] = isInterestedIn;
            payload["dob"] = moment(startDate).format("DD/MM/YYYY");
            const response = await dispatch(profileSet(payload)).unwrap();
            if (response.data.IsSuccess) {
                personalProfileGetApi();
                Success(response.data.Message);
                setIsProfileCreatePopup(false)
            } else {
                Secondary(response.Message);
            }
        } catch (error) {
            console.log(error);
            Secondary("SOMETHING WENT WRONG.");
        }
    };
    useEffect(() => {
        personalProfileGetApi();
    }, []);
    useEffect(() => {
        if (!profileGets) {
            return;
        }
        let temp = profileGets?.dob?.split("/");

        let date = new Date();
        date.setFullYear(temp[2]);
        date.setMonth(parseInt(temp[1]) - 1);
        date.setDate(temp[0]);
        setStartDate(profileGets.dob ? new Date(date) : new Date());

        if (!lati) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setLati(position.coords.latitude);
                    setLong(position.coords.longitude);
                },
                function (error) {
                    console.error("Error Code = " + error.code + " - " + error.message);
                },
            );
        }

        setValues({
            ...values,
            fullName: profileGets?.fullName ? profileGets?.fullName : "",
            userName: profileGets?.userName ? profileGets?.userName : "",
            nickName: profileGets?.nickName ? profileGets?.nickName : "",
            emailId: profileGets?.emailId ? profileGets?.emailId : "",
            dob: profileGets?.dob ? profileGets?.dob : "",
            gender: profileGets?.gender ? profileGets?.gender : "",
            interestedin: profileGets?.interestedin ? profileGets?.interestedin : "",
            areaRange: profileGets?.areaRange ? profileGets?.areaRange : 0,
            aboutUs: profileGets?.aboutUs ? profileGets?.aboutUs : "",
            targetAudienceAgeMin: profileGets?.targetAudienceAgeMin
                ? profileGets?.targetAudienceAgeMin
                : 0,
            targetAudienceAgeMax: profileGets?.targetAudienceAgeMax
                ? profileGets?.targetAudienceAgeMax
                : 0,
            hobbies: hobby ? hobby : [],
            latitude: lati,
            longitude: long,
            socialMediaLinks: profileGets?.socialMediaLinks,
        });
        let allLinks = profileGets?.socialMediaLinks?.length
            ? [...profileGets?.socialMediaLinks]
            : [...links];
        setSocialMediaLink(allLinks);
    }, [profileGets]);

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

        setPersonalProfile(values);
    };
    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setValues,
        handleBlur,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const genderOption = [
        { value: "male", label: "male" },
        { value: "female", label: "female" },
        { value: "other", label: "other" },
    ];
    const getInputVal = (key) => {
        let mediaLink = socialMediaLink?.find((val) => val.platform === key);
        return mediaLink?.link;
    };
    const onSocialMedia = (val, key) => {
        let i = socialMediaLink?.findIndex((val) => val.platform === key);
        if (i > -1) {
            let array = Object.assign([], socialMediaLink);
            array[i] = { ...array[i], link: val };
            setSocialMediaLink(array);
        }
    };

    return (
        <>
            <div>
                <div className="fixed inset-0 w-full h-screen bg-black/60 overflow-hidden z-50">
                    <div className="h-full w-full overflow-y-auto py-10 px-4">
                        <div
                            className="absolute z-10 top-0 bottom-0 right-0 left-0 h-full w-full"
                            onClick={() => {
                                setIsProfileCreatePopup(false);
                                // setIsCreateYourProfilePopUpOpen(false);
                            }}
                        ></div>
                        <div
                            className="w-full max-w-[800px] bg-white p-8 xl:p-12 shadow-one rounded-[10px] mx-auto relative"
                            style={{ zIndex: "9999999999999" }}
                        >
                            <div className="flex items-center">
                                <div
                                    onClick={() => setIsProfileCreatePopup(false)}
                                    className="icon-back text-3xl text-chatlook-sky cursor-pointer"
                                ></div>
                                <h2 className="pl-5">Create Personal Profile</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="pt-5 md:pt-10">
                                <div className="relative pb-7">
                                    <div className="w-32 h-32 bg-chatlook-grayLight border border-chatlook-sky rounded-full p-1 relative mx-auto">
                                        <ImagePicker
                                            isDefaultDesign={false}
                                            showPreview={true}
                                            label={false}
                                            classNameMain="flex items-center justify-center w-full h-full"
                                            onDrop={(files) => {
                                                updateProfilePicture(files);
                                            }}
                                        >
                                            {imageProfile ? (
                                                <div className="w-full h-full rounded-full overflow-hidden">
                                                    <img
                                                        src={imageProfile}
                                                        className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                                                    />
                                                </div>
                                            ) : profileGets.profileimage ? (
                                                <div className="w-full h-full rounded-full overflow-hidden">
                                                    <img
                                                        className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                                                        src={`https://festumfield.s3.ap-south-1.amazonaws.com/${profileGets.profileimage}`}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex justify-center items-center icon-user text-6xl rounded-full text-chatlook-gray" />
                                            )}
                                            <div className="pen-div d-flex justify-content-end">
                                                <div className="w-9 h-9 absolute bottom-0 right-0 text-lg bg-chatlook-sky text-white rounded-full z-10 icon-pencil flex justify-center items-center"></div>
                                            </div>
                                        </ImagePicker>

                                        {/* </label> */}
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center pb-5 -mx-3">
                                    <div className="w-full md:w-1/2 p-2.5">
                                        <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full"
                                                name="fullName"
                                                value={values.fullName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                touched={touched}
                                            />
                                        </div>
                                        <span className="error-msg-span">
                                            {errors.fullName && touched.fullName && errors.fullName}
                                        </span>
                                    </div>
                                    <div className="w-full md:w-1/2 p-2.5">
                                        <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                className="w-full"
                                                name="userName"
                                                value={values.userName}
                                                onChange={handleChange}
                                                touched={touched}
                                            />
                                        </div>
                                        <span className="error-msg-span">
                                            {errors.userName && touched.userName && errors.userName}
                                        </span>
                                    </div>
                                    <div className="w-full md:w-1/2 p-2.5">
                                        <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                                            <input
                                                type="text"
                                                placeholder="Nickname"
                                                className="w-full"
                                                name="nickName"
                                                value={values.nickName}
                                                onChange={handleChange}
                                                errors={errors}
                                                touched={touched}
                                            />
                                        </div>
                                        <span className="error-msg-span">
                                            {errors.nickName && touched.nickName && errors.nickName}
                                        </span>
                                    </div>
                                    <div className="w-full md:w-1/2 p-2.5">
                                        <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                                            <input
                                                type="text"
                                                placeholder="Email Id"
                                                className="w-full"
                                                name="emailId"
                                                value={values.emailId}
                                                onChange={handleChange}
                                                errors={errors}
                                                touched={touched}
                                            />
                                        </div>
                                        <span className="error-msg-span">
                                            {errors.emailId && touched.emailId && errors.emailId}
                                        </span>
                                    </div>
                                    <div className="w-full md:w-1/2 p-2.5">
                                        <div
                                            id="cal1"
                                            className="bg-chatlook-grayLight rounded-[5px] w-full relative flex items-center"
                                        >
                                            <Calendar
                                                readOnlyInput
                                                name="dob"
                                                value={startDate}
                                                appendTo="self"
                                                className="w-full absolute top-0"
                                                visible={true}
                                                placeholder="Select Your Birthdate"
                                                dateFormat="dd/mm/yy"
                                                onChange={(e) => setStartDate(e.value)}
                                            />
                                        </div>
                                        {!startDate && (
                                            <span className="error-msg-span">
                                                {errors.dob && touched.dob && errors.dob}
                                            </span>
                                        )}
                                    </div>
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
                                                    (option) => option.value === values.gender,
                                                )}
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
                                    <div className="w-full p-2.5">
                                        <textarea
                                            name="aboutUs"
                                            id=""
                                            rows="3"
                                            className="w-full bg-chatlook-grayLight p-3 rounded-[5px] text-chatlook-gray font-medium resize-none focus-visible:outline-none"
                                            placeholder="About us"
                                            value={values.aboutUs}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                        />
                                        <span className="error-msg-span">
                                            {errors.aboutUs && touched.aboutUs && errors.aboutUs}
                                        </span>
                                    </div>
                                    <div className="w-full p-2.5">
                                        <h4 className="pb-2.5">Hobby</h4>
                                        <CommonChip
                                            chips={chips}
                                            onChange={(data) => onChipsChange(data)}
                                            className="w-full bg-chatlook-grayLight p-3 rounded-[5px] text-chatlook-gray font-medium resize-none focus-visible:outline-none"
                                            placeholder="Enter Your Hobby"
                                        />
                                    </div>
                                </div>
                                <div className="pb-5">
                                    <h4>Location</h4>
                                    <Maps
                                        style={{ border: "0" }}
                                        handleClick={handleClick}
                                        latitude={lati ? lati : 21.1702}
                                        longitude={long ? long : 72.8311}
                                        loadMap={loadMap}
                                        latLngChange={latLngChange}
                                        search={false}
                                        styleHeight={{ height: "300px" }}
                                    />
                                    {/* <span className="error-msg-span">
                      {errors.targetAudienceAgeMin && touched.targetAudienceAgeMin && errors.targetAudienceAgeMin}
                      {errors.targetAudienceAgeMax && touched.targetAudienceAgeMax && errors.targetAudienceAgeMax}
                    </span> */}
                                </div>

                                <div className="flex justify-between items-center">
                                    <h4 className="inline-block">Interested Area Range</h4>
                                    <h4 className="inline-block text-chatlook-sky font-normal text-base">
                                        <span className="text-chatlook-sky font-normal text-base">
                                            {values.areaRange}
                                        </span>
                                        KM
                                    </h4>
                                </div>

                                <div className="">
                                    <Slider
                                        value={values.areaRange}
                                        defaultValue={values?.areaRange ? values.areaRange : 0}
                                        onChange={(e) => {
                                            setValues({
                                                ...values,
                                                areaRange: e,
                                            });
                                        }}
                                        min={0}
                                        max={50}
                                        trackStyle={{ backgroundColor: "#2DCAD4" }}
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <span className="error-msg-span">
                                        {errors.areaRange && touched.areaRange && errors.areaRange}
                                    </span>
                                </div>

                                <div className="flex items-start flex-wrap py-5 -mx-2.5">
                                    <div className="w-full md:w-1/2 p-2.5">
                                        <div className="flex justify-between items-center pb-2">
                                            <label className="text-sm tracking-wider leading-4 font-medium text-chatlook-dark">
                                                Interested in
                                            </label>
                                            <label className="interested_in flex items-center text-black mb-0 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="circle sky"
                                                    style={{ borderRadius: "50%" }}
                                                    onClick={() => setIsHide(!isHide)}
                                                />
                                                <b className="text-chatlook-gray font-bold block pl-1 text-xs">
                                                    HIDE
                                                </b>
                                            </label>
                                        </div>
                                        {isHide ? (
                                            <div className="flex items-start space-x-1">
                                                <button
                                                    type="button"
                                                    className={
                                                        isInterestedIn === "male"
                                                            ? "w-[116px] h-10 rounded-tl-md rounded-bl-md bg-chatlook-sky text-white text-sm font-medium cursor-pointer"
                                                            : "w-[116px] rounded-tl-md rounded-bl-md h-10 bg-chatlook-skyLight text-chatlook-sky text-sm font-medium cursor-pointer"
                                                    }
                                                    onClick={() => setIsInterestedIn("male")}
                                                >
                                                    Male
                                                </button>
                                                <button
                                                    type="button"
                                                    className={
                                                        isInterestedIn === "female"
                                                            ? "w-[116px] h-10 bg-chatlook-sky text-white text-sm font-medium cursor-pointer"
                                                            : "w-[116px] h-10 bg-chatlook-skyLight text-chatlook-sky text-sm font-medium cursor-pointer"
                                                    }
                                                    onClick={() => setIsInterestedIn("female")}
                                                >
                                                    Female
                                                </button>
                                                <button
                                                    type="button"
                                                    className={
                                                        isInterestedIn === "other"
                                                            ? "w-[116px] h-10 rounded-tr-md rounded-br-md bg-chatlook-sky text-white text-sm font-medium cursor-pointer"
                                                            : "w-[116px] rounded-tr-md rounded-br-md h-10 bg-chatlook-skyLight text-chatlook-sky text-sm font-medium cursor-pointer"
                                                    }
                                                    onClick={() => setIsInterestedIn("other")}
                                                >
                                                    Other
                                                </button>
                                            </div>
                                        ) : null}
                                        {!isInterestedIn && (
                                            <span className="error-msg-span">
                                                *Interestedin require
                                            </span>
                                        )}
                                    </div>
                                    <div className="w-full md:w-1/2 p-2.5">
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm font-bold text-chatlook-dark inline-block">
                                                Interested Age Range
                                            </div>
                                            <div className="text-base text-chatlook-sky flex items-center">
                                                <span id="range1" className="text-base text-chatlook-sky">
                                                    {values.targetAudienceAgeMin}
                                                </span>
                                                -
                                                <span
                                                    id="range2"
                                                    className="mr-2 text-base text-chatlook-sky"
                                                >
                                                    {values.targetAudienceAgeMax}
                                                </span>
                                                Age
                                            </div>
                                        </div>

                                        <div className="wrapper w-full relative mt-3 rounded-xl">
                                            <Slider
                                                range
                                                allowCross={false}
                                                min={18}
                                                max={30}
                                                defaultValue={[
                                                    values.targetAudienceAgeMin,
                                                    values.targetAudienceAgeMax,
                                                ]}
                                                value={[
                                                    values.targetAudienceAgeMin,
                                                    values.targetAudienceAgeMax,
                                                ]}
                                                onChange={(e) => {
                                                    setValues({
                                                        ...values,
                                                        targetAudienceAgeMin: e[0],
                                                        targetAudienceAgeMax: e[1],
                                                    });
                                                }}
                                                trackStyle={{ backgroundColor: "#2DCAD4" }}
                                            />
                                            {values.targetAudienceAgeMin == 0 && (
                                                <span className="error-msg-span">
                                                    *Interested Age Range require
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-[30px]">
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
                                                <svg
                                                    width="21"
                                                    height="21"
                                                    viewBox="0 0 21 21"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21Z"
                                                        fill="#03A9F4"
                                                    />
                                                    <path
                                                        d="M17.3015 6.28201C16.7899 6.50545 16.2487 6.65389 15.6947 6.72274C16.2787 6.37642 16.7153 5.82777 16.9216 5.18089C16.375 5.50534 15.7769 5.73383 15.1532 5.85649C14.771 5.44775 14.2746 5.16347 13.7287 5.04065C13.1827 4.91782 12.6125 4.96212 12.092 5.16779C11.5716 5.37345 11.1251 5.73097 10.8106 6.19383C10.4961 6.65669 10.3282 7.20347 10.3287 7.76306C10.3267 7.97666 10.3485 8.18981 10.3936 8.39859C9.28418 8.3441 8.19871 8.05617 7.20811 7.55361C6.21752 7.05105 5.34409 6.34517 4.64487 5.48208C4.28547 6.09606 4.17412 6.82413 4.33359 7.51747C4.49306 8.21081 4.9113 8.81707 5.50283 9.21234C5.06131 9.20044 4.62914 9.08244 4.24283 8.86833V8.89872C4.24408 9.5423 4.46684 10.1658 4.87368 10.6645C5.28052 11.1632 5.84663 11.5066 6.47685 11.637C6.23835 11.6997 5.99258 11.7303 5.74599 11.7282C5.56844 11.7315 5.39105 11.7157 5.21685 11.6812C5.3974 12.2347 5.74501 12.7187 6.21186 13.0665C6.67872 13.4144 7.24188 13.609 7.82389 13.6237C6.83761 14.3946 5.62175 14.8134 4.36994 14.8133C4.14689 14.8152 3.92397 14.8022 3.70264 14.7746C4.97904 15.5975 6.46684 16.0323 7.98553 16.0263C13.1181 16.0263 15.9241 11.7752 15.9241 8.0905C15.9241 7.96754 15.9241 7.84872 15.9144 7.72991C16.4609 7.33552 16.9309 6.84488 17.3015 6.28201Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                <input
                                                    type="text"
                                                    placeholder="Twitter link"
                                                    className="px-3 w-full"
                                                    value={getInputVal("Twitter")}
                                                    onChange={(e) =>
                                                        onSocialMedia(e.target.value, "Twitter")
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
                                                    onChange={(e) =>
                                                        onSocialMedia(e.target.value, "Linkdin")
                                                    }
                                                // errors={errors}
                                                // touched={touched}
                                                //
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex items-center justify-end space-y-3 md:space-y-0 md:space-x-5">
                                    {/* <button
                                        type="submit"
                                        onClick={() => {
                                            setIsCreateBusinessProfilePopUpOpen(true);
                                        }}
                                        className="w-auto p-2 lg:p-3 bg-transparent border border-chatlook-sky text-chatlook-sky text-sm lg:text-lg rounded-[5px]"
                                    >
                                        Save and create business profile
                                    </button> */}
                                    <button type="submit" className="btn-form">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <Modal isOpen={isCreateBusinessProfilePopUpOpen}>
                    <CreateBusinessProfile
                        setIsProfileCreatePopup={setIsCreateBusinessProfilePopUpOpen}
                        businessModalClose={setIsProfileCreatePopup}
                        setIsCreateYourProfilePopUpOpen={setIsCreateYourProfilePopUpOpen}
                    />
                </Modal> */}
            </div>
        </>
    );
}
