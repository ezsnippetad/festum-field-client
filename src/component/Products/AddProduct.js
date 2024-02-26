import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addProductImg from "../../assets/images/add-product.png";
import { useBusinessProfileGets, myBusinessProfile, businessProfileGet } from "../../redux/Slice/profileSlice";
import { Context } from "../../createContext";
import { useDispatch } from "react-redux";
import { listOfProduct, useProductslist } from "../../redux/Slice/productSlice";

export default function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const myBusinessProfile = useBusinessProfileGets()
  const myProductList = useProductslist()


  const productList = async () => {
    const payload = {
      page: 1,
      limit: 50,
      search: "",
      sortfield: "title",
      sortoption: 1
    }
    const response = await dispatch(listOfProduct(payload))

  }

  const getBusinessProfile = async () => {
    const response = await dispatch(businessProfileGet())
  }

  useEffect(() => {
    productList()
    getBusinessProfile()
  }, [])


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
      <main className="relative h-full">
        <div className="p-[30px]">
          <div className="max-w-[800px] mx-auto min-h-[300px] relative rounded-lg overflow-hidden flex">
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
            {/* <a className="z-20 absolute right-3 md:right-5 bottom-3 md:bottom-5 inline-block w-9 md:w-12 h-9 md:h-12 bg-chatlook-sky rounded-full ">
              <span className="icon-pencil text-white flex items-center justify-center text-lg md:text-2xl w-full h-full"></span>
            </a> */}
          </div>
          {!myProductList?.docs?.length > 0 && (

            <div className="text-center pt-12">
              <h2 className="pb-[10px]">Add New Products</h2>
              <p className="text-base leading-[22px]">
                Lorem Ipsum is simply dummy text of the <br /> printing and
                typesetting industry.
              </p>
            </div>)
          }
        </div>

      </main>
    </div>
  );
}
