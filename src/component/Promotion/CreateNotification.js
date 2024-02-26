import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotificationPreview from "../../assets/images/noti-1.png";
import {
  newNotificationCreate,
  notificationBannerSet,
  notificationGetById,
  notificationUpdate,
  useNotificationGetId,
} from "../../redux/Slice/notificationSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImagePicker from "../../Common/ImagePicker";
import { Secondary, Success } from "../../redux/services/toastServices";

function CreateNotification() {
  const [image, setImage] = useState("");
  const [fileObj, selFileObj] = useState({})
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [imageError, setImageError] = useState("")
  const initialValues = {
    // notificationid: id, 
    title: "",
    description: "",
    link: "",
    imageUrl: fileObj,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is Require!"),
    description: Yup.string().required("Description is Require!"),
    link: Yup.string().required("Link is Require!"),

  })
  const notificationGetByIds = useNotificationGetId();

  const NotificationBanner = async (files) => {
    try {
      let formData = new FormData();
      formData.append("file", files[0]);

      const getFile = formData.getAll("file")[0]
      selFileObj(getFile)


      const response = await dispatch(notificationBannerSet(formData)).unwrap();
      if (response.data.IsSuccess) {
        setImage(`${response.data.Data.s3_url}${response.data.Data.Key}`);
        Success(response.data.Message);
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      Secondary("SOMETHING WENT WRONG.");
    }
  };

  const CreateNotification = async (values) => {
    if (!fileObj || Object.keys(fileObj).length === 0) {
      setImageError("Please upload an image first");
      return
    } else {
      setImageError("");
    }

    try {
      let payload = Object.assign({}, values);
      payload["imageUrl"] = image;
      const response = await dispatch(newNotificationCreate(payload)).unwrap();
      if (response.data.IsSuccess) {
        navigate(-1);
        Success(response.data.Message);
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };

  const UpdateNotification = async (values) => {
    try {
      let payload = values;
      payload["notificationid"] = id;
      payload["imageUrl"] = image;
      // payload["imageUrl"] = image;
      const response = await dispatch(notificationUpdate(payload)).unwrap();
      if (response.data.IsSuccess) {
        navigate(-1);
        Success(response.data.Message);
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };
  const onSubmit = (values) => {

    if (id) {
      UpdateNotification(values);
    } else {
      CreateNotification(values);
    }
  };

  const NotificationGetById = async () => {
    try {
      let payload = {
        nid: id,
      };
      if (id) {
        const response = await dispatch(notificationGetById(payload)).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    NotificationGetById();
  }, [id]);

  useEffect(() => {
    if (id) {
      setValues({
        ...values,
        title: notificationGetByIds?.title ? notificationGetByIds?.title : "",
        description: notificationGetByIds?.description
          ? notificationGetByIds?.description
          : "",
        link: notificationGetByIds?.link ? notificationGetByIds?.link : "",
        imageUrl: notificationGetByIds?.imageUrl
          ? notificationGetByIds?.imageUrl
          : "https://festumfield.s3.ap-south-1.amazonaws.com/63ef604d7b3efbac81edb61a/notification/IMG/IMG-66246844427995.jpeg",
      });
      setImage(notificationGetByIds?.imageUrl);
    } else {
      setValues(values);
      setImage("")
    }

    return () => {

    }
  }, [notificationGetByIds]);
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


  return (
    <main className="relative h-screen">
      <div className="py-10 px-5 lg:px-12">
        {/* <!-- back button  --> */}
        <div className="pb-8 flex items-center space-x-3">
          <Link to={"/dashboard/promotions"} className="flex cursor-pointer">
            <span className="icon-back text-chatlook-sky text-3xl inline-block"></span>
            <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
              Create Notification
            </h4>
          </Link>
        </div>
        {/* <!-- edit area  --> */}
        <div className="max-w-4xl w-full mx-auto pt-7">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full p-3">
                <div className="w-full h-32 bg-chatlook-grayLight rounded-md relative flex items-center justify-center">
                  <ImagePicker
                    isDefaultDesign={false}
                    showPreview={false}
                    label={false}
                    classNameMain="h-full w-full"
                    classNameDiv="h-full w-full"
                    onDrop={(files) => {
           
                      if (files.path !== "") {
                        setImageError("")
                      }
                      NotificationBanner(files);
                    }}
                  >
                    {image ? (
                      <div
                        className="h-full w-full"
                        style={{ display: "unset" }}
                      >
                        <img
                          src={image}
                          className="rounded-md h-32 w-full bg-chatlook-grayLight relative"
                        />
                        {/* <AiOutlineClose
                                          className="close-svg"
                                          onClick={() => onCloseBtn(val.id)}
                                        /> */}
                      </div>
                    ) : (
                      <label
                          htmlFor="addproduct"
                        className="flex flex-col h-full justify-center space-y-2"
                      >
                        <span className="icon-add-img flex items-center justify-center text-6xl"></span>
                        <h3 className="text-chatlook-gray text-center text-sm">
                          Upload Image
                        </h3>
                      </label>
                    )}
                  </ImagePicker>

                </div>
                <div className="text-red-500 text-sm">
                  {/* {errors.imageUrl && touched.imageUrl ? (
                    <div >{errors.imageUrl}</div>
                  ) : null} */}
                  {imageError}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <input
                  type="text"
                  placeholder="Notification Title"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
                <div className="text-red-500 text-sm">
                  {errors.title && touched.title ? (
                    <div >{errors.title}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <input
                  type="text"
                  placeholder="Link"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"
                  name="link"
                  value={values.link}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
                <div className="text-red-500 text-sm">
                  {errors.link && touched.link ? (
                    <div >{errors.link}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-full p-3">
                <textarea
                  id=""
                  rows="3"
                  className="w-full bg-chatlook-grayLight px-4 py-3 rounded-md resize-none focus-visible:outline-none"
                  placeholder="Notification Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                ></textarea>
                <div className="text-red-500 text-sm">
                  {errors.description && touched.description ? (
                    <div >{errors.description}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="w-full mt-7">
              <button
                type="submit"
                className="w-24 lg:w-full max-w-[250px] block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium mx-auto"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CreateNotification;
