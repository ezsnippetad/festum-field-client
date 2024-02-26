import React, { useEffect } from "react";
import ProductImg from "../../assets/images/pro-1.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  productGetById,
  useProductGetByIds,
} from "../../redux/Slice/productSlice";
import { useDispatch } from "react-redux";
import HeaderDashboard from "../../Common/HeaderDashboard";

export default function NewSingleProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productGetByIds = useProductGetByIds();
  const { id } = useParams();


  const ProductGetById = async () => {
    try {
      let payload = {
        pid: id,
      };
      const response = await dispatch(productGetById(payload)).unwrap();

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ProductGetById();
  }, [id]);

  return (
    <>
      <HeaderDashboard />
      <main className="relative  ">
        <div className="relative h-[calc(100vh-164px)] ">
          <div className="w-full flex items-center relative py-3 px-5 lg:px-12">
            {/* <!-- profile-btn  --> */}
            <div className="flex items-center space-x-3 cursor-pointer">
              <span className="text-3xl w-14 h-14 flex items-center justify-center bg-chatlook-sky shadow rounded-full text-white mr-3">
                <i className="icon-notification"></i>
              </span>
              <div>
                <h4 className="mt-1 text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
                  New Products
                </h4>
              </div>
            </div>
            {/* <!-- SearchBar  --> */}
            {/* <label
              for="search"
              className="w-full max-w-[300px] py-3 px-3 flex items-center rounded-md border bg-chatlook-grayLight border-chatlook-grayLight ml-auto"
            >
              <i className="icon-search mr-2"></i>
              <input
                type="search"
                name="Search"
                id="Search"
                placeholder="Search"
                className="w-full outline-none"
              />
            </label> */}
          </div>
          {/* <!-- chat-area  --> */}
          {productGetByIds && (
            <div className="h-[calc(100vh-164px)] overflow-y-auto  ">
              <div className="py-3 px-5 lg:px-12 w-full">
                <div className="flex items-center justify-between w-full">

                </div>
                <div className="max-w-7xl mx-auto">
                  <a
                    className="icon-back mb-5 text-3xl inline-block"
                    onClick={() => navigate(-1)}
                  ></a>

                  {productGetByIds?.images?.length > 0 && (
                    <div className="w-full">
                      <a className="block p-3 bg-chatlook-grayLight rounded-md">
                        <div className="imgCard h-40 lg:h-48 2xl:h-60 rounded-md overflow-hidden">
                          <img
                            src={`https://festumfield.s3.ap-south-1.amazonaws.com/${productGetByIds.images[0]}`}
                            className="w-full h-full object-cover"
                            alt="product"
                          />
                        </div>
                      </a>
                    </div>
                  )}
                  <div className="w-full space-y-5 mt-5">
                    <div className="w-full flex items-center justify-between">
                      <div className="space-y-2">
                        <h5 className="capitalize text-3xl xl:text-5xl font-bold">
                          {productGetByIds.name}
                        </h5>
                        <span className="text-3xl xl:text-[32px] font-bold text-chatlook-sky block">
                          ${productGetByIds.price}
                        </span>
                      </div>
                      <button className="text-base xl:text-xl bg-[#FC5858] px-3 py-1 text-white rounded">
                        {productGetByIds.offer}% off
                      </button>
                    </div>
                    <h4 className="text-sm font-light leading-6 text-chatlook-gray">
                      {productGetByIds.description}
                    </h4>
                    <h4 className="text-base">
                      Item Code:{" "}
                      <span className="text-base text-chatlook-gray">
                        {productGetByIds.itemCode}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
