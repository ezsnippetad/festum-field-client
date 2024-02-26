import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listOfProduct,
  useProducts,
  useProductslist,
} from "../../redux/Slice/productSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Context } from "../../createContext";

const ProductList = () => {
  const dispatch = useDispatch();
  const productslist = useProductslist();
  const navigate = useNavigate();
  const products = useProducts();
  const { productListApi, productPagi, setProductPagi } = useContext(Context);

  useEffect(() => {
    productListApi();
  }, [products, productPagi]);
  return (
    <div className="h-[calc(100vh-173px)] overflow-scroll">
      <PerfectScrollbar
        onScrollY={(container) => {

          if (container.scrollTop === 0) {
            if (productslist?.totalPages !== productPagi?.page) {
              setProductPagi({ ...productPagi, limit: productPagi.limit + 10 });
            }
          }
        }}
      >
        {productslist?.docs?.map((val) => {

          return (
            <>
              <a className="flex border-b py-5 px-5" onClick={() => { navigate(`/product/productdetails/${val.id}`);}}>
                <img
                  src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val.images[0]}`}
                  alt=""
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h4>{val.name}</h4>
                  <span className="text-chatlook-gray leading-3 text-ellipsis font-normal pt-1.5">
                    {val.description}
                  </span>
                  <div className="flex  items-center space-x-2 pt-[2px]">
                    {val.offer ? (
                      <span className="bg-[#FC5858] text-white p-1 rounded-md">
                        {val.offer}% off
                      </span>
                    ) : null}
                    <h4 className="text-chatlook-sky font-normal">{val.price}</h4>
                  </div>
                </div>
              </a>
            </>
          )


        }
        )}
      </PerfectScrollbar>
    </div>
  );
};

export default ProductList;
