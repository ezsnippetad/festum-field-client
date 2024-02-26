import React, { useContext, useEffect, useState } from "react";
import ProfilePic from "../../assets/images/business-info.png";
import { useNavigate, useParams } from "react-router-dom";
import ImagePicker from "../../Common/ImagePicker";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  brochureSet,
  businessProfileGet,
  businessProfilePickSet,
  businessProfileSet,
  useBusinessProfileGets,
  useProfileGets,
  useBusinessCategories,
    businessGetById
} from "../../redux/Slice/profileSlice";
import { useDispatch } from "react-redux";
import Maps from "../../Common/Maps";
import { Context } from "../../createContext";
import PhoneInput from "react-phone-input-2";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
//import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import ListItemText from '@mui/material/ListItemText';
//import Select from '@mui/material/Select';
//import Checkbox from '@mui/material/Checkbox';
import { Secondary, Success } from "../../redux/services/toastServices";
import useNavigatorPermissions from "react-use-navigator-permissions";
import { useMyGroupList } from "../../redux/Slice/requestSlice";
import { AlertCircle, Trash2 } from "lucide-react";
import Twitter from "../../../src/assets/images/Group.svg";
import ptt from "../../../src/assets/images/ptt.png";
import yt from "../../../src/assets/images/yt.png";

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
    platform: "Linkedin",
    link: "",
  },
  {
    platform: "Pinterest",
    link: "",
  },
  {
    platform: "Youtube",
    link: "",
  },
];

