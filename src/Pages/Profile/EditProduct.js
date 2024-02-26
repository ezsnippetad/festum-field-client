import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearProductList,
  getProduct,
  newProductCreate,
  productGetById,
  productUpdate,
  productsImageUpload,
  useProductGetByIds,
} from "../../redux/Slice/productSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImagePicker from "../../Common/ImagePicker";
import { Secondary, Success } from "../../redux/services/toastServices";

export default function EditProduct() {
  const { id } = useParams();
  const productGetByIds = useProductGetByIds();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    price: null,
    description: "",
    offer: "",
    category: "",
    subCategory: "",
    itemCode: "",
    images: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is require"),
    price: Yup.string().required("Price  is require"),
    description: Yup.string().required("Description is Require"),
    offer: Yup.number("offer must be a number").max(100, "Offer must be in  0% to 100%"),
    category: Yup.string().required("Category is Require"),
    subCategory: Yup.string().required("Sub Category is Require"),
    itemCode: Yup.string().required("ItemCode is Require"),
    // images: Yup.mixed().test('is-empty', 'Upload at least one file first', function (value) {
    //   const allEmpty = image.every(item => item.value === '');
    //   console.log('allEmpty', allEmpty)
    //   if (allEmpty && !value) {
    //     return this.createError({
    //       path: this.path,
    //       message: this.options.message,
    //     });
    //   } else if (value) {

    //     return true;
    //   }
    // }),
  })

  const ProductGetById = async () => {
    try {
      let payload = {
        pid: id,
      };
      const response = await dispatch(productGetById(payload)).unwrap();
    } catch (error) {
    }
  };

  useEffect(() => {
    ProductGetById();
  }, [id]);

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
        Success(response.data.Message);
        dispatch(getProduct({}));
        navigate("/dashboard/profile/ourproducts");
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      Secondary("SOMETHING WENT WRONG.");
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
        // ProductGetById();
        navigate("/dashboard/profile/ourproducts");
        Success(response.data.Message);
      } else {
        Secondary(response.Message);
      }
    } catch (error) {
      Secondary("SOMETHING WENT WRONG.");
    }
  };
  const onSubmit = (values) => {
    // dispatch(clearProductList())
    if (id) {
      UpdateProduct(values);
    } else {
      productCreateNew({ ...values, images: image });
    }
  };

  const fillValues = (values) => {
    setValues({
      name: values?.name ? values?.name : "",
      price: values?.price ? values?.price : "",
      description: values?.description ? values?.description : "",
      offer: values?.offer ? values?.offer : "",
      itemCode: values?.itemCode ? values?.itemCode : "",
      category: values?.category ? values?.category : "food",
      subCategory: values?.subCategory ? values?.subCategory : "food",
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
    if (id) {
      fillValues({
        name: productGetByIds?.name,
        price: productGetByIds?.price,
        description: productGetByIds?.description,
        offer: productGetByIds?.offer,
        itemCode: productGetByIds?.itemCode,
        images: productGetByIds?.images,
        category: productGetByIds?.category,
        subCategory: productGetByIds?.subCategory,
      });
    }
  }, [productGetByIds]);
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
    <main className="relative h-screen">
      <div className="py-10 px-5 lg:px-12">
        {/* <!-- back button  --> */}
        <div className="pb-8 flex items-center space-x-3">
          <div
            onClick={() => navigate(-1)}
            className="icon-back text-chatlook-sky text-3xl inline-block"
          ></div>
          <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
            {id ? "Edit Product" : "Add New Product"}
          </h4>
        </div>
        {/* <!-- edit area  --> */}
        <div className="max-w-4xl w-full mx-auto pt-7">

          <form onSubmit={handleSubmit} className="w-full pt-7">
            <div className="flex flex-wrap -mx-3">
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
                                  className="rounded-md h-80 w-full bg-chatlook-grayLight relative object-cover"
                                />
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
                        <div className="text-red-500 text-sm">
                          {errors.images && touched.name ? (
                            <div >{errors.images}</div>
                          ) : null}
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
                                  className="rounded-md h-24 w-full bg-chatlook-grayLight relative object-cover"
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
              <div className="w-full md:w-1/2 p-3">
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Item Name"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"
                  errors={errors}
                  touched={touched}

                />
                <div className="text-red-500 text-sm">
                  {errors.name && touched.name ? (
                    <div >{errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  placeholder="Item Price"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"
                // errors={errors}
                // touched={touched}

                />
                <div className="text-red-500 text-sm">
                  {errors.price && touched.price ? (
                    <div >{errors.price}</div>
                  ) : null}
                </div>
              </div>

              <div className="w-full md:w-1/2 p-3">
                <input
                  type="text"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  placeholder="Item Category"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"


                />
                <div className="text-red-500 text-sm">
                  {errors.category && touched.category ? (
                    <div >{errors.category}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <input
                  type="text"
                  name="subCategory"
                  value={values.subCategory}
                  onChange={handleChange}
                  placeholder="subCategory"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"
                // errors={errors}
                // touched={touched}

                />
                <div className="text-red-500 text-sm">
                  {errors.subCategory && touched.subCategory ? (
                    <div >{errors.subCategory}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <input
                  type="string"
                  name="offer"
                  value={values.offer}
                  onChange={handleChange}
                  placeholder="Item offer (%)"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"


                />
                <div className="text-red-500 text-sm">
                  {errors.offer && touched.offer ? (
                    <div >{errors.offer}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <input
                  type="text"
                  name="itemCode"
                  value={values.itemCode}
                  onChange={handleChange}
                  placeholder="Item Code"
                  className="w-full bg-chatlook-grayLight px-4 py-3.5 rounded-md text-chatlook-dark font-medium"


                />
                <div className="text-red-500 text-sm">
                  {errors.itemCode && touched.itemCode ? (
                    <div >{errors.itemCode}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-full p-3">
                <textarea
                  name="description"
                  id=""
                  rows="3"
                  value={values.description}
                  onChange={handleChange}
                  className="w-full bg-chatlook-grayLight px-4 py-3 rounded-md resize-none focus-visible:outline-none"
                  placeholder="Item Description"
                // errors={errors}
                // touched={touched}

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
                {id ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
