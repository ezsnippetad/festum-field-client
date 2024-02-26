import React, { useContext, useEffect, useState } from "react";
import ProductPic from "../../assets/images/product.png";
import ProfilePic from "../../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import ImagePicker from "../../Common/ImagePicker";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  businessProfileGet,
  businessProfilePickSet,
  profileGet,
  profilePictureSet,
  businessList,
  useBusinessLists,
  useBusinessProfileGets,
  useProfileGets,
} from "../../redux/Slice/profileSlice";
import { toast } from "react-toastify";
import { Context } from "../../createContext";
import Geocode from "react-geocode";
import PDFViewer from "pdf-viewer-reactjs";
import { Document, Page } from "react-pdf";
import allindianew from "../../assets/images/allindianew.pdf";
import {
  LeftNotifier,
  Secondary,
  Success,
} from "../../redux/services/toastServices";
import Modal from "../../Common/Modals/Modal";
import Maps from "../../Common/Maps";
import CreatePersonalProfile from "../../component/Popups/DashboardPopup/CreatePersonalProfile";
import CreatePersonalProfileTwo from "../../component/Popups/DashboardPopup/CreatePersonalProfileTwo";
import CreateBusinessProfileTwo from "../../component/Popups/DashboardPopup/CreateBusinessProfileTwo";
import CreateBusinessProfileImage from "../../assets/images/CreateBusinessProfile.svg"
import { File, Plus, Trash2 } from "lucide-react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Twitter from "../../../src/assets/images/Group.svg"
import ptt from "../../../src/assets/images/ptt.png"
import yt from "../../../src/assets/images/yt.png";
import { FormHelperText } from "@mui/material";
import NewCreateBusinessProfile from "../../component/Popups/DashboardPopup/NewCreateBusinessProfile";
import NewCreateBusinessProfileTow from "../../component/Popups/DashboardPopup/NewCreateBusinessProfileTow";


