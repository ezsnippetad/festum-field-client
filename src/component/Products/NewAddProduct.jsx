import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addProductImg from "../../assets/images/add-product.png";
import {
  useBusinessProfileGets,
  myBusinessProfile,
  businessProfileGet,
} from "../../redux/Slice/profileSlice";
import { Context } from "../../createContext";
import { useDispatch } from "react-redux";
import { listOfProduct, useProductslist } from "../../redux/Slice/productSlice";
import noProduct from "../../../src/assets/images/productbg.svg";

export default function NewAddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myBusinessProfile = useBusinessProfileGets();
  const myProductList = useProductslist();

  const productList = async () => {
    const payload = {
      page: 1,
      limit: 50,
      search: "",
      sortfield: "title",
      sortoption: 1,
    };
    const response = await dispatch(listOfProduct(payload));
  };

  const getBusinessProfile = async () => {
    const response = await dispatch(businessProfileGet());
  };

  useEffect(() => {
    productList();
    getBusinessProfile();
  }, []);

  return (
    <div id="main-content" className="main-content h-full overflow-auto">
      <header className="z-50">
        <div className="flex justify-end items-center w-full">
          <button
            className="inline-block bg-white text-chatlook-sky border border-chatlook-sky uppercase rounded-md px-3.5 py-2.5 text-sm lg:text-lg font-medium"
            onClick={() => navigate("/dashboard")}
          >
            Skip for Now
          </button>
        </div>
      </header>
      <main className="relative">
        <div className="w-full flex items-center justify-center">
          <img src={noProduct} alt="" />
          {/* <div className="max-w-[800px] mx-auto min-h-[300px] relative rounded-lg overflow-hidden flex">
            {
              myBusinessProfile?.businessimage == "" ? (
                <div
                  alt="product"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : <img
                src={`https://festumfield.s3.ap-south-1.amazonaws.com/${myBusinessProfile?.businessimage}`}
                alt="product"
                className="absolute inset-0 w-full h-full object-cover"
              />
            }


            <div className="w-full py-12 px-5 bg-[rgba(36,36,39,0.6)] text-center z-10 relative flex flex-col justify-center">
              <h5 className="text-xl font-bold text-white tracking-wider mb-1">
                {myBusinessProfile?.name}
              </h5>
              <p className="text-white text-sm leading-5 max-w-[50%] mx-auto">
                {myBusinessProfile?.description}
              </p>
            </div>
          </div>
          {!myProductList?.docs?.length > 0 && (

            <div className="text-center pt-12">
              <h2 className="pb-[10px]">Add New Products</h2>
              <p className="text-base leading-[22px]">
                Lorem Ipsum is simply dummy text of the <br /> printing and
                typesetting industry.
              </p>
            </div>)
          } */}
        </div>
        <div className="w-full  flex flex-wrap items-center justify-center ">
          <div className="p-4 w-[310px]  group">
            <a className="block p-3 bg-chatlook-grayLight relative rounded-md duration-200 group-hover:bg-black/30 overflow-hidden">
              <div className="imgCard h-40 lg:h-48 2xl:h-60 rounded-md overflow-hidden">
                <img
                  // src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val?.images[0]}`}
                  className="w-full h-full object-cover"
                  alt="product"
                />
              </div>
              <div className="absolute  h-full w-full flex flex-col items-center justify-center inset-0 space-y-2.5 duration-200 group-hover:scale-100  scale-0">
                <button className="w-[103px] h-10 rounded bg-[#FFFFFF] text-black font-bold hover:w-[106px]  duration- duration-150">
                  Preview
                </button>
                <button className="w-[103px] h-10 rounded bg-[#FFFFFF] text-black hover:w-[106px]  duration-200 font-bold">
                  Edit
                </button>
                <button className="w-[103px] h-10 rounded text-red-400 bg-[#FFFFFF] hover:w-[106px] duration-200  font-bold">
                  Delete
                </button>
              </div>
              <div className="w-full flex items-center mt-2">
                <div className="pr-3 w-10/12">
                  <h2 className="text-xl font-bold text-chatlook-dark group-hover:text-chatlook-dark">
                    {/* {val?.name} */}
                    asd
                  </h2>
                  <span className="block  whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {/* {val?.description} */}
                    asd
                  </span>
                </div>
                <span className="text-lg xl:text-xl font-medium text-chatlook-sky ml-auto">
                  {/* ${val?.price} */}
                  asd
                </span>
              </div>
            </a>
          </div>
          <div className="p-4 w-[310px]">
            <a className="block p-3 bg-chatlook-grayLight rounded-md">
              <div className="imgCard h-40 lg:h-48 2xl:h-60 rounded-md overflow-hidden">
                <img
                  // src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val?.images[0]}`}
                  className="w-full h-full object-cover"
                  alt="product"
                />
              </div>
              <div className="w-full flex items-center mt-2">
                <div className="pr-3 w-10/12">
                  <h2 className="text-xl font-bold text-chatlook-dark">
                    {/* {val?.name} */}
                    asd
                  </h2>
                  <span className="block  whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {/* {val?.description} */}
                    asd
                  </span>
                </div>
                <span className="text-lg xl:text-xl font-medium text-chatlook-sky ml-auto">
                  {/* ${val?.price} */}
                  asd
                </span>
              </div>
            </a>
          </div>
          <div className="p-4 w-[310px]">
            <a className="block p-3 bg-chatlook-grayLight rounded-md">
              <div className="imgCard h-40 lg:h-48 2xl:h-60 rounded-md overflow-hidden">
                <img
                  // src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val?.images[0]}`}
                  className="w-full h-full object-cover"
                  alt="product"
                />
              </div>
              <div className="w-full flex items-center mt-2">
                <div className="pr-3 w-10/12">
                  <h2 className="text-xl font-bold text-chatlook-dark">
                    {/* {val?.name} */}
                    asd
                  </h2>
                  <span className="block  whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {/* {val?.description} */}
                    asd
                  </span>
                </div>
                <span className="text-lg xl:text-xl font-medium text-chatlook-sky ml-auto">
                  {/* ${val?.price} */}
                  asd
                </span>
              </div>
            </a>
          </div>
          <div className="p-4 w-[310px]">
            <a className="block p-3 bg-chatlook-grayLight rounded-md">
              <div className="imgCard h-40 lg:h-48 2xl:h-60 rounded-md overflow-hidden">
                <img
                  // src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val?.images[0]}`}
                  className="w-full h-full object-cover"
                  alt="product"
                />
              </div>
              <div className="w-full flex items-center mt-2">
                <div className="pr-3 w-10/12">
                  <h2 className="text-xl font-bold text-chatlook-dark">
                    {/* {val?.name} */}
                    asd
                  </h2>
                  <span className="block  whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {/* {val?.description} */}
                    asd
                  </span>
                </div>
                <span className="text-lg xl:text-xl font-medium text-chatlook-sky ml-auto">
                  {/* ${val?.price} */}
                  asd
                </span>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
