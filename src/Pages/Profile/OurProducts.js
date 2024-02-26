import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import ProductPic from "../../assets/images/product.png";
import AddProductPic from "../../assets/images/add-product.png";
import { useNavigate } from "react-router-dom";
import { clearProductList, listOfProduct, productDeleteSingle, setNewProductList, setProductsList, useProductslist } from "../../redux/Slice/productSlice";
import { useDispatch } from "react-redux";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { businessProfileGet, profileGet, useBusinessProfileGets, useProfileGets, useBusinessLists } from "../../redux/Slice/profileSlice";
import { FileEdit, Trash2 } from 'lucide-react';
import Modal from "../../Common/Modals/Modal";
import ProductDeleteModal from "../../component/Popups/ProductDeleteModal";
import DeleteProductPopUpOpen from "../../component/Popups/DashboardPopup/DeleteProductPopUpOpen";
import InfiniteScroll from "../../component/Sidebar/InfiniteScroll";

export default function OurProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const getProfile = useProfileGets()
  const [deletePopupOpen, setDeletepopUpOpen] = useState(false);
  const [deleteProduct, setDeleteData] = useState([]);
    const [businessProfile, setBusinessProfile] = React.useState(null);
  const getBusinessProfile = useBusinessProfileGets()

    const businessLists = useBusinessLists();
  const productsList = useProductslist()
  const productRef = useRef()
  const [lastPage, setLastPage] = useState("")
  const [stateProductList, setStateProductList] = useState([])
  const [page, setPage] = useState(1);

  const getProductListData = async () => {

    const myProfile = await dispatch(profileGet())
    const getProfile = myProfile?.payload?.data?.Data
    if (getProfile?.is_business_profile_created) {
      await dispatch(businessProfileGet())
    }
  }
  const infiniteData = async (currentPage) => {
    const payload = {
      page: currentPage,
      limit: 50,
      search: "",
      sortfield: "title",
      business: "65cefcc5efdbffc294319b83",
      sortoption: 1
    };
    const response = await dispatch(listOfProduct(payload)).unwrap();
    if (response?.data?.Data && Array.isArray(response?.data?.Data?.docs)) {

      setStateProductList([...stateProductList, ...response?.data?.Data?.docs])
      if (response?.data?.Data?.docs?.length < 50) {
        setLastPage("LastPage")
      } else {
        setLastPage("")
      }
    }
  }
  useEffect(() => {
    dispatch(setNewProductList(stateProductList));
  }, [stateProductList])
    const handleBusinessChange = (event) => {
        console.log(event);
        let selectProfile = businessLists?.find((val) => val._id === event.target.value);
        console.log(selectProfile);
        setBusinessProfile(selectProfile);
    };
  const handleScroll = useCallback(() => {

    const outerElement = productRef.current;
    if (outerElement) {
      const { scrollTop, clientHeight, scrollHeight } = outerElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [productRef]);
  useEffect(() => {
    if (lastPage === "LastPage") {
      return
    }
    infiniteData(page);
    return () => {
      // dispatch(clearProductList())
    }
  }, [page]);

    useEffect(() => {
        if (businessLists) {
            setBusinessProfile(businessLists[0]);
        }
    }, []);
  useEffect(() => {
    getProductListData()
  }, [])

  const DeleteProduct = async (id) => {
    const payload = { pid: id };
    try {
      const response = await dispatch(productDeleteSingle(payload)).unwrap();
      if (response) {
        // productListApi();      
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = (id) => {
    DeleteProduct(id);
  };
  return (
    <>
      <main className="relative h-screen  overflow-y-auto" ref={productRef} onScroll={handleScroll}>
        <div className="pt-10 px-5 lg:px-12 overflow-y-auto" >
          {/* <!-- back button  --> */}
          <div className="pb-8 flex justify-between items-center" >
            <div className="flex items-center space-x-3">
              <div onClick={() => navigate("../dashboard/profile")} className="icon-back text-chatlook-sky text-3xl inline-block"></div>
              <h4 className="text-2xl xl:text-3xl text-chatlook-dark font-bold max-w-md overflow-hidden whitespace-nowrap overflow-ellipsis">
                Product
              </h4>
            </div>
            <div className="flex justify-end">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="bg-gray-50 border-2 border-gray-300">
              <Select value={businessProfile?._id} onChange={handleBusinessChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{color: "red", "&:before": {
                          borderColor: "red"
                      }
                  }}
              >
                  {businessLists.length > 0 && businessLists.map((busProfile, index) => (
                      <MenuItem key={index} value={busProfile._id}>{busProfile.name}</MenuItem>
                  ))}
              </Select>
              </FormControl>
              <button
                  className="flex items-center bg-chatlook-sky text-white uppercase rounded-md py-3 px-4 text-sm font-medium ml-auto"
                  onClick={() => navigate("/dashboard/profile/products/editproduct")}>
                <i className="icon-plus text-ml text-white"></i>
              </button>
            </div>
          </div>
          {/* <!-- edit area  --> */}
          <div className="max-w-6xl w-full mx-auto pt-7 " >
            <div className="flex flex-wrap -mx-3">
              {/*<div className="w-full p-3" >*/}
                {/*<div className="w-full min-h-[270px] relative rounded-lg overflow-hidden bg-chatlook-gray flex items-center">*/}
                  {/*{getBusinessProfile?.businessimage !== "" ? (*/}
                    {/*<img*/}
                      {/*src={`https://festumfield.s3.ap-south-1.amazonaws.com/${getBusinessProfile?.businessimage}`}*/}
                      {/*alt="add_product"*/}
                      {/*className="absolute inset-0 w-full h-full object-cover opacity-50"*/}
                    {/*/>*/}
                  {/*) : null}*/}
                  {/*<div className="relative max-w-lg mx-auto text-center">*/}
                    {/*<h2 className="text-2xl lg:text-4xl text-white mb-2">*/}
                      {/*{getBusinessProfile?.name}*/}
                    {/*</h2>*/}
                    {/*<span className="text-white text-sm">*/}
                      {/*{getBusinessProfile?.description}*/}
                    {/*</span>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
              {productsList?.length > 0 && (
                <>
                  {productsList?.map((val, index) => {
                    return (
                      <div className="w-full sm:w-1/2 lg:w-1/3 p-3">
                        <div className="w-full rounded-lg overflow-hidden bg-white drop-shadow-lg">
                          <div className="w-full h-36">
                            <img
                              src={`https://festumfield.s3.ap-south-1.amazonaws.com/${val.images[0]}`}
                              className="w-full h-full object-cover"
                              alt="product"
                            />
                          </div>
                          <div className="p-3"  >
                            <div className="flex items-center justify-between w-full">
                              <h4>{val.name}</h4>
                              <div className="flex items-center justify-center space-x-2">
                                <Trash2 className="cursor-pointer" color="#e32f2f" onClick={() => { setDeleteData(val); setDeletepopUpOpen(!deletePopupOpen) }} />
                                <FileEdit className="cursor-pointer" color="#5ac8d2" onClick={() => { navigate(`/dashboard/profile/ourproductslist/editproductlist/${val._id}`); }} />
                              </div>
                            </div>
                            <span className="block w-9/12 whitespace-nowrap overflow-hidden overflow-ellipsis mt-1">
                              {val?.description}
                            </span>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-chatlook-sky text-base">
                                ${val?.price}
                              </span>
                              {val?.offer && (<span className="text-[12px] text-white bg-[#FC5858] p-1 rounded">{val?.offer}% off</span>
                              )}
                            </div>
                            <div className="flex flex">
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* <InfiniteScroll fetchData={getProductListData} loading={productLoading} hasMore={productHasMore} /> */}
                </>
              )}
            </div>
          </div>
        </div>
        {/* <!-- button-b fix --> */}
      </main >
      <Modal isOpen={deletePopupOpen} >
        <DeleteProductPopUpOpen handleClose={setDeletepopUpOpen} deleteProduct={deleteProduct} setPage={setPage} />
      </Modal>
    </>
  );
}
