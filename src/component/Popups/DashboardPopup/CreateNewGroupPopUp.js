import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImagePicker from "../../../Common/ImagePicker";
import {
  profilePictureSet,
  useProfileGets,
} from "../../../redux/Slice/profileSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Secondary, Success } from "../../../redux/services/toastServices";
import { createGroup, uploadGrpImg } from "../../../redux/Slice/chatSlice";
import { Context } from "../../../createContext";
import { MdKeyboardBackspace } from "react-icons/md"
import { IoClose } from "react-icons/io5"
import { friendsRequestsSearch, gropusRequestsSearch, setMyNewGroupList } from "../../../redux/Slice/requestSlice";
import { useNavigate } from "react-router-dom";


export default function CreateNewGroupPopUp({
  selectedFriendsList,
  handleClose,
  setOldPopUp,
}) {
  const [groupImage, setGroupImage] = useState();
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { allFriendsRequest } = useContext(Context);

  const initialValues = {
    name: "",
    description: "",
  };

  const onSubmit = async (values) => {

    handleClose(false);
    setOldPopUp(false);

    const createGrpPayload = {
      profileimage: groupImage,
      name: values.name,
      description: values.description,
      members: selectedFriendsList,
    };
    try {

      const response = await dispatch(createGroup(createGrpPayload)).unwrap();
      if (response.data.IsSuccess) {
        Success(response.data.Message);
        const updateResponse = await dispatch(gropusRequestsSearch({
          page: 1,
          limit: 50,
          search: ""
        }))

        dispatch(setMyNewGroupList(updateResponse?.payload?.data?.Data))
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("Invalid group name already exist, please try again with new name");
    }
  };
  const validationSchema = Yup.object({});

  const handleImageUpload = async (files) => {
    try {
      let formData = new FormData();
      formData.append("file", files[0]);
      const response = await dispatch(uploadGrpImg(formData)).unwrap();
      if (response.data.IsSuccess) {
        Success(response.data.Message);
        setGroupImage(`${response.data.Data.Key}`);
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
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
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  useEffect(() => {
    return () => {
      navigate("../dashboard")
    }
  }, [])
  return (
    <div className="fixed inset-0 min-h-screen overflow-y-auto flex items-center justify-center py-10 px-5  bg-black/60">
      <div
        className="absolute z-10 top-0 right-0 bottom-0 left-0 h-full w-full"
        onClick={() => {
          handleClose(false);
          setOldPopUp(false);
        }}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[480px] bg-white p-8 rounded-[15px] space-y-4"
        style={{ zIndex: "9999999999999" }}
      >
        <div className="flex items-center ">
          <MdKeyboardBackspace className="text-2xl cursor-pointer" onClick={() => { handleClose(false) }} />
          <div className="flex items-center justify-center w-full ">

            <h2 className="text-xl lg:text-2xl font-bold text-center">
              Create New Group
            </h2>

          </div>
          {/* <IoClose className="text-red-600 font-bold text-2xl cursor-pointer" onClick={() => { handleClose(false) }} /> */}


        </div>
        <div className="w-full">
          <div>
            <div className="relative pb-7">
              <div className="w-32 h-32 bg-chatlook-grayLight border border-chatlook-sky rounded-full p-1 relative mx-auto">
                <ImagePicker
                  isDefaultDesign={false}
                  showPreview={true}
                  label={false}
                  classNameMain="flex items-center justify-center w-full h-full"
                  onDrop={(files) => {
                    handleImageUpload(files);
                  }}
                >
                  {groupImage ? (
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={`https://festumfield.s3.ap-south-1.amazonaws.com/${groupImage}`}
                        className="absolute h-full inset-0 object-cover p-1 rounded-full w-full"
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
            <div className="w-full py-5">
              <div className="bg-chatlook-grayLight p-2.5 rounded-[5px]">
                <input
                  type="text"
                  placeholder="Caroline"
                  name="name"
                  className="w-full"
                  value={values.name}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <textarea
                name="description"
                id=""
                rows="3"
                className="w-full bg-chatlook-grayLight p-3 rounded-[5px] text-chatlook-gray font-medium resize-none focus-visible:outline-none"
                placeholder="About us"
                value={values.description}
                onChange={handleChange}
              // errors={errors}
              // touched={touched}
              // required
              ></textarea>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-24 lg:w-[138px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium mt-3 mx-auto"

        >
          DONE
        </button>
      </form>
    </div >
  );
}