Geocode.setApiKey("AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q");
let marker;
export default function Profile() {
  const navigate = useNavigate();
  const { personalProfileGetApi, businessProfileGetApi } = useContext(Context);
  const [add, setAdd] = useState();
  const [busiAdd, setBusiAdd] = useState();
  const [isBusiness, setIsBusiness] = useState(false);
  const [isPersonal, setIsPersonal] = useState(true);

  const [isReel, setIsReel] = useState(false);
  const [imageProfile, setImageProfile] = useState();
  const [businessImageProfile, setBusinessImageProfile] = useState();
  const [isprofileCreatePopUp, setIsProfileCreatePopup] = useState(false)
  const [isBusinessprofileCreatePopUp, setIsBusinessProfileModalOpen] = useState(false)
  // const getProfile = useProfileGets()

  const profileGets = useProfileGets();
  const [facebook, setFacebook] = useState();
  const [insta, setInsta] = useState();
  const [twitter, setTwitter] = useState();
  const [linkdin, setLinkdin] = useState();
  const [businessProfile, setBusinessProfile] = React.useState(null);
    const businessProfileGets = useBusinessProfileGets();
    const businessLists = useBusinessLists();
    console.log("useBusinessLists", businessLists);
    const dispatch = useDispatch();
    const [lati, setLati] = useState();
    const [long, setLong] = useState();
    const [numPages, setNumPages] = useState(null);


    const handleChange = (event) => {
    console.log(event);
      let selectProfile = businessLists?.find((val) => val._id === event.target.value);
      console.log(selectProfile);
    setBusinessProfile(selectProfile);
  };

  const socialMap = () => {
    profileGets && profileGets?.socialMediaLinks?.map((val) => {
      if (val.platform == "Facebook") {
        setFacebook(val?.link);
      } else if (val.platform === "Instagram") {
        setInsta(val?.link);
      } else if (val.platform === "Twitter") {
        setTwitter(val?.link);
      } else if (val.platform === "Linkdin") {
        setLinkdin(val?.link);
      }
    });
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const onPdfDownload = () => {
    fetch(`https://friendsfield.s3.ap-south-1.amazonaws.com${businessProfileGets.brochure}`,
    ).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `https://friendsfield.s3.ap-south-1.amazonaws.com${businessProfileGets.brochure}`;
        alink.click();
      });
    });
  };

  useEffect(() => {
    personalProfileGetApi();
    // businessProfileGetApi();
  }, [isprofileCreatePopUp, isBusinessprofileCreatePopUp]);

  useEffect(() => {
    setTimeout(() => {
      socialMap();
    }, [500]);
  });

  useEffect(() => {
    if (profileGets?.fullName === "") {
      navigate("/dashboard")
    }
  }, [])

  const updateProfilePicture = async (files) => {
    if (isPersonal) {
      try {
        let formData = new FormData();
        formData.append("file", files[0]);
        const response = await dispatch(profilePictureSet(formData)).unwrap();
        if (response.data.IsSuccess) {
          Success(response.data.Message);
          setImageProfile(
            `${response.data.Data.s3_url}${response.data.Data.url}`,
          );
          personalProfileGetApi();
        } else {
          Secondary(response.Message);
        }
      } catch (error) {
        Secondary("SOMETHING WENT WRONG.");
      }
    } else {
      try {
        let formData = new FormData();
        formData.append("file", files[0]);
        const response = await dispatch(
          businessProfilePickSet(formData),
        ).unwrap();
        if (response.data.IsSuccess) {
          Success(response.data.Message);
          setBusinessImageProfile(
            `${response.data.Data.s3_url}${response.data.Data.Key}`,
          );
          // businessProfileGetApi();
        } else {
          Secondary(response.Message);
        }
      } catch (error) {
        Secondary("SOMETHING WENT WRONG.");
      }
    }
  };
    const handleClick = (address, lng, lat, latlng) => {
        setLati(lat);
        setLong(lng);
        // values = {
        //     lati: lat,
        //     long: lng,
        // };
        marker.setPosition(latlng);
    };

    const loadMap = (map, maps) => {
        marker = new maps.Marker({
            position: { lat: businessProfile.location.coordinates[0], lng: businessProfile.location.coordinates[1] },
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
  const getAddress = () => {
    if (isPersonal && profileGets) {
      let lat = profileGets?.location?.coordinates[1];
      let lng = profileGets?.location?.coordinates[0];
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          let city, state, country, postal_code;
          for (
            let i = 0;
            i < response.results[0].address_components.length;
            i++
          ) {
            for (
              let j = 0;
              j < response.results[0].address_components[i].types.length;
              j++
            ) {
              switch (response.results[0].address_components[i].types[j]) {
                case "locality":
                  city = response.results[0].address_components[i].long_name;
                  break;
                case "administrative_area_level_1":
                  state = response.results[0].address_components[i].long_name;
                  break;
                case "country":
                  country = response.results[0].address_components[i].long_name;
                  break;
                case "postal_code":
                  postal_code =
                    response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          // formik.setFieldValue('city', city)
          // formik.setFieldValue('state', state)
          // formik.setFieldValue('pincode', postal_code)
          setAdd(address);
        },
        (error) => {
          console.error(error);
        },
      );
    } else if (isBusiness && businessProfileGets) {

      let lat = businessProfileGets?.location?.coordinates[1];
      let lng = businessProfileGets?.location?.coordinates[0];
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          let city, state, country, postal_code;
          for (
            let i = 0;
            i < response.results[0].address_components.length;
            i++
          ) {
            for (
              let j = 0;
              j < response.results[0].address_components[i].types.length;
              j++
            ) {
              switch (response.results[0].address_components[i].types[j]) {
                case "locality":
                  city = response.results[0].address_components[i].long_name;
                  break;
                case "administrative_area_level_1":
                  state = response.results[0].address_components[i].long_name;
                  break;
                case "country":
                  country = response.results[0].address_components[i].long_name;
                  break;
                case "postal_code":
                  postal_code =
                    response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          setBusiAdd(address);
        },
        (error) => {
          console.error(error);
        },
      );
    }
  };
  const onOurProduct = () => {
    profileGets ? navigate("/dashboard/profile/products") : LeftNotifier("First setup your business profile");
  };
  useEffect(() => {
    getAddress();
  }, [profileGets, businessProfileGets, isBusiness, isPersonal]);
  useEffect(() => {
    if (businessLists) {
      setBusinessProfile(businessLists[0]);
        setLati(businessLists[0]?.location?.coordinates[1] ? businessLists[0]?.location?.coordinates[1] : 22.1702);
        setLong(businessLists[0]?.location?.coordinates[0] ? businessLists[0]?.location?.coordinates[0] : 72.8311);
    }
  }, []);


  return (
    <>
      <main className="relative h-screen">
        <div className="py-10 px-5 lg:px-12">
          {/* <!-- back button  --> */}
          <div className="pb-8 flex w-full justify-between items-center ">
            <div className="flex items-center justify-center space-x-3">
              <div onClick={() => navigate("/dashboard")} className="icon-back text-3xl text-chatlook-sky inline-block cursor-pointer"></div>
              <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
                Profile
              </h4>
            </div>
            {isBusiness ? (<button className="w-54 h-11 bg-chatlook-sky space-x-1 flex items-center justify-center rounded p-2 " onClick={() => { setIsBusinessProfileModalOpen(true) }}  >
              <Plus className="text-white" />
              <h1 className="text-white text-sm font-semibold" >Add New Business Profile
              </h1>
            </button>) : null}
          </div>
          {/* <!-- profile  --> */}
          <div className="flex flex-col items-center justify-center max-h-[554px] h-full py-16 bg-chatlook-sky">
            <div className="w-44 h-44 relative">
              <ImagePicker
                isDefaultDesign={false}
                showPreview={false}
                label={false}
                classNameMain="d-flex"
                onDrop={(files) => {
                  updateProfilePicture(files);
                }}
              >
                {isPersonal && imageProfile ? (
                  <div className="object-cover profial-image w-44 h-44 border-2 border-white rounded-full overflow-hidden">
                    <img
                      src={imageProfile}
                      className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                    />
                  </div>
                ) : isPersonal && profileGets.profileimage ? (
                  <div className="object-cover profial-image w-44 h-44 border-2 border-white rounded-full overflow-hidden">
                    <img
                      className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                      src={`https://festumfield.s3.ap-south-1.amazonaws.com/${profileGets.profileimage}`}
                    />
                  </div>
                ) : isBusiness && businessImageProfile ? (
                  <div className="object-cover profial-image w-44 h-44 border-2 border-white rounded-full overflow-hidden">
                    <img
                      src={businessImageProfile}
                      className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                    />
                  </div>
                ) : isBusiness && businessLists.length > 0 && businessLists[0].profileimage !== "" ? (
                  <div className="object-cover profial-image w-44 h-44 border-2 border-white rounded-full overflow-hidden">
                    <img
                      className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
                      src={`https://festumfield.s3.ap-south-1.amazonaws.com/${businessLists[0].profileimage}`}
                    />
                  </div>
                ) : (
                  <div className="object-cover profial-image w-44 h-44 border-2 border-white rounded-full overflow-hidden">
                    <div className="w-full h-full flex justify-center items-center icon-user text-6xl rounded-full text-white" />
                  </div>
                )}
                <div className="image-div">
                  <div className="pen-div d-flex justify-content-end">
                    <label
                      htmlFor="profial"
                      className="w-10 h-10 absolute bottom-2 right-2 bg-white rounded-full z-10 icon-pencil text-xl flex items-center justify-center text-chatlook-sky"
                    ></label>
                  </div>
                </div>
              </ImagePicker>
            </div>
            <div className="text-white pt-2 capitalize">
              {isPersonal ? (
                <>
                  <h3 className="text-white font-normal pt-2">{profileGets.fullname}</h3>
                  <h3 className="text-white font-normal pt-2 text-center">{profileGets.nickname}</h3>
                  <p className="text-white text-sm/[22px] p-2 text-center">#{profileGets.hashtag}</p>
                </>
              ) : isBusiness ? (
                <Box sx={{ m: 1, minWidth: 120, minHeight: 50 }} size="small">
                  <FormControl sx={{ margin: "auto", minWidth: 120, minHeight: 40 }}>
                    <Select value={businessProfile?._id} onChange={handleChange} displayEmpty
                      sx={{ height: "20px", margin: "20px", color: "white", fontSize: "18px", fontWeight: 400 }}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      {businessLists.length > 0 && businessLists.map((busProfile, index) => (
                        <MenuItem key={index} value={busProfile._id}>{busProfile.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )
                : null}
            </div>


            <div className="flex mt-3">
              {isPersonal && profileGets?.fullname == "" ?
                <button className="bg-white text-chatlook-sky rounded-md text-sm uppercase mr-4 px-3 py-3" onClick={() => { setIsProfileCreatePopup(true) }} >Create Profile</button> :
                isPersonal && profileGets?.fullname !== "" ? <button button className="bg-white text-chatlook-sky rounded-md text-sm uppercase mr-4 px-3 py-3" onClick={() => { navigate("/dashboard/profile/editprofile") }} >Edit Personal Profile</button> : null
              }
              {isBusiness && businessLists.length === 0 ? <button className="bg-white text-chatlook-sky rounded-md text-sm uppercase mr-4 px-3 py-3" onClick={() => { setIsBusinessProfileModalOpen(true) }} >Edit Business Profile</button> : isBusiness ?
                <button button className="bg-white text-chatlook-sky rounded-md text-sm uppercase mr-4 px-3 py-3" onClick={() => { navigate(`/dashboard/profile/business/${businessProfile._id}`) }}  >Edit Business Profile</button> : null
              }
              {isBusiness && (
                <a className="bg-white rounded-md px-3 py-2 flex items-center">
                  <span className="icon-store text-xl text-chatlook-sky" onClick={() => { onOurProduct(); }}></span>
                </a>
              )}
              {isBusiness && (
                <a className="bg-white rounded-md px-3 py-2 flex items-center ml-3 ">
                  <Trash2 className="icon-store text-xl text-ev-red" />
                </a>
              )}
            </div>
            {isPersonal && (
              <div className="flex items-center justify-center pt-5 space-x-5">
                {profileGets?.socialmedialinks && profileGets?.socialmedialinks[0]?.url !== "" && (
                  <>
                    <a target="_blank" href={profileGets?.socialmedialinks[0]?.url}>
                      <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.0425 43.8335C34.1237 43.8335 43.9175 34.0397 43.9175 21.9585C43.9175 9.87727 34.1237 0.0834961 22.0425 0.0834961C9.96125 0.0834961 0.16748 9.87727 0.16748 21.9585C0.16748 34.0397 9.96125 43.8335 22.0425 43.8335Z"
                          fill="#3B5998"
                        />
                        <path
                          d="M27.541 22.8148H23.6377V37.1148H17.7238V22.8148H14.9111V17.7892H17.7238V14.5371C17.7238 12.2115 18.8285 8.56982 23.6903 8.56982L28.0709 8.58815V13.4663H24.8925C24.3711 13.4663 23.638 13.7268 23.638 14.8362V17.7939H28.0577L27.541 22.8148Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </>
                )
                }
                {
                  profileGets?.socialmedialinks && profileGets?.socialmedialinks[1]?.url !== "" && (
                    <>
                      <a target="_blank" href={profileGets?.socialmedialinks[1]?.url}>
                        <svg
                          width="45"
                          height="44"
                          viewBox="0 0 45 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.75 43.9727C34.8852 43.9727 44.7227 34.1352 44.7227 22C44.7227 9.86484 34.8852 0.0273438 22.75 0.0273438C10.6148 0.0273438 0.777344 9.86484 0.777344 22C0.777344 34.1352 10.6148 43.9727 22.75 43.9727Z"
                            fill="url(#paint0_linear_1367_285)"
                          />
                          <path
                            d="M27.418 9.79297H18.0918C13.9316 9.79297 10.5527 13.1719 10.5527 17.332V26.6582C10.5527 30.8184 13.9316 34.1973 18.0918 34.1973H27.418C31.5781 34.1973 34.957 30.8184 34.957 26.6582V17.332C34.957 13.1719 31.5781 9.79297 27.418 9.79297ZM32.2324 26.668C32.2324 29.3242 30.0742 31.4922 27.4082 31.4922H18.082C15.4258 31.4922 13.2578 29.334 13.2578 26.668V17.3418C13.2578 14.6855 15.416 12.5176 18.082 12.5176H27.4082C30.0645 12.5176 32.2324 14.6758 32.2324 17.3418V26.668Z"
                            fill="white"
                          />
                          <path
                            d="M22.75 15.7598C19.3125 15.7598 16.5098 18.5625 16.5098 22C16.5098 25.4375 19.3125 28.2402 22.75 28.2402C26.1875 28.2402 28.9902 25.4375 28.9902 22C28.9902 18.5625 26.1875 15.7598 22.75 15.7598ZM22.75 25.7891C20.6602 25.7891 18.9609 24.0898 18.9609 22C18.9609 19.9102 20.6602 18.2109 22.75 18.2109C24.8398 18.2109 26.5391 19.9102 26.5391 22C26.5391 24.0898 24.8398 25.7891 22.75 25.7891Z"
                            fill="white"
                          />
                          <path
                            d="M29.4654 16.444C30.0403 16.3508 30.4308 15.8092 30.3376 15.2342C30.2444 14.6593 29.7028 14.2688 29.1279 14.362C28.553 14.4552 28.1625 14.9968 28.2557 15.5717C28.3489 16.1467 28.8905 16.5372 29.4654 16.444Z"
                            fill="white"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1367_285"
                              x1="6.01943"
                              y1="38.7306"
                              x2="37.245"
                              y2="7.50498"
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
                      </a>
                    </>
                  )
                }
                {
                  profileGets?.socialmedialinks && profileGets?.socialmedialinks[2]?.url !== "" && (
                    <>
                      <a target="_blank" href={profileGets?.socialmedialinks[2]?.url}>
                        <svg
                          width="45"
                          height="44"
                          viewBox="0 0 45 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.5425 43.8335C34.6237 43.8335 44.4175 34.0397 44.4175 21.9585C44.4175 9.87727 34.6237 0.0834961 22.5425 0.0834961C10.4613 0.0834961 0.66748 9.87727 0.66748 21.9585C0.66748 34.0397 10.4613 43.8335 22.5425 43.8335Z"
                            fill="#03A9F4"
                          />
                          <path
                            d="M36.7133 13.1712C35.6475 13.6367 34.52 13.9459 33.3659 14.0894C34.5826 13.3679 35.4921 12.2248 35.9218 10.8772C34.783 11.5531 33.537 12.0291 32.2376 12.2847C31.4413 11.4331 30.4073 10.8409 29.2699 10.585C28.1325 10.3291 26.9444 10.4214 25.8602 10.8499C24.776 11.2784 23.8458 12.0232 23.1906 12.9875C22.5354 13.9518 22.1856 15.0909 22.1866 16.2567C22.1825 16.7017 22.2279 17.1458 22.3219 17.5807C20.0105 17.4672 17.7491 16.8673 15.6854 15.8203C13.6217 14.7734 11.802 13.3028 10.3453 11.5047C9.59656 12.7838 9.36459 14.3006 9.69681 15.7451C10.029 17.1895 10.9004 18.4526 12.1327 19.276C11.2129 19.2512 10.3125 19.0054 9.50774 18.5593V18.6227C9.51032 19.9634 9.97441 21.2625 10.822 22.3014C11.6696 23.3403 12.849 24.0557 14.1619 24.3274C13.6651 24.458 13.153 24.5219 12.6393 24.5174C12.2694 24.5242 11.8998 24.4914 11.5369 24.4195C11.9131 25.5726 12.6373 26.5809 13.6099 27.3056C14.5825 28.0303 15.7557 28.4358 16.9683 28.4664C14.9135 30.0725 12.3805 30.9448 9.77254 30.9446C9.30786 30.9486 8.84343 30.9216 8.38232 30.864C11.0415 32.5785 14.1411 33.4844 17.305 33.4718C27.9979 33.4718 33.8437 24.6153 33.8437 16.9389C33.8437 16.6827 33.8437 16.4352 33.8235 16.1876C34.962 15.366 35.9412 14.3438 36.7133 13.1712Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </>
                  )
                }
                {
                  profileGets?.socialmedialinks && profileGets?.socialmedialinks[3]?.link !== "" && (
                    <>
                      <a target="_blank" href={profileGets?.socialmedialinks[3]?.link}>
                        <svg
                          width="45"
                          height="44"
                          viewBox="0 0 45 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.2925 43.8335C34.3737 43.8335 44.1675 34.0397 44.1675 21.9585C44.1675 9.87727 34.3737 0.0834961 22.2925 0.0834961C10.2112 0.0834961 0.41748 9.87727 0.41748 21.9585C0.41748 34.0397 10.2112 43.8335 22.2925 43.8335Z"
                            fill="#007AB9"
                          />
                          <path
                            d="M35.3618 23.7187V32.7373H30.1331V24.3231C30.1331 22.2104 29.3781 20.7676 27.485 20.7676C26.0402 20.7676 25.182 21.739 24.8029 22.6795C24.6653 23.0156 24.6298 23.4824 24.6298 23.9538V32.7369H19.4007C19.4007 32.7369 19.4709 18.4861 19.4007 17.0109H24.6302V19.2394C24.6197 19.257 24.6049 19.2741 24.5955 19.2909H24.6302V19.2394C25.3251 18.1702 26.5643 16.6416 29.3427 16.6416C32.7827 16.6416 35.3618 18.8893 35.3618 23.7187ZM13.9306 9.43042C12.1419 9.43042 10.9717 10.6045 10.9717 12.1472C10.9717 13.657 12.108 14.8651 13.8619 14.8651H13.8959C15.7196 14.8651 16.8536 13.657 16.8536 12.1472C16.8189 10.6045 15.7196 9.43042 13.9306 9.43042ZM11.2825 32.7373H16.5096V17.0109H11.2825V32.7373Z"
                            fill="#F1F2F2"
                          />
                        </svg>
                      </a>
                    </>
                  )
                }


              </div>
            )}
            {isBusiness && businessProfile && (
                   <div className="flex items-center justify-center pt-5 space-x-5">
                   {businessProfile?.socialmedialinks[0]?.link !== "" && (
                       <>
                       <a target="_blank" href={businessProfile?.socialmedialinks[0]?.url}>
                       <svg width="44" height="44"
                       viewBox="0 0 44 44"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                       >
                       <path
                       d="M22.0425 43.8335C34.1237 43.8335 43.9175 34.0397 43.9175 21.9585C43.9175 9.87727 34.1237 0.0834961 22.0425 0.0834961C9.96125 0.0834961 0.16748 9.87727 0.16748 21.9585C0.16748 34.0397 9.96125 43.8335 22.0425 43.8335Z"
                       fill="#3B5998"
                       />
                       <path
                       d="M27.541 22.8148H23.6377V37.1148H17.7238V22.8148H14.9111V17.7892H17.7238V14.5371C17.7238 12.2115 18.8285 8.56982 23.6903 8.56982L28.0709 8.58815V13.4663H24.8925C24.3711 13.4663 23.638 13.7268 23.638 14.8362V17.7939H28.0577L27.541 22.8148Z"
                       fill="white"
                       />
                       </svg>
                       </a>
                       </>
            )}
            {
                businessProfile?.socialmedialinks[1]?.link !== "" && (
            <>
            <a target="_blank" href={businessProfile?.socialmedialinks[1]?.url}>
            <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M22.75 43.9727C34.8852 43.9727 44.7227 34.1352 44.7227 22C44.7227 9.86484 34.8852 0.0273438 22.75 0.0273438C10.6148 0.0273438 0.777344 9.86484 0.777344 22C0.777344 34.1352 10.6148 43.9727 22.75 43.9727Z"
            fill="url(#paint0_linear_1367_285)"
            />
            <path
            d="M27.418 9.79297H18.0918C13.9316 9.79297 10.5527 13.1719 10.5527 17.332V26.6582C10.5527 30.8184 13.9316 34.1973 18.0918 34.1973H27.418C31.5781 34.1973 34.957 30.8184 34.957 26.6582V17.332C34.957 13.1719 31.5781 9.79297 27.418 9.79297ZM32.2324 26.668C32.2324 29.3242 30.0742 31.4922 27.4082 31.4922H18.082C15.4258 31.4922 13.2578 29.334 13.2578 26.668V17.3418C13.2578 14.6855 15.416 12.5176 18.082 12.5176H27.4082C30.0645 12.5176 32.2324 14.6758 32.2324 17.3418V26.668Z"
            fill="white"
            />
            <path
            d="M22.75 15.7598C19.3125 15.7598 16.5098 18.5625 16.5098 22C16.5098 25.4375 19.3125 28.2402 22.75 28.2402C26.1875 28.2402 28.9902 25.4375 28.9902 22C28.9902 18.5625 26.1875 15.7598 22.75 15.7598ZM22.75 25.7891C20.6602 25.7891 18.9609 24.0898 18.9609 22C18.9609 19.9102 20.6602 18.2109 22.75 18.2109C24.8398 18.2109 26.5391 19.9102 26.5391 22C26.5391 24.0898 24.8398 25.7891 22.75 25.7891Z"
            fill="white"
            />
            <path
            d="M29.4654 16.444C30.0403 16.3508 30.4308 15.8092 30.3376 15.2342C30.2444 14.6593 29.7028 14.2688 29.1279 14.362C28.553 14.4552 28.1625 14.9968 28.2557 15.5717C28.3489 16.1467 28.8905 16.5372 29.4654 16.444Z"
            fill="white"
            />
            <defs>
            <linearGradient
            id="paint0_linear_1367_285"
            x1="6.01943"
            y1="38.7306"
            x2="37.245"
            y2="7.50498"
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
            </a>
            </>
            )
            }
            {
                businessProfile?.socialmedialinks[2]?.link !== "" && (
            <>
            <a target="_blank" href={businessProfile?.socialmedialinks[2]?.url}>
            <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M22.5425 43.8335C34.6237 43.8335 44.4175 34.0397 44.4175 21.9585C44.4175 9.87727 34.6237 0.0834961 22.5425 0.0834961C10.4613 0.0834961 0.66748 9.87727 0.66748 21.9585C0.66748 34.0397 10.4613 43.8335 22.5425 43.8335Z"
            fill="#03A9F4"
            />
            <path
            d="M36.7133 13.1712C35.6475 13.6367 34.52 13.9459 33.3659 14.0894C34.5826 13.3679 35.4921 12.2248 35.9218 10.8772C34.783 11.5531 33.537 12.0291 32.2376 12.2847C31.4413 11.4331 30.4073 10.8409 29.2699 10.585C28.1325 10.3291 26.9444 10.4214 25.8602 10.8499C24.776 11.2784 23.8458 12.0232 23.1906 12.9875C22.5354 13.9518 22.1856 15.0909 22.1866 16.2567C22.1825 16.7017 22.2279 17.1458 22.3219 17.5807C20.0105 17.4672 17.7491 16.8673 15.6854 15.8203C13.6217 14.7734 11.802 13.3028 10.3453 11.5047C9.59656 12.7838 9.36459 14.3006 9.69681 15.7451C10.029 17.1895 10.9004 18.4526 12.1327 19.276C11.2129 19.2512 10.3125 19.0054 9.50774 18.5593V18.6227C9.51032 19.9634 9.97441 21.2625 10.822 22.3014C11.6696 23.3403 12.849 24.0557 14.1619 24.3274C13.6651 24.458 13.153 24.5219 12.6393 24.5174C12.2694 24.5242 11.8998 24.4914 11.5369 24.4195C11.9131 25.5726 12.6373 26.5809 13.6099 27.3056C14.5825 28.0303 15.7557 28.4358 16.9683 28.4664C14.9135 30.0725 12.3805 30.9448 9.77254 30.9446C9.30786 30.9486 8.84343 30.9216 8.38232 30.864C11.0415 32.5785 14.1411 33.4844 17.305 33.4718C27.9979 33.4718 33.8437 24.6153 33.8437 16.9389C33.8437 16.6827 33.8437 16.4352 33.8235 16.1876C34.962 15.366 35.9412 14.3438 36.7133 13.1712Z"
            fill="white"
            />
            </svg>
            </a>
            </>
            )
            }
            {
                businessProfile?.socialmedialinks[3]?.link !== "" && (
            <>
            <a target="_blank" href={businessProfile?.socialmedialinks[3]?.url}>
            <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M22.2925 43.8335C34.3737 43.8335 44.1675 34.0397 44.1675 21.9585C44.1675 9.87727 34.3737 0.0834961 22.2925 0.0834961C10.2112 0.0834961 0.41748 9.87727 0.41748 21.9585C0.41748 34.0397 10.2112 43.8335 22.2925 43.8335Z"
            fill="#007AB9"
            />
            <path
            d="M35.3618 23.7187V32.7373H30.1331V24.3231C30.1331 22.2104 29.3781 20.7676 27.485 20.7676C26.0402 20.7676 25.182 21.739 24.8029 22.6795C24.6653 23.0156 24.6298 23.4824 24.6298 23.9538V32.7369H19.4007C19.4007 32.7369 19.4709 18.4861 19.4007 17.0109H24.6302V19.2394C24.6197 19.257 24.6049 19.2741 24.5955 19.2909H24.6302V19.2394C25.3251 18.1702 26.5643 16.6416 29.3427 16.6416C32.7827 16.6416 35.3618 18.8893 35.3618 23.7187ZM13.9306 9.43042C12.1419 9.43042 10.9717 10.6045 10.9717 12.1472C10.9717 13.657 12.108 14.8651 13.8619 14.8651H13.8959C15.7196 14.8651 16.8536 13.657 16.8536 12.1472C16.8189 10.6045 15.7196 9.43042 13.9306 9.43042ZM11.2825 32.7373H16.5096V17.0109H11.2825V32.7373Z"
            fill="#F1F2F2"
            />
            </svg>
            </a>
            </>
            )
            }

            {/* <a>
            <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M22.0425 43.8335C34.1237 43.8335 43.9175 34.0397 43.9175 21.9585C43.9175 9.87727 34.1237 0.0834961 22.0425 0.0834961C9.96125 0.0834961 0.16748 9.87727 0.16748 21.9585C0.16748 34.0397 9.96125 43.8335 22.0425 43.8335Z"
            fill="#3B5998"
            />
            <path
            d="M27.541 22.8148H23.6377V37.1148H17.7238V22.8148H14.9111V17.7892H17.7238V14.5371C17.7238 12.2115 18.8285 8.56982 23.6903 8.56982L28.0709 8.58815V13.4663H24.8925C24.3711 13.4663 23.638 13.7268 23.638 14.8362V17.7939H28.0577L27.541 22.8148Z"
            fill="white"
            />
            </svg>
            </a>
            <a>
            <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M22.75 43.9727C34.8852 43.9727 44.7227 34.1352 44.7227 22C44.7227 9.86484 34.8852 0.0273438 22.75 0.0273438C10.6148 0.0273438 0.777344 9.86484 0.777344 22C0.777344 34.1352 10.6148 43.9727 22.75 43.9727Z"
            fill="url(#paint0_linear_1367_285)"
            />
            <path
            d="M27.418 9.79297H18.0918C13.9316 9.79297 10.5527 13.1719 10.5527 17.332V26.6582C10.5527 30.8184 13.9316 34.1973 18.0918 34.1973H27.418C31.5781 34.1973 34.957 30.8184 34.957 26.6582V17.332C34.957 13.1719 31.5781 9.79297 27.418 9.79297ZM32.2324 26.668C32.2324 29.3242 30.0742 31.4922 27.4082 31.4922H18.082C15.4258 31.4922 13.2578 29.334 13.2578 26.668V17.3418C13.2578 14.6855 15.416 12.5176 18.082 12.5176H27.4082C30.0645 12.5176 32.2324 14.6758 32.2324 17.3418V26.668Z"
            fill="white"
            />
            <path
            d="M22.75 15.7598C19.3125 15.7598 16.5098 18.5625 16.5098 22C16.5098 25.4375 19.3125 28.2402 22.75 28.2402C26.1875 28.2402 28.9902 25.4375 28.9902 22C28.9902 18.5625 26.1875 15.7598 22.75 15.7598ZM22.75 25.7891C20.6602 25.7891 18.9609 24.0898 18.9609 22C18.9609 19.9102 20.6602 18.2109 22.75 18.2109C24.8398 18.2109 26.5391 19.9102 26.5391 22C26.5391 24.0898 24.8398 25.7891 22.75 25.7891Z"
            fill="white"
            />
            <path
            d="M29.4654 16.444C30.0403 16.3508 30.4308 15.8092 30.3376 15.2342C30.2444 14.6593 29.7028 14.2688 29.1279 14.362C28.553 14.4552 28.1625 14.9968 28.2557 15.5717C28.3489 16.1467 28.8905 16.5372 29.4654 16.444Z"
            fill="white"
            />
            <defs>
            <linearGradient
            id="paint0_linear_1367_285"
            x1="6.01943"
            y1="38.7306"
            x2="37.245"
            y2="7.50498"
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
            </a>
            <a>
            <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M22.5425 43.8335C34.6237 43.8335 44.4175 34.0397 44.4175 21.9585C44.4175 9.87727 34.6237 0.0834961 22.5425 0.0834961C10.4613 0.0834961 0.66748 9.87727 0.66748 21.9585C0.66748 34.0397 10.4613 43.8335 22.5425 43.8335Z"
            fill="#03A9F4"
            />
            <path
            d="M36.7133 13.1712C35.6475 13.6367 34.52 13.9459 33.3659 14.0894C34.5826 13.3679 35.4921 12.2248 35.9218 10.8772C34.783 11.5531 33.537 12.0291 32.2376 12.2847C31.4413 11.4331 30.4073 10.8409 29.2699 10.585C28.1325 10.3291 26.9444 10.4214 25.8602 10.8499C24.776 11.2784 23.8458 12.0232 23.1906 12.9875C22.5354 13.9518 22.1856 15.0909 22.1866 16.2567C22.1825 16.7017 22.2279 17.1458 22.3219 17.5807C20.0105 17.4672 17.7491 16.8673 15.6854 15.8203C13.6217 14.7734 11.802 13.3028 10.3453 11.5047C9.59656 12.7838 9.36459 14.3006 9.69681 15.7451C10.029 17.1895 10.9004 18.4526 12.1327 19.276C11.2129 19.2512 10.3125 19.0054 9.50774 18.5593V18.6227C9.51032 19.9634 9.97441 21.2625 10.822 22.3014C11.6696 23.3403 12.849 24.0557 14.1619 24.3274C13.6651 24.458 13.153 24.5219 12.6393 24.5174C12.2694 24.5242 11.8998 24.4914 11.5369 24.4195C11.9131 25.5726 12.6373 26.5809 13.6099 27.3056C14.5825 28.0303 15.7557 28.4358 16.9683 28.4664C14.9135 30.0725 12.3805 30.9448 9.77254 30.9446C9.30786 30.9486 8.84343 30.9216 8.38232 30.864C11.0415 32.5785 14.1411 33.4844 17.305 33.4718C27.9979 33.4718 33.8437 24.6153 33.8437 16.9389C33.8437 16.6827 33.8437 16.4352 33.8235 16.1876C34.962 15.366 35.9412 14.3438 36.7133 13.1712Z"
            fill="white"
            />
            </svg>
            </a>
            <a>
            <svg
            width="45"
            height="44"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M22.2925 43.8335C34.3737 43.8335 44.1675 34.0397 44.1675 21.9585C44.1675 9.87727 34.3737 0.0834961 22.2925 0.0834961C10.2112 0.0834961 0.41748 9.87727 0.41748 21.9585C0.41748 34.0397 10.2112 43.8335 22.2925 43.8335Z"
            fill="#007AB9"
            />
            <path
            d="M35.3618 23.7187V32.7373H30.1331V24.3231C30.1331 22.2104 29.3781 20.7676 27.485 20.7676C26.0402 20.7676 25.182 21.739 24.8029 22.6795C24.6653 23.0156 24.6298 23.4824 24.6298 23.9538V32.7369H19.4007C19.4007 32.7369 19.4709 18.4861 19.4007 17.0109H24.6302V19.2394C24.6197 19.257 24.6049 19.2741 24.5955 19.2909H24.6302V19.2394C25.3251 18.1702 26.5643 16.6416 29.3427 16.6416C32.7827 16.6416 35.3618 18.8893 35.3618 23.7187ZM13.9306 9.43042C12.1419 9.43042 10.9717 10.6045 10.9717 12.1472C10.9717 13.657 12.108 14.8651 13.8619 14.8651H13.8959C15.7196 14.8651 16.8536 13.657 16.8536 12.1472C16.8189 10.6045 15.7196 9.43042 13.9306 9.43042ZM11.2825 32.7373H16.5096V17.0109H11.2825V32.7373Z"
            fill="#F1F2F2"
            />
            </svg>
            </a> */}
            </div>
            )}
          </div>
          {/* <!-- tab area  --> */}
          <div className="p-5 space-y-5">
            <div className="teb-btn flex items-center -mx-5 border-b border-chatlook-grayLight">
              <h5 data-tab="tab-1"
                className={
                  isPersonal
                    ? "current text-base font-bold px-5 pb-3.5 border-b border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                    : "text-base font-bold px-5 pb-3.5 border-b border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                }
                onClick={(e) => {
                  setIsBusiness(false);
                  setIsPersonal(true);
                  setIsReel(false);
                }}
              >
                Personal Info
              </h5>
              <h5 data-tab="tab-2"
                className={
                  isBusiness
                    ? "current text-base font-bold px-5 pb-3.5 border-b border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                    : "text-base font-bold px-5 pb-3.5 border-b border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"
                }
                onClick={() => {
                  setIsPersonal(false);
                  setIsBusiness(true);
                  setIsReel(false);
                }}
              >
                Business Info
              </h5>
              {/*<h5*/}
              {/*onClick={() => {*/}
              {/*setIsReel(true);*/}
              {/*setIsPersonal(false);*/}
              {/*setIsBusiness(false);*/}
              {/*}}*/}
              {/*data-tab="tab-3"*/}
              {/*className={*/}
              {/*isReel*/}
              {/*? "current text-base font-bold px-5 pb-3.5 border-b border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"*/}
              {/*: "text-base font-bold px-5 pb-3.5 border-b border-chatlook-grayLight text-center cursor-pointer text-chatlook-gray"*/}
              {/*}*/}
              {/*>*/}
              {/*My Reels*/}
              {/*</h5>*/}
            </div>
            <div id="tab-1" className={isPersonal ? "current info-text  prasonal-info hidden" : "info-text  prasonal-info hidden"}>
              {isPersonal ? (
                <div className="flex flex-wrap -mx-3">
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-mail text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-35px)] text-sm space-y-1">
                      <h4 className="text-chatlook-dark font-bold">Email</h4>
                      <span className="leading-4 text-sm block">
                        {profileGets.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-age-range text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-35px)] text-sm space-y-1">
                      <h4 className="text-chatlook-dark font-bold">
                        Intrested Age Range
                      </h4>
                      <span className="leading-4 text-sm block">
                        {profileGets.interestedagerangemin} -
                        {profileGets.interestedagerangemax}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-gender text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-35px)] text-sm space-y-1">
                      <h4 className="text-chatlook-dark font-bold">Gender</h4>
                      <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {profileGets.gender}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                  </div>
                  {/* <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-phone-calling text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">
                        Phone Number
                      </h4>
                      {profileGets.contact_no && (
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          + {profileGets.contact_no}
                        </span>
                      )}
                    </div>
                  </div> */}
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-cake text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">
                        Date of Birth
                      </h4>
                      <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {profileGets.dob}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-user text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-35px)] text-sm space-y-1">
                      <h4 className="text-chatlook-dark font-bold">About us</h4>
                      <span className="leading-4 text-sm block">
                        {profileGets.aboutme}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                  </div>
                  {/* <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-location text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">Location</h4>
                      <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {add}
                      </span>
                    </div>
                  </div> */}

                  {/* <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-area-range text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">
                        Intrested Area Range
                      </h4>
                      {profileGets.areaRange && (
                        <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {profileGets.areaRange} km
                        </span>
                      )}
                    </div>
                  </div> */}
                  {/*<div className="flex items-start space-x-2.5 w-1/2 p-3">*/}
                  {/*<span className="icon-hobbies text-chatlook-sky flex text-xl"></span>*/}
                  {/*<div className="w-[calc(100%-35px)] text-sm space-y-1">*/}
                  {/*<h4 className="text-chatlook-dark font-bold">Hobbies</h4>*/}
                  {/*<div className="flex flex-wrap space-x-1">*/}
                  {/*{profileGets?.hobbies?.map((val) => {*/}
                  {/*return (*/}
                  {/*<span className="p-1 px-2 bg-chatlook-grayLight text-sm rounded-full my-1">*/}
                  {/*{val}*/}
                  {/*</span>*/}
                  {/*);*/}
                  {/*})}*/}
                  {/*</div>*/}
                  {/*</div>*/}
                  {/*</div>*/}
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-intrested text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-35px)] text-sm space-y-1">
                      <h4 className="text-chatlook-dark font-bold">
                        Intrested in
                      </h4>
                      <span className="leading-4 text-sm block">
                        {profileGets.interestedin}
                      </span>
                    </div>
                  </div>

                  {/* <div className="flex items-center w-1/2 p-3">
                    <span className="icon-call flex text-xl"></span>
                    <h4 className="text-chatlook-dark font-bold mx-2.5 text-base">
                      App-lock with face ID / fingerprint
                    </h4>
                    <div className="flex justify-center ml-auto mr-auto">
                      <div className="form-check form-switch relative">
                        <input
                          className="form-check-input appearance-none w-12 rounded-full float-left h-6 align-top checked:bg-chatlook-sky bg-gray-200 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          checked={false}
                          onChange={e => { }}
                        />
                        <span className="absolute w-4 h-4 bg-white rounded-full left-1.5 top-1/2 -translate-y-1/2 pointer-events-none touch-none anim z-10"></span>
                        <span className="text-chatlook-sky text-[10px] font-normal absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                          Off
                        </span>
                        <span className="text-white text-[10px] font-normal absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none touch-none">
                          ON
                        </span>
                      </div>
                    </div>
                  </div> */}
                </div>
              ) : null}
            </div>
            <div id="tab-2" className={isBusiness ? "current info-text  prasonal-info hidden" : "info-text  prasonal-info hidden"}>
              {isBusiness ? (

                <div className="flex flex-wrap -mx-3">
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-business text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">
                        Business Name
                      </h4>
                      <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {businessProfile?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-phone-calling text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">
                        Business Phone Number
                      </h4>
                      <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {businessProfile?.mobile_country_code} {businessProfile?.mobile}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-category text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">Category</h4>
                      <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {businessProfileGets.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-mail text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">Business Email</h4>
                      <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {businessProfile?.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-phone-calling text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">Business WhatsApp Phone Number</h4>
                      <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {businessProfile?.wamobile_country_code} {businessProfile?.wamobile}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-category text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">Business WebSite</h4>
                      <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {businessProfile?.website}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-location text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">Business Hours</h4>
                      <span className="text-sm whitespace-nowrap">
                        {businessProfile?.businesshours.length > 0 && businessProfile?.businesshours.map((schedule, index) => (
                          <div className="flex -mx-3" key={index} >
                            <div className="flex items-start space-x-2.5 w-1/2 p-3">
                              <span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{schedule.day}</span>
                            </div>
                            <div className="flex items-start space-x-2.5 w-1/2 p-3">-</div>
                            {schedule.open ? (
                              <>
                                <div className="flex items-start space-x-2.5 w-1/2 p-3">
                                  {schedule.starttime} {schedule.endtime}
                                </div>
                              </>
                            ) : <>
                              <div className="flex items-start space-x-2.5 w-1/2 p-3">
                                Closed
                              </div>
                            </>}

                          </div>
                        ))}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 w-1/2 p-3">
                    <span className="icon-location text-chatlook-sky flex text-xl"></span>
                    <div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">
                      <h4 className="text-chatlook-dark font-bold">Location</h4>
                      <Maps
                          handleClick={handleClick}
                          latitude={businessProfile.location.coordinates[0] ? businessProfile.location.coordinates[0] : 21.1702}
                          longitude={businessProfile.location.coordinates[1] ? businessProfile.location.coordinates[1] : 72.8311}
                          loadMap={loadMap}
                          latLngChange={latLngChange}
                          search={false}
                          styleHeight={{ height: "100px" }}
                      />
                      {/*<span className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">*/}
                        {/*{busiAdd}*/}
                      {/*</span>*/}
                    </div>
                  </div>
                  {/*<div className="flex items-start space-x-2.5 w-1/2 p-3">*/}
                  {/*<span className="icon-intrested text-chatlook-sky flex text-xl"></span>*/}
                  {/*<div className="w-[calc(100%-40px)] flex flex-col space-y-1.5">*/}
                  {/*<h4 className="text-chatlook-dark font-bold">*/}
                  {/*View Brochure*/}
                  {/*</h4>*/}
                  {/*<span*/}
                  {/*className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis flex items-center h-full cursor-pointer"*/}
                  {/*onClick={() => { onPdfDownload(); window.open(`https://festumfield.s3.ap-south-1.amazonaws.com/${businessProfileGets.brochure}`) }}*/}
                  {/*>*/}
                  {/*/!* {businessProfileGets.brochure} *!/*/}
                  {/*<File size={15} />*/}
                  {/*<p className="text-sm">*/}
                  {/*Click to View*/}
                  {/*</p>*/}
                  {/*</span>*/}
                  {/*</div>*/}
                  {/*</div>*/}
                </div>
              ) :
                <>
                  <div className="flex flex-col items-center justify-center flex-wrap -mx-3">
                    <h1 className="font-bold text-2xl md:space-y-3">Create Business Profile</h1>
                    <img src={CreateBusinessProfileImage} />
                  </div>
                </>
              }
            </div>
            <div
              id="tab-3"
              className={
                isReel
                  ? "current info-text business-info space-y-5 hidden"
                  : "info-text business-info space-y-5 hidden"
              }
            >
              {isReel ? (
                <div className="flex flex-wrap -mx-3">
                  <div className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-[14.28%] 2xl:w-[11.11%] p-3.5">
                    <div className="w-full bg-white rounded-md overflow-hidden h-36 relative">
                      <span className="w-5 h-5 rounded-full bg-white absolute top-3 right-3 icon-play text-[10px] text-chatlook-sky pl-0.5 cursor-pointer flex items-center justify-center"></span>
                      <img
                        src={ProductPic}
                        className="w-full h-full object-cover"
                        alt="product"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-[14.28%] 2xl:w-[11.11%] p-3.5">
                    <div className="w-full bg-white rounded-md overflow-hidden h-36 relative">
                      <span className="w-5 h-5 rounded-full bg-white absolute top-3 right-3 icon-play text-[10px] text-chatlook-sky pl-0.5 cursor-pointer flex items-center justify-center"></span>
                      <img
                        src={ProductPic}
                        className="w-full h-full object-cover"
                        alt="product"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main >
      <Modal isOpen={isprofileCreatePopUp}>
        <CreatePersonalProfileTwo setIsProfileCreatePopup={setIsProfileCreatePopup} />
      </Modal>
      <Modal isOpen={isBusinessprofileCreatePopUp}>
        <NewCreateBusinessProfileTow setIsBusinessProfileModalOpen={setIsBusinessProfileModalOpen} />
      </Modal>
    </>
  );
}
