import React, { useEffect } from "react";
import ProductImg from "../../assets/images/pro-1.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../createContext";
import { listOfProduct, useProductslist } from "../../redux/Slice/productSlice";
import HeaderDashboard from "../../Common/HeaderDashboard";
import { businessProfileGet, profileGet } from "../../redux/Slice/profileSlice";
import { useDispatch } from "react-redux";

export default function NewProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { productListApi, setProductPagi, productPagi } = useContext(Context);
  const productslist = useProductslist();

  useEffect(() => {
    productListApi();
  }, [productPagi]);


  const getProductList = async () => {
    const payload = {
      "page": 1,
      "limit": 50,
      "search": "",
      "sortfield": "title",
      "sortoption": 1
    }

    await dispatch(listOfProduct(payload))

  }

  useEffect(() => {
    getProductList()
    dispatch(profileGet())
  }, [dispatch])


  return (
    <>
      <HeaderDashboard />
      <main className="relative">
        <div className="relative h-[calc(100vh-164px)] ">
          <div className="w-full flex items-center relative pt-3 px-5 lg:px-12">
            {/* // <!-- profile-btn  --> */}
            <div className="flex items-center space-x-3 cursor-pointer">
              <span className="text-3xl w-14 h-14 flex items-center justify-center bg-chatlook-sky shadow rounded-full text-white mr-3">
                <i className="icon-store"></i>
              </span>
              <div>
                <h4 className="mt-1 text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
                  Products
                </h4>
              </div>
            </div>
            {/* //   <!-- SearchBar  --> */}
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
                onChange={(e) => {
                  setProductPagi({
                    ...productPagi,
                    search: e.target.value,
                  });
                }}
              />
            </label> */}
          </div>
          {/* //   <!-- chat-area  --> */}
          <div className="overflow-y-auto w-full">
            <div className="py-3 px-5 lg:px-12 max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center -mx-3.5">
                {productslist?.docs?.length > 0 ?
                  productslist?.docs?.map((val) => {
                    return (
                      <div
                        className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 p-3.5"
                        onClick={() =>
                          navigate(`/dashboard/newsingleproduct/${val?.id}`)
                        }
                      >
                        <a className="block p-3 bg-chatlook-grayLight rounded-md overflow-hidden relative group ">
                          <div className="imgCard h-40 lg:h-48 2xl:h-60 rounded-md ">
                            <img
                              src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val?.images[0]}`}
                              className="w-full h-full object-cover"
                              alt="product"
                            />
                          </div>
                          <div className="w-full flex items-center mt-2">
                            <div className="pr-3 w-10/12">
                              <h2 className="text-xl font-bold text-chatlook-dark">
                                {val?.name}
                              </h2>
                              <span className="block  whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {val?.description}
                              </span>
                            </div>
                            <span className="text-lg xl:text-xl font-medium text-chatlook-sky ml-auto">
                              ${val?.price}
                            </span>
                          </div>
                          <span className="absolute inset-0 group-hover:bg-black/25 anim w-full h-full  ">
                          </span>

                          <div className="flex flex-col space-y-2.5 w-full h-full inset-0 items-center justify-center absolute group-hover:translate-x-0 translate-x-full anim">
                            <button className="w-[103px] h-10 bg-[#FFFFFF] rounded font-bold">Edit</button>
                            <button className="w-[103px] h-10 bg-[#FFFFFF] rounded text-red-500 font-bold">Delete</button>
                          </div>
                        </a>
                      </div>
                    );
                  }) : (<div className="w-full  flex items-center justify-center text-4xl my-10">No Product</div>)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
