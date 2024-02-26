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

export default function AddNewProduct() {
  const navigate = useNavigate();
  const { isedit } = useParams();

  const productGetByIds = useProductGetByIds();
  const dispatch = useDispatch();
  const { productListApi } = useContext(Context);

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
    offer: Yup.number("offer must be a number").max(100, "Offer must be in  0% to 100%"),
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

              <div className="w-full p-2.5">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full bg-chatlook-grayLight rounded-md p-4"
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
              <div className="w-full p-2.5">
                <input
                  type="number"
                  placeholder="Product Price"
                  className="w-full bg-chatlook-grayLight rounded-md p-4"
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

              <div className="w-full p-2.5">
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full bg-chatlook-grayLight rounded-md p-4"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                // errors={errors}
                // touched={touched}
                // required
                />
                <span className="error-msg-span">
                  {errors.category && touched.category && errors.category}
                </span>
              </div>
              <div className="w-full p-2.5">
                <input
                  type="text"
                  placeholder="Sub Category"
                  className="w-full bg-chatlook-grayLight rounded-md p-4"
                  name="subCategory"
                  value={values.subCategory}
                  onChange={handleChange}
                />
                <span className="error-msg-span">
                  {errors.subCategory &&
                    touched.subCategory &&
                    errors.subCategory}
                </span>
              </div>
              <div className="w-full p-2.5">
                <input
                  type="text"
                  placeholder="Offers (%)"
                  className="w-full bg-chatlook-grayLight rounded-md p-4"
                  name="offer"
                  value={values.offer}
                  onChange={handleChange}
                // errors={errors}
                // touched={touched}
                // required
                />
                <span className="error-msg-span">
                  {errors.offer && touched.offer && errors.offer}
                </span>
              </div>
              <div className="w-full p-2.5">
                <input
                  type="text"
                  placeholder="Product Code"
                  className="w-full bg-chatlook-grayLight rounded-md p-4"
                  name="itemCode"
                  value={values.itemCode}
                  onChange={handleChange}
                // errors={errors}
                // touched={touched}
                // required
                />
                <span className="error-msg-span">
                  {errors.itemCode && touched.itemCode && errors.itemCode}
                </span>
              </div>
              <div className="w-full p-2.5">
                <textarea
                  id="prodDesc"
                  rows="4"
                  placeholder="Product Description"
                  className="w-full bg-chatlook-grayLight p-4 placeholder:text-sm focus-visible:outline-none resize-none rounded-md"
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
      </main>
    </form>
  );
}
