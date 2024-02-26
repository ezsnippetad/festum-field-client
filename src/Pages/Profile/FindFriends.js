import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineEnvironment } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { findFriendsByLocation } from "../../redux/Slice/locationSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Maps } from "../../Common/Maps";
import Geocode from "react-geocode";
import { Secondary, LeftNotifier } from "../../redux/services/toastServices";
import { useNavigate } from "react-router-dom";
import { profileGet, useProfileGets } from "../../redux/Slice/profileSlice";
import { ArrowLeft } from "lucide-react";
import Demo from "../../assets/images/Basic.png"
import Chat from "../../assets/images/Chat.png"
import FindFriend from "../../assets/images/FindFriend.svg"
import { setFriendListSidebar, useFriendListSideBar } from "../../redux/Slice/sidebarslices";

Geocode.setApiKey("AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q");
let marker;
const FindFriendsPage = () => {
  const navigate = useNavigate();
  const [lati, setLati] = useState(21.1702);
  const [long, setLong] = useState(72.8311);
  const [latFriendsLocation, setLatFriendsLocation] = useState();
  const [lngFriendsLocation, setLngFriendsLocation] = useState();
  const [locationPermission, setLocationPermission] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const myProfile = useProfileGets()
  const dispatch = useDispatch();
  const handleFindFriendSideBar = useFriendListSideBar()
  console.log('handleFindFriendSideBar', handleFindFriendSideBar)

  const initialValues = {
    latitude: lati,
    longitude: long,
    search: "",
  };
  const validationSchema = Yup.object({});
  const markers = [
    {
      name: "locate-1",
      location: {
        lat: 30.3598,
        lng: 78.0644,
      },
    },
    {
      name: "locate-2",
      location: {
        lat: 21.1702,
        lng: 72.8311,
      },
    },
  ];
  useEffect(() => {
    if (myProfile?.fullName === "") {
      navigate("/dashboard")
    }
    dispatch(profileGet())
  }, [])

  const defaultProps = {
    center: {
      lat: 21.053527775709725,
      lng: 72.85626130203369,
    },
    zoom: 11,
  };
  useEffect(() => {
    // Check for geolocation support in the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationPermission('granted');
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocationPermission('denied');
            alert("turn on loaction permission!!")

          } else {
            setLocationPermission('prompt');
          }
        }
      );
    } else {
      setLocationPermission('not-supported');
    }
  }, []);

  const FindFriendsByLocation = async () => {
    const payload = {
      latitude: values?.latitude ? values.latitude : defaultProps.center.lat,
      longitude: values?.longitude ? values.longitude : defaultProps.center.lng,
      search: values?.search ? values.search : "",
    };
    try {
      const response = await dispatch(findFriendsByLocation(payload)).unwrap();
      if (response.data.IsSuccess && response.data.Data.length > 0) {
        setLatFriendsLocation(response.data.Data);
        setLngFriendsLocation(response.data.Data[0].location.coordinates[0]);
      } else {
        LeftNotifier("USER NOT FOUND");
      }
    } catch (error) {
      Secondary("SOMETHING WENT WRONG.");
    }
  };

  const onSubmit = () => { };

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

  useEffect(() => {
    FindFriendsByLocation();
  }, [values]);

  const getAddress = (lat, lng) => {
    setLati(lat);
    setLong(lng);
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

      },
      (error) => {
        console.error(error);
      },
    );
  };
  const handleClick = (address, lng, lat, latlng) => {
    setLati(lat);
    setLong(lng);
    // setAdd(address);
    values = {
      lati: lat,
      long: lng,
    };
    marker.setPosition(latlng);
    // marker.setCoordinates( lat,lng )
  };

  const loadMap = (map, maps) => {
    marker = new maps.Marker({
      position: { lat: values.latitude, lng: values.longitude },
      map,
      draggable: true,
    });
    marker.addListener("dragend", (e) => {
      setValues({
        ...values,
        latitude: marker.getPosition().lat(),
        longitude: marker.getPosition().lng(),
      });
      getAddress(marker.getPosition().lat(), marker.getPosition().lng());
    });
  };
  const latLngChange = (address) => {
    marker.setPosition(address);
  };
  const searchingChange = (address) => {
    setValues({ ...values, search: address });
    marker.setPosition(address);
  };
  return (
    <Fragment>
      <div className={`h-screen w-[375px] bg-white fixed right-0 z-[51] ${handleFindFriendSideBar ? "" : "translate-x-full"}  anim`}>
        <div className="flex space-x-4 shadow-bottom px-5 py-4">
          <ArrowLeft className="text-chatlook-sky cursor-pointer" onClick={() => { dispatch(setFriendListSidebar(false)) }} />
          <h1 className="font-bold text-base">Friends List</h1>
        </div>
        <div className="w-full h-[calc(100%-56px)] p-5 ">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Intrested Area Range:
              <span className="text-chatlook-sky">
                10 KM
              </span>
            </h2>
            <h2 className="text-chatlook-sky font-normal  text-base">
              36 Friends
            </h2>
          </div>
          <div className="py-5 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center  justify-center space-x-3">
                <img className="h-12 w-12 rounded-full" src={Demo} />
                <div>
                  <h3 className="text-[16px] font-bold">Cameron Williamson</h3>
                  <p className="text-chatlook-gray text-[12px] pt-2">+92 9876543213</p>
                </div>
              </div>
              <button className="w-20 h-5 bg-chatlook-sky text-[12px] text-white rounded  ">
                Sent Request
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center  justify-center space-x-3">
                <img className="h-12 w-12 rounded-full" src={Demo} />
                <div>
                  <h3 className="text-[16px] font-bold">Jenny Wilson</h3>
                  <p className="text-chatlook-gray text-[12px] pt-2">+92 9876543213</p>
                </div>
              </div>
              <button className="w-24 h-5 bg-chatlook-gray text-[12px] text-white rounded  ">
                Cancel Request
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center  justify-center space-x-3">
                <img className="h-12 w-12 rounded-full" src={Demo} />
                <div>
                  <h3 className="text-[16px] font-bold">Cameron Williamson</h3>
                  <p className="text-chatlook-gray text-[12px] pt-2">+92 9876543213</p>
                </div>
              </div>
              <img src={Chat} />
            </div>
          </div>
        </div>
      </div>
      <header>
        <div className="flex justify-between items-center w-full">
          <div
            className="icon-back text-2xl text-chatlook-sky px-2"
            onClick={() => navigate(-1)}
          ></div>
          <button onClick={() => { dispatch(setFriendListSidebar(true)) }}>
            <img src={FindFriend} />
          </button>
        </div>
      </header>
      <main className="relative z-30 contents">
        <div className="w-full">
          <div className="w-full h-[calc(100vh-144px)]">
            {values?.longitude === "" && values?.latitude === "" ? (
              <Maps
                handleClick={handleClick}
                latitude={lati}
                longitude={long}
                loadMap={loadMap}
                latLngChange={latLngChange}
                searchingChange={searchingChange}
                search={true}
                listingPins={latFriendsLocation}
              />
            ) : (
              <Maps
                handleClick={handleClick}
                latitude={values.latitude}
                longitude={values.longitude}
                loadMap={loadMap}
                latLngChange={latLngChange}
                searchingChange={searchingChange}
                search={true}
                styles={{ height: "calc(100vh - 144px)", position: "relative" }}
                listingPins={latFriendsLocation}
              />
            )}
          </div>
        </div>
        <div className="flex justify-center items-center h-16 space-x-2">
          <div className="location">
            <AiOutlineEnvironment className="i-2 text-2xl text-chatlook-sky" />
          </div>
          <div className="text-center text-base md:text-lg">
            {/* <b onClick={requestLocationPermission}> Location Must Be On</b> */}
            <b className="text-green-600">
              {locationPermission === "granted" && "Location Permission is On"}
            </b>
            <b className="text-red-500">
              {locationPermission === "denied" && "Please turn on the Location Permission"}
            </b>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default FindFriendsPage;
