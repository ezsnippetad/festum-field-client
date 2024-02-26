import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    brochureSet,
    businessProfileGet,
    businessProfilePickSet,
    businessProfileSet,
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

let marker;
export default function CreateBusinessProfileTwo({
    setIsBusinessProfileCreatePopup,
}) {
    const { businessProfileGetApi } = useContext(Context);
    const navigate = useNavigate();
    const businessProfileGets = useBusinessProfileGets();
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
    const [imageProfile, setImageProfile] = useState();
    const { status, error } = useNavigatorPermissions('geolocation')
    const [locationError, setLocationError] = useState("")

    const [brochureProfile, setbrochureProfile] = useState();
    const dispatch = useDispatch();


    const initialValues = {
        name: "",
        category: "",
        subCategory: "",
        description: "",
        interestedCategory: "",
        interestedSubCategory: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("*Name require"),
        category: Yup.string().required("*Category require"),
        subCategory: Yup.string().required("*Subcategory require"),
        description: Yup.string().required("*Description require"),
        interestedCategory: Yup.string().required("*Interestedcategory require"),
        interestedSubCategory: Yup.string().required(
            "*Interestedsubcategory require"
        ),
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
            description: businessProfileGets.description
                ? businessProfileGets.description
                : "",
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

    const updateBusinessProfilePicture = async (files) => {
        try {
            let formData = new FormData();
            formData.append("file", files[0]);
            const response = await dispatch(
                businessProfilePickSet(formData)
            ).unwrap();
            if (response.data.IsSuccess) {
                Success(response.data.Message);
                setImageProfile(
                    `${response.data.Data.s3_url}${response.data.Data.Key}`
                );
            } else {
                Secondary(response.Message);
            }
        } catch (error) {
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
            Secondary("SOMETHING WENT WRONG.");
        }
    };

    const setBusinessProfile = async (values) => {
        try {
            let payload = Object.assign({}, values);
            payload["latitude"] = lati;
            payload["longitude"] = long;
            const response = await dispatch(businessProfileSet(payload)).unwrap();
            if (response.data.IsSuccess) {
                setIsBusinessProfileCreatePopup(false);
                dispatch(businessProfileGet())
                navigate("/dashboard/profile");
                businessProfileGetApi();
                dispatch()
                Success(response.data.Message);
            } else {
                Secondary(response.Message);
            }
        } catch (error) {
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
            return
        } else {
            setBusinessProfile(values);
        }
    };
    const { handleChange, handleSubmit, values, errors, touched, setValues } =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit,
        });

    return (
        <div>
            <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black/60 z-50">
                <div className="h-full w-full overflow-y-auto py-10 px-4">
                    <div
                        className="absolute z-10 top-0 right-0 bottom-0 left-0 h-full w-full"
                        onClick={() => {
                            setIsBusinessProfileCreatePopup(false);
                            // setIsCreateYourProfilePopUpOpen(false);
                        }}
                    ></div>
                    <div
                        className="w-full max-w-[800px] bg-white p-8 xl:p-12 shadow-one rounded-[10px] mx-auto relative"
                        style={{ zIndex: "999999999999" }}
                    >
                        <div className="flex items-center">
                            <div
                                onClick={() => setIsBusinessProfileCreatePopup(false)}
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
                                                    src={imageProfile}
                                                    className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                                                />
                                            </div>
                                        ) : businessProfileGets.businessimage ? (
                                            <div className="w-full h-full rounded-full overflow-hidden">
                                                <img
                                                    className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                                                    src={`https://festumfield.s3.ap-south-1.amazonaws.com/${businessProfileGets.businessimage}`}
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
                                <div className="w-full md:w-1/3 p-2.5">
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
                                <div className="w-full md:w-1/3 p-2.5">
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
                                </div>
                                <div className="w-full md:w-1/3 p-2.5">
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
                                </div>
                                <div className="w-full p-2.5">
                                    <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                                        <textarea
                                            id=""
                                            cols="30"
                                            rows="4"
                                            name="description"
                                            placeholder="Description"
                                            className="w-full bg-transparent text-sm border-0 outline-0"
                                            value={values.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <span className="error-msg-span">
                                        {errors.description &&
                                            touched.description &&
                                            errors.description}
                                    </span>
                                </div>
                                <div className="w-full p-2.5">
                                    <div className="w-full h-32 bg-chatlook-grayLight rounded-md border border-dashed border-chatlook-gray relative flex items-center justify-center">
                                        <ImagePicker
                                            isDefaultDesign={false}
                                            showPreview={true}
                                            label={false}
                                            className="h-full w-full"
                                            classNameMain="h-full w-full justify-center"
                                            classNameDiv="h-full w-full"
                                            onDrop={(files) => {
                                                updateBrochure(files);
                                            }}
                                        >
                                            <div className="brochure-main-div h-full w-full">
                                                <div className="brochure-div h-full w-full">
                                                    <div className="flex items-center h-full w-full justify-center">
                                                        {/* <AiOutlineUpload /> */}
                                                        <span className="icon-upload-2 text-base text-chatlook-gray"></span>
                                                        <p className="p-2 text-sm">Upload Brochure</p>
                                                    </div>
                                                    <p style={{ fontSize: "10px" }}>
                                                        {brochureProfile ? brochureProfile : null}
                                                    </p>
                                                </div>
                                            </div>
                                        </ImagePicker>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-2.5">
                                <h4>Location</h4>
                                <Maps
                                    handleClick={handleClick}
                                    latitude={lati ? lati : 21.1702}
                                    longitude={long ? long : 72.8311}
                                    loadMap={loadMap}
                                    latLngChange={latLngChange}
                                    search={false}
                                    styleHeight={{ height: "300px" }}
                                />
                                <span className="error-msg-span">

                                    {locationError}
                                </span>
                            </div>
                            <div className="w-full ">
                                <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                                    <textarea
                                        id=""
                                        cols="30"
                                        rows="4"
                                        name="address"
                                        placeholder="Address"
                                        className="w-full bg-transparent text-sm border-0 outline-0"
                                        value={values.address}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <span className="error-msg-span">
                                    {errors.address && touched.address && errors.address}
                                </span>
                            </div>
                            <div className="pb-[30px] flex flex-wrap  -mx-2.5">
                                <div className="w-full md:w-1/2 p-2.5">
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
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" onClick={() => {

                                    if (status == "denied") {
                                        setLocationError("Unable to access location. Please enable location permissions to proceed.")
                                    } else {
                                        setLocationError("")
                                    }
                                }} className="btn-form">
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