export default function EditBusinessProfile() {
    const { id } = useParams();
  const { businessProfileGetApi } = useContext(Context);
  const checking = useMyGroupList()
  //console.log('checking', checking)

  const businessProfileGets = useBusinessProfileGets();
  const businessCategories = useBusinessCategories();
  console.log('businessCategories', businessCategories)
  // brochure
  const [pdfError, setPdfError] = useState("")

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
  const [business, setBusiness] = useState(null);
  const [imageProfile, setImageProfile] = useState();
  const [brochureProfile, setbrochureProfile] = useState();
  //const [busiProfile, setBusiProfile] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileGets = useProfileGets()
  const { status, error } = useNavigatorPermissions('geolocation')
  const [locationError, setLocationError] = useState("")
  const [socialMediaLink, setSocialMediaLink] = useState(links);
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [personName, setPersonName] = React.useState([]);

    const isSubcategorySelected = (subcategory) => {
        return selectedCategories.includes(subcategory._id);
    };
    // const handleChange = (event) => {
    //     setSelectedCategories(event.target.value);
    //     onChange(event.target.value);
    // };
    const group = [
        [1, 2],
        [3, 4]
    ];

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleGroupChange = (event) => {
        setSelectedOptions(event.target.value);
    };
    const formatSelectedValue = () => {
        const formattedOptions = group.map((item, index) => {
            const selectedInCategory = item.filter((v) => selectedOptions.includes(v));
            if (selectedInCategory.length > 0) {
                return `Category ${index} (${selectedInCategory.map((v) => `Option ${v}`).join(" & ")})`;
            }
            return null;
        });
        return formattedOptions.filter((value) => value !== null).join(", ");
    };

    const initialValues = {
    name: "",
    email: "",
    website: "",
    category: "",
    subCategory: "",
      about: "",
    interestedCategory: "",
    interestedSubCategory: "",
    address: "",
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
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("*Name require"),
    //category: Yup.string().required("*Category require"),
    //subCategory: Yup.string().required("*Subcategory require"),
    about: Yup.string().required("*Description require"),
    //interestedCategory: Yup.string().required("*Interestedcategory require"),
    //interestedSubCategory: Yup.string().required("*Interestedsubcategory require"),
      mobile: Yup.string().required("*Mobile required"),
  });
  const onSocialMedia = (val, key) => {
    let i = socialMediaLink?.findIndex((val) => val.platform === key);
    if (i > -1) {
      let array = Object.assign([], socialMediaLink);
      array[i] = { ...array[i], url: val };
      setSocialMediaLink(array);
    }
  };
  useEffect(() => {
    if (business !== null) {
        //alert("call");
        setValues({
            ...values,
            name: business?.name ? business?.name : "",
            email: business?.email ? business?.email : "",
            website: business?.website ? business?.website : "",
            category: businessProfileGets.category ? businessProfileGets.category : "",
            subCategory: businessProfileGets.subCategory ? businessProfileGets.subCategory : "",
            about: business.about ? business.about : "",
            interestedCategory: businessProfileGets.interestedCategory ? businessProfileGets.interestedCategory : "",
            interestedSubCategory: businessProfileGets.interestedSubCategory ? businessProfileGets.interestedSubCategory : "",
            latitude: business.location.coordinates[0],
            longitude: business.location.coordinates[1],
            address: business.address || "",
            mobile: business.mobile || "",
            mobile_country_code: business.mobile_country_code || "",
            mobile_country_wise_contact: business.mobile_country_wise_contact || "",
        });
        setImageProfile(business?.profileimage ? business?.profileimage : "")
        let allLinks = business?.socialmedialinks?.length ? [...business?.socialmedialinks] : [...links];
        setSocialMediaLink(allLinks);
        console.log(allLinks);
        setbrochureProfile(businessProfileGets?.brochure)
    }
  }, [business]);


  const updateBusinessProfilePicture = async (files) => {
    try {
      let formData = new FormData();
      formData.append("file", files[0]);
      const response = await dispatch(
        businessProfilePickSet(formData)
      ).unwrap();
      if (response.data.IsSuccess) {
        setImageProfile(`${response.data.Data.url}`);
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
  const updateBrochure = async (files) => {
    try {
      let formData = new FormData();
      formData.append("file", files[0]);
      const response = await dispatch(brochureSet(formData)).unwrap();
      if (response.data.IsSuccess) {
        setbrochureProfile(
          `${response.data.Data.s3_url}${response.data.Data.Key}`
        );
        businessProfileGetApi();
        Success(response.data.Message);
      } else {
        Secondary(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };

    const getBusinessById = async () => {
        try {
            let payload = {
                businessid: id
            };
            const response = await dispatch(businessGetById(payload)).unwrap();
            console.log(response?.data.Data);
            setBusiness(response?.data.Data);
        } catch (error) {
        }
    };

    useEffect(() => {
        getBusinessById();
    }, [id]);
  // useEffect(() => {
  //   dispatch(businessProfileGet()).unwrap()
  // }, []);

  const setBusinessProfile = async (values) => {
    // if (status == "denied") {
    //   setLocationError("Unable to access location. Please enable location permissions to proceed.")
    //   return
    // } else {
    //   setLocationError("")
    // }
    // if (pdfError.length > 0) {
    //   return
    // }
    try {
      let payload = Object.assign({}, values);
      payload["latitude"] = lati;
      payload["longitude"] = long;
      payload["profileimage"] = imageProfile;
        payload["socialmedialinks"] = socialMediaLink;
      console.log("payload", payload);
      //const response = await dispatch(businessProfileSet(payload)).unwrap();

      // if (response.data.IsSuccess) {
      //   businessProfileGetApi();
      //   navigate(-1);
      // } else {
      //   Secondary(response.Message);
      // }
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
    alert("tes");
    setBusinessProfile(values);
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
  const getInputVal = (key) => {
    let mediaLink = socialMediaLink?.find((val) => val.platform === key);
    return mediaLink?.url;
  };
   console.log(values)
  return (
    <main className="relative h-screen">
      <div className="py-10 px-5 lg:px-12">
        {/* <!-- back button  --> */}
        <div className="pb-8 flex items-center space-x-3">
          <div
            onClick={() => navigate("/dashboard/profile")}
            className="icon-back text-chatlook-sky text-3xl inline-block"
          ></div>
          <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
            Edit Business Profile
          </h4>
        </div>
        {/* <!-- edit area  --> */}
        <div className="flex flex-col items-center max-w-4xl w-full mx-auto pt-7">
          <form onSubmit={handleSubmit} className="w-full pt-7">
            <div className="mx-auto w-44 h-44 relative">

              <ImagePicker
                isDefaultDesign={false}
                showPreview={true}
                label={false}
                classNameMain="d-flex"
                onDrop={(files) => {
                  updateBusinessProfilePicture(files);
                }}
              >
                <div className="image-div">
                  <div className="object-cover profial-image mx-auto w-44 h-44 border-2 border-chatlook-sky rounded-full overflow-hidden">
                    {imageProfile !== "" ? (
                      <img
                        src={`https://festumfield.s3.ap-south-1.amazonaws.com/${imageProfile}`}
                        className="object-cover w-44 h-44 rounded-full overflow-hidden"
                      />
                    ) : business && business.profileimage ? (
                      <img
                        src={`https://festumfield.s3.ap-south-1.amazonaws.com/${business.profileimage}`}
                        className="object-cover w-44 h-44 rounded-full overflow-hidden"
                      />
                    ) : (
                      <div className="w-full h-full flex justify-center items-center icon-user text-6xl rounded-full text-chatlook-gray" />
                    )}
                  </div>
                  <label
                    htmlFor="profial"
                    className="w-10 h-10 absolute bottom-2 right-2 bg-chatlook-sky rounded-full z-10 icon-pencil text-white flex justify-center items-center"
                  ></label>
                </div>
              </ImagePicker>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 p-3">
                <input
                  type="text"
                  placeholder="Business Name*"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
                <span className="error-msg-span">
                  {errors.name && touched.name && errors.name}
                </span>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <FormControl sx={{ m: 1, minWidth: 120 }} style={{ width: "100%", backgroundColor: "#f0f0f0" }}>
                  <Select
                      multiple
                      value={selectedOptions}
                      onChange={handleGroupChange}
                      id="grouped-select"
                      label="Grouping"
                      renderValue={() => formatSelectedValue()}
                      sx={{ overflowX: "auto" }}
                  >
                    <MenuItem disabled>
                      <em>None</em>
                    </MenuItem>
                      {group.map((item, index) => (
                          <div key={index}>
                            <ListSubheader onClickCapture={(e) => e.stopPropagation()}>
                              Category {index}
                            </ListSubheader>
                              {item.map((v) => (
                                  <MenuItem key={v} value={v}>
                                    <Checkbox
                                        checked={selectedOptions.includes(v)}
                                        onChange={() => {
                                            if (selectedOptions.includes(v)) {
                                                setSelectedOptions(selectedOptions.filter((value) => value !== v));
                                            } else {
                                                setSelectedOptions([...selectedOptions, v]);
                                            }
                                        }}
                                    />
                                    Option {v}
                                  </MenuItem>
                              ))}
                          </div>
                      ))}
                  </Select>
                </FormControl>
                {/*<input*/}
                  {/*type="text"*/}
                  {/*placeholder="Business Category*"*/}
                  {/*className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"*/}
                  {/*name="category"*/}
                  {/*value={values.category}*/}
                  {/*onChange={handleChange}*/}
                  {/*errors={errors}*/}
                  {/*touched={touched}*/}
                {/*/>*/}
                <span className="error-msg-span">
                  {errors.category && touched.category && errors.category}
                </span>
              </div>
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
                          value={values.mobile}
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
                                  phone_number: e.slice(i.dialCode.length),
                                  dialCode: i.dialCode,
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
                      name="name"
                      value={values.email}
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                  />
                </div>
                <span className="error-msg-span">
                      {errors.email && touched.email && errors.email}
                    </span>
              </div>
              <div className="w-full md:w-1/2 p-2.5">
                <div className="bg-chatlook-grayLight p-3 rounded-[5px]">
                  <input
                      type="text"
                      placeholder="Business Website"
                      className="w-full"
                      name="name"
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
              <div className="w-full p-3">
                <textarea
                  name="about"
                  id=""
                  rows="3"
                  className="w-full bg-chatlook-grayLight px-4 py-3 rounded-md  font-medium resize-none focus-visible:outline-none"
                  placeholder="About Business"
                  value={values.about}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                ></textarea>
                <span className="error-msg-span">
                  {errors.about &&
                    touched.about &&
                    errors.about}
                </span>
              </div>
              <div className="w-full roundedmd  p-3">
                <h4 className="w-full">Add Brochure</h4>
                <div className="w-full flex  justify-center  flex-col border shadow-lg  rounded-lg">
                  <label htmlFor="uploadfile" className="w-full  border-dashed border-[#9BA6A8] rounded-md flex items-center justify-center border-2  py-3 cursor-pointer  anim">
                    <h1 className="text-chatlook-gray ">Add Brochure</h1>
                    <input type="file" id="uploadfile" className="hidden" />
                  </label>
                  <div className="p-3 ">
                    <div className="flex items-center  space-x-2">
                      <div><AlertCircle className="" size={20} /></div>
                      <div>Max 5 Brochure</div>
                    </div>
                    <div className="flex flex-wrap -mx-1">
                        {business && business.brochures.map((br, index) => (
                            <div key={index} className="h-28  w-24 group hover:bg-black/30 duration-200 relative overflow-hidden">
                              <img src={`https://festumfield.s3.ap-south-1.amazonaws.com/${br}`} className="border  h-full w-full " />
                              <div className="h-6 w-6 rounded-full bg-[#FC5858]  hover:bg-white absolute right-2 top-2 duration-150 group-hover:translate-x-0 translate-x-32  flex items-center justify-center ">
                                <Trash2 className="absolute text-white hover:text-[#FC5858]" size={15} />
                              </div>
                            </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full   p-3">
                <h4 className="w-full">Another Photos</h4>
                <div className="w-full flex  justify-center  flex-col border shadow-lg  ">
                  <label htmlFor="uploadfile" className="w-full  border-dashed  rounded-md flex items-center justify-center border-2  py-3 cursor-pointer  anim">
                    <h1 className="text-chatlook-gray ">Add  Photos</h1>
                    <input type="file" id="uploadfile" className="hidden" />
                  </label>
                  <div className="p-3 ">
                    <div className="flex items-center  space-x-2">
                      <div><AlertCircle className="" size={20} /></div>
                      <div>Max 5 Images</div>
                    </div>
                    <div className="flex items-center space-x-1.5 pt-3">
                        {business && business.photos.map((br, index) => (
                          <div className="h-28  w-24 group hover:bg-black/30 duration-200 relative overflow-hidden">
                            <img src={`https://festumfield.s3.ap-south-1.amazonaws.com/${br}`} className="border  h-full w-full " />
                            <div className="h-6 w-6 rounded-full bg-[#FC5858]  hover:bg-white absolute right-2 top-2 duration-150 group-hover:translate-x-0 translate-x-32  flex items-center justify-center ">
                              <Trash2 className="absolute text-white hover:text-[#FC5858]" size={15} />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full roundedmd  p-3">
                <h4 className="w-full">Another Videos</h4>
                <div className="w-full flex  justify-center  flex-col border shadow-lg  rounded-lg">
                  <label htmlFor="uploadfile" className="w-full  border-dashed border-[#9BA6A8] rounded-md flex items-center justify-center border-2  py-3 cursor-pointer  anim">
                    <h1 className="text-chatlook-gray ">Add Videos</h1>
                    <input type="file" id="uploadfile" className="hidden" />
                  </label>
                  <div className="p-3 ">
                    <div className="flex items-center  space-x-2">
                      <div><AlertCircle className="" size={20} /></div>
                      <div>Max 3 Videos</div>
                    </div>
                    <div className="flex items-center space-x-1.5 pt-3">
                        {business && business.videos.map((br, index) => (
                            <div className="h-28  w-24 group hover:bg-black/30 duration-200 relative overflow-hidden">
                              <img src={`https://festumfield.s3.ap-south-1.amazonaws.com/${br}`} className="border  h-full w-full " />
                              <div className="h-6 w-6 rounded-full bg-[#FC5858]  hover:bg-white absolute right-2 top-2 duration-150 group-hover:translate-x-0 translate-x-32  flex items-center justify-center ">
                                <Trash2 className="absolute text-white hover:text-[#FC5858]" size={15} />
                              </div>
                            </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full rounded-md p-3">
                <h4 className="w-full">Business Location</h4>
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
              <h4 className="ml-2.5 mt-2.5 w-full">Business Address</h4>
              <div className="p-2.5 w-1/2">
                <input className="w-full h-11 bg-[#F1F1F1] rounded p-4" placeholder="Flat No." value={values.address.flatno}/>
              </div>
              <div className="p-2.5 w-1/2">
                <input className="w-full h-11 bg-[#F1F1F1] rounded p-4" placeholder="Street Name" value={values.address.street} />
              </div>
              <div className="p-2.5 w-1/2">
                <input className="w-full h-11 bg-[#F1F1F1] rounded p-4" placeholder="Area Name" value={values.address.area}/>
              </div>
              <div className="p-2.5 w-1/2">
                <input className="w-full h-11 bg-[#F1F1F1] rounded p-4" placeholder="City" value={values.address.city}/>
              </div>
              <div className="p-2.5 w-1/2">
                <input className="w-full h-11 bg-[#F1F1F1] rounded p-4" placeholder="State" value={values.address.state}/>
              </div>
              <div className="p-2.5 w-1/2">
                <input className="w-full h-11 bg-[#F1F1F1] rounded p-4" placeholder="Pincode" value={values.address.pincode}/>
              </div>
              <h4 className="ml-2.5 mt-2.5">Add Your Social Media Links</h4>
              <div className="w-full flex flex-wrap items-center p-2.5">
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
                      placeholder="Facebook Link"
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
                      placeholder="Instagram Link"
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
                      placeholder="Twitter Link"
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
                      placeholder="Linkedin Link"
                      className="px-3 w-full"
                      value={getInputVal("Linkedin")}
                      onChange={(e) => onSocialMedia(e.target.value, "Linkedin")}
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
                      placeholder="Pinterest Link"
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
              {/* <div className="w-full md:w-1/2 p-3">
                <input
                  type="text"
                  placeholder="Enter your Product Name"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"
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
              <div className="w-full md:w-1/2 p-3">
                <input
                  type="text"
                  placeholder="Enter your Product Name"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"
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
              </div> */}
            </div>
            <div className="w-full mt-7">
              <button
                type="submit"
                className="w-24 lg:w-full max-w-[250px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium mx-auto"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
