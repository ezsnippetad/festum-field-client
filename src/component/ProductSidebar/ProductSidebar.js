import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import addProductImg from "../../assets/images/add-product.png";
import ProductList from "../Products/ProductList";

function ProductSidebar() {
  const navigate = useNavigate();

  return (
    <div className="main flex items-start overflow-hidden">
      <aside className="">
        <div className="w-full flex items-center border-b h-20 px-5">
          <h3 className="flex items-center">
            <a
              className="icon-back text-chatlook-sky mr-3"
              onClick={() => navigate("/dashboard")}
            ></a>
            Add Products
          </h3>
        </div>
        <div className="w-full pt-5">
          <div className="">
            <div className="flex items-center border-b pb-5 px-5">
              <button
                onClick={() => navigate("product/addnewproduct/" + false)}
                className="w-14 h-14 rounded-lg bg-chatlook-grayLight inline-block"
              >
                <span className="icon-plus text-2xl flex items-center justify-center w-full h-full"></span>
              </button>
              <div className="ml-4">
                <h4 className="text-base text-chatlook-sky font-bold">
                  Add New Product
                </h4>
              </div>
            </div>
          </div>
          <ProductList />
        </div>
      </aside>
      <Outlet />
    </div>
  );
}

export default ProductSidebar;
