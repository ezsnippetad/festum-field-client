import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  getProduct,
  newProductCreate,
  productUpdate,
  productsImageUpload,
  useProductGetByIds,
} from "../../redux/Slice/productSlice";
import ImagePicker from "../../Common/ImagePicker";
import { Context } from "../../createContext";
import { Secondary, Success } from "../../redux/services/toastServices";

export default function NewAddNewProduct() {
  const navigate = useNavigate();
  const { isedit } = useParams();
  const [isView, setIsView] = useState(false);

  const productGetByIds = useProductGetByIds();
  const dispatch = useDispatch();
  const { productListApi } = useContext(Context);
  const [uploadedPdfMessage, setUploadedPdfMessage] = useState("");

  const [image, setImage] = useState([
    {
      id: 0,
      value: "",
    },
    {
      id: 1,
      value: "",
    },
    {
      id: 2,
      value: "",
    },
    {
      id: 3,
      value: "",
    },
  ]);

  const initialValues = {
    name: "",
    price: 0,
    description: "",
    category: "",
    subCategory: "",
    offer: "",
    itemCode: "",
    images: [],
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("*Name require"),
    price: Yup.string().required("Price require"),
    description: Yup.string().required("*Description require"),
    category: Yup.string().required("Category require"),
    subCategory: Yup.string().required("Subcategory require"),
    offer: Yup.number("offer must be a number").max(
      100,
      "Offer must be in  0% to 100%"
    ),
    itemCode: Yup.string().required("Itemcode require"),
  });
  const ProductsImageUpload = async (files, key) => {
    try {
      let formData = new FormData();
      formData.append("file", files[0]);
      const response = await dispatch(productsImageUpload(formData)).unwrap();
      if (response.data.IsSuccess) {
        Success(response.data.Message);
        let array = Object.assign([], image);
        let i = array.findIndex((val) => val.id == key);
        if (i > -1) {
          array[i] = {
            id: key,
            value: `${response.data.Data.Key}`,
          };
          setImage(array);
        }
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };

  const productCreateNew = async (values) => {
    try {
      let payload = Object.assign({}, values);
      let images = [];
      payload.images?.forEach((val) => {
        if (val.value) {
          images.push(val.value);
        }
      });
      payload["images"] = [...images];

      const response = await dispatch(newProductCreate(payload)).unwrap();
      if (response.data.IsSuccess) {
        navigate("/product");

        Success(response.data.Message);
        dispatch(getProduct({}));
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };
  const onSubmit = (values) => {
    if (isedit === "true") {
      UpdateProduct(values);
    } else {
      productCreateNew({ ...values, images: image });
    }
  };

  const UpdateProduct = async (values) => {
    try {
      let payload = Object.assign({}, values);
      let images = [];
      image.forEach((val) => {
        if (val.value) {
          images.push(val.value);
        }
      });
      payload["images"] = [...images];
      payload["productid"] = productGetByIds._id;
      const response = await dispatch(productUpdate(payload)).unwrap();
      if (response.data.IsSuccess) {
        navigate("/product");
        productListApi();
        Success(response.data.Message);
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      console.log(error);
      Secondary("SOMETHING WENT WRONG.");
    }
  };

  const fillValues = (values) => {
    setValues({
      name: values?.name ? values?.name : "",
      price: values?.price ? values?.price : "",
      description: values?.description ? values?.description : "",
      category: values?.category ? values?.category : "",
      subCategory: values?.subCategory ? values?.subCategory : "",
      offer: values?.offer ? values?.offer : "",
      itemCode: values?.itemCode ? values?.itemCode : "",
      // images:
    });

    let array = image?.map((val, index) => {
      return {
        id: index,
        value:
          values?.images?.length && values?.images[index]
            ? values.images[index]
            : "",
      };
    });
    setImage(array);
  };

  useEffect(() => {
    if (isedit === "true") {
      fillValues({
        name: productGetByIds?.name,
        price: productGetByIds?.price,
        description: productGetByIds?.description,
        category: productGetByIds?.category,
        subCategory: productGetByIds?.subCategory,
        offer: productGetByIds?.offer,
        itemCode: productGetByIds?.itemCode,
        images: productGetByIds?.images,
      });
    } else {
      fillValues({});
    }
  }, [productGetByIds, isedit]);
  const onCloseBtn = (id) => {
    let array = Object.assign([], image);
    let i = array.findIndex((x) => x.id === id);

    if (i > -1) {
      array[i] = { id, value: "" };
      setImage(array);
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

  return (
    <form className="main-content" onSubmit={handleSubmit}>
      <header className="z-50">
        <div className="flex justify-between items-center w-full">
          <h3>
            <a
              className="icon-close inline-block text-chatlook-gray text-xl mr-4"
              onClick={() => navigate("/product")}
            ></a>
            {isedit === "true" ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            type="submit"
            className="inline-block bg-chatlook-sky text-white uppercase rounded-md px-12 py-2.5 text-lg font-normal"
          >
            Save
          </button>
        </div>
      </header>
      <main className="relative px-5 py-10">
        <div className="max-w-[800px] mx-auto">
          <div className="w-full">
            <div className="flex flex-wrap -mx-2.5">
              {image?.length &&
                image.map((val, index) => (
                  <>
                    {index === 0 ? (
                      <div className="w-full p-2.5">
                        <div className="rounded-md h-80 w-full bg-chatlook-grayLight relative cursor-pointer">
                          <ImagePicker
                            isDefaultDesign={false}
                            showPreview={false}
                            label={false}
                            classNameMain="h-full"
                            classNameDiv="h-full"
                            // classNameMain="d-flex image-input"
                            onDrop={(files) => {
                              ProductsImageUpload(files, index);
                            }}
                          >
                            {val?.value ? (
                              <div
                                className="h-full"
                                style={{ display: "unset" }}
                              >
                                <img
                                  src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val.value}`}
                                  className="rounded-md h-80 w-full bg-chatlook-grayLight relative"
                                />
                                {/* <AiOutlineClose
                                          className="close-svg"
                                          onClick={() => onCloseBtn(val.id)}
                                        /> */}
                              </div>
                            ) : (
                              <label
                                for="addproduct"
                                className="flex flex-col h-full justify-center space-y-2"
                              >
                                <span className="icon-add-img flex items-center justify-center text-6xl"></span>
                                <h3 className="text-chatlook-gray text-center text-sm">
                                  Add Image
                                </h3>
                              </label>
                            )}
                          </ImagePicker>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full md:w-1/3 p-2.5">
                        <div className="rounded-md h-24 w-full bg-chatlook-grayLight relative cursor-pointer">
                          <ImagePicker
                            isDefaultDesign={false}
                            showPreview={true}
                            label={false}
                            classNameMain="h-full"
                            classNameDiv="h-full"
                            onDrop={(files) => {
                              ProductsImageUpload(files, index);
                            }}
                          >
                            {val?.value ? (
                              <div className="h-full w-full">
                                <img
                                  src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val.value}`}
                                  className="rounded-md h-24 w-full bg-chatlook-grayLight relative"
                                />
                                {/* <AiOutlineClose
                                          className="close-svg"
                                          onClick={() => onCloseBtn(val.id)}
                                        /> */}
                              </div>
                            ) : (
                              <label
                                for="addproduct"
                                className="flex flex-col h-full justify-center space-y-2"
                              >
                                <span className="icon-add-img flex items-center justify-center text-2xl"></span>
                                <h3 className="text-chatlook-gray text-center font-medium text-xs">
                                  Add Image
                                </h3>
                              </label>
                            )}
                          </ImagePicker>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              <div className="w-full flex md:flex-row flex-col items-center justify-center p-3">
                <div className="md:w-[576px] w-full pr-5">
                  <div>
                    <div className="w-full ">
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
                            // onDrop={(files) => {
                            //   // Filter only PDF files
                            //   const pdfFiles = files.filter(
                            //     (file) => file.type === "application/pdf"
                            //   );

                            //   if (pdfFiles.length > 0) {
                            //     // Handle PDF files
                            //     updateBrochure(pdfFiles);
                            //     setUploadedPdfMessage(
                            //       "Brochure Uploaded Successfully"
                            //     );
                            //     setPdfError("");
                            //   } else if (pdfFiles.length === 0) {
                            //     setPdfError("Please upload only PDF files.");
                            //     setbrochureProfile("");
                            //     // Handle error for non-PDF files
                            //     // For example, display an error message
                            //   }
                            // }}
                            accept=".pdf"
                          >
                            <div className="brochure-main-div h-full w-full">
                              <div className="brochure-div h-full w-full">
                                <div className="flex items-center h-full w-full justify-center why why hey what's up why hello why why">
                                  {/* <AiOutlineUpload /> */}
                                  <span className="icon-upload-2 text-base text-chatlook-gray"></span>

                                  {/* {uploadedPdfMessage !== "" ? (
                                    <p className="p-2 text-sm text-green-500">
                                      {uploadedPdfMessage}
                                    </p>
                                  ) : (
                                    <p className="p-2 text-sm font-bold">
                                      Add Brochure{" "}
                                    </p>
                                  )} */}
                                  <p className="p-2 text-sm">
                                    Upload Brochure PDF
                                  </p>
                                </div>
                                <span className="error-msg-span">
                                  {/* {pdfError} */}
                                </span>
                                <p style={{ fontSize: "10px" }}>
                                  {/* {brochureProfile ? brochureProfile : null} */}
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
                          <div className="flex flex-wrap -mx-1">
                            <div className="w-28 h-28 p-1">
                              <div className="relative w-full h-full overflow-hidden rounded group bg-chatlook-dark">
                                <img
                                  src={image}
                                  alt=""
                                  className="w-full h-full object-cover group-hover:opacity-50"
                                />
                                <span className="group absolute right-2 top-2 w-7 h-7 rounded-full border border-chatlook-red bg-chatlook-red flex items-center justify-center hover:bg-white cursor-pointer translate-x-20 group-hover:translate-x-0 anim">
                                  <span className="icon-delete text-sm text-white how hover:text-chatlook-red"></span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-[calc(100%-576px)] w-full">
                  <div>
                    <div className="w-full -mx-3">
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
                            // onDrop={(files) => {
                            //   // Filter only PDF files
                            //   const pdfFiles = files.filter(
                            //     (file) => file.type === "application/pdf"
                            //   );

                            //   if (pdfFiles.length > 0) {
                            //     // Handle PDF files
                            //     updateBrochure(pdfFiles);
                            //     setUploadedPdfMessage(
                            //       "Brochure Uploaded Successfully"
                            //     );
                            //     setPdfError("");
                            //   } else if (pdfFiles.length === 0) {
                            //     setPdfError("Please upload only PDF files.");
                            //     setbrochureProfile("");
                            //     // Handle error for non-PDF files
                            //     // For example, display an error message
                            //   }
                            // }}
                            accept=".pdf"
                          >
                            <div className="brochure-main-div h-full w-full">
                              <div className="brochure-div h-full w-full">
                                <div className="flex items-center h-full w-full justify-center">
                                  {/* <AiOutlineUpload /> */}
                                  <span className="icon-upload-2 text-base text-chatlook-gray"></span>

                                  {/* {uploadedPdfMessage !== "" ? (
                                    <p className="p-2 text-sm text-green-500">
                                      {uploadedPdfMessage}
                                    </p>
                                  ) : (
                                    <p className="p-2 text-sm font-bold">
                                      Add Brochure{" "}
                                    </p>
                                  )} */}
                                  <p className="p-2 text-sm">
                                    Upload Brochure PDF
                                  </p>
                                </div>
                                <span className="error-msg-span">
                                  {/* {pdfError} */}
                                </span>
                                <p style={{ fontSize: "10px" }}>
                                  {/* {brochureProfile ? brochureProfile : null} */}
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
                          <div className="flex flex-wrap -mx-1">
                            <div className="w-28 h-28 p-1">
                              <div className="relative w-full h-full overflow-hidden rounded group bg-chatlook-dark">
                                <img
                                  src={image}
                                  alt=""
                                  className="w-full h-full object-cover group-hover:opacity-50"
                                />
                                <span className="group absolute right-2 top-2 w-7 h-7 rounded-full border border-chatlook-red bg-chatlook-red flex items-center justify-center hover:bg-white cursor-pointer translate-x-20 group-hover:translate-x-0 anim">
                                  <span className="icon-delete text-sm text-white how hover:text-chatlook-red"></span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-wrap">
                <div className="w-full md:w-1/2 p-2.5">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full bg-chatlook-grayLight rounded-md p-4 "
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
                <div className="w-full md:w-1/2  p-2.5 flex ">
                  <div className="pr-3">
                    <div className="h-full w-12 rounded flex items-center justify-center bg-chatlook-sky text-white">
                      $
                    </div>
                  </div>
                  <input
                    type="number"
                    placeholder="Product Price"
                    className="w-full bg-chatlook-grayLight rounded-md p-4 "
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                  />
                  <span className="error-msg-span">
                    {errors.price && touched.price && errors.price}
                  </span>
                </div>
                <div className="w-full p-2.5 md:w-1/2">
                  <select
                    name="cars"
                    id="cars"
                    className="w-full bg-chatlook-grayLight rounded-md p-4 outline-none"
                    value={values.category}
                    onChange={handleChange}
                    form="carform"
                  >
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>

                  <span className="error-msg-span">
                    {errors.category && touched.category && errors.category}
                  </span>
                </div>

                <div className="w-full p-2.5 md:w-1/2 flex items-center justify-center">
                  <input
                    type="text"
                    placeholder="Offers (%)"
                    className="w-full bg-chatlook-grayLight rounded-md p-4 "
                    name="offer"
                    value={values.offer}
                    onChange={handleChange}
                    // errors={errors}
                    // touched={touched}
                    // required
                  />
                  <div className="h-full pl-3">
                    <div className="h-full w-12 rounded flex items-center justify-center border text-chatlook-sky border-chatlook-sky bg-[#ECFBFC]">
                      %
                    </div>
                  </div>
                  <div className="h-full  pl-3 ">
                    <div className="h-full w-12 rounded flex items-center justify-center  bg-chatlook-sky text-white">
                      $
                    </div>
                  </div>
                  <span className="error-msg-span">
                    {errors.offer && touched.offer && errors.offer}
                  </span>
                </div>

                <div className="w-full p-2.5">
                  <textarea
                    id="prodDesc"
                    rows="4"
                    placeholder="Product Description"
                    className="w-full  bg-chatlook-grayLight p-4 placeholder:text-sm focus-visible:outline-none resize-none rounded-md"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  ></textarea>
                  <span className="error-msg-span">
                    {errors.description &&
                      touched.description &&
                      errors.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
}
