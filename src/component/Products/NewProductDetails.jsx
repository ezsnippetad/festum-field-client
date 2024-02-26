import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  productGetById,
  useProductGetByIds,
} from "../../redux/Slice/productSlice";
import { useDispatch } from "react-redux";
import ProductDeleteModal from "../Popups/ProductDeleteModal";
import Modal from "../../Common/Modals/Modal";
import SimpleImageSlider from "react-simple-image-slider";
import { useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";

const NewProductDetails = () => {
  const [isProductDeletePopUpOpen, setIsProductDeletePopUpOpen] =
    useState(false);
  const productGetByIds = useProductGetByIds();

  const imagesArrayWithUrl = productGetByIds?.images?.map((items) => {
    return `https://festumfield.s3.ap-south-1.amazonaws.com/${items}`
  })


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [singleProductDetail, setSingleProductDetail] = useState({})
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

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
      <div className="main-content">
        <header className="z-50">
          <div className="flex justify-between items-center w-full">
            <h3 className="flex item-center">
              <a
                className="icon-close inline-block text-chatlook-gray text-base lg:text-xl mr-2 lg:mr-4"
                onClick={() => navigate("/product")}
              ></a>
              Product Details
            </h3>
            <div className="lg:space-x-4">
              <button
                className="w-24 lg:w-[138px] inline-block bg-[#FC5858] text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium"
                onClick={() => { setIsProductDeletePopUpOpen(true); setSingleProductDetail(productGetByIds) }}
              >
                delete
              </button>
              <button
                className="w-24 lg:w-[138px] inline-block bg-chatlook-sky text-white uppercase rounded-md py-2.5 text-sm lg:text-lg font-medium"
                onClick={() => navigate("/product/addnewproduct/" + true)}
              >
                Edit
              </button>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-[615px] w-full mx-auto relative pt-5 mt-5 px-5">
            {/* <div className="w-full h-[350px] rounded-md overflow-hidden"> */}

            {productGetByIds?.images?.length && (
              <SimpleImageSlider

                showNavs={true}
                width={585}
                height={349}
                images={imagesArrayWithUrl}
                showBullets={true}
                autoPlay={true}
                loop={true}
              />
            )}
            {/* {isViewerOpen && (
              <ImageViewer
                src={`https://festumfield.s3.ap-south-1.amazonaws.com/${productGetByIds?.images?.length && productGetByIds.images}`}
                currentIndex={currentImage}
                onClose={closeImageViewer}
                disableScroll={false}
                backgroundStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                }}
                closeOnClickOutside={true}
              />
            )} */}

            {/* </div> */}
            <p className="text-chatlook-dark font-bold pt-5 pb-3 text-xl">
              {productGetByIds?.name}
            </p>
            <div className="w-full flex justify-between items-center">
              <p className="chat text-chatlook-dark font-normal inline-block">
                Price:
                <span className="text-chatlook-sky font-normal">
                  ${productGetByIds?.price}
                </span>
              </p>
              {productGetByIds?.offer ? (
                <span className="text-sm bg-[#FC5858] text-white rounded-md inline-block px-3 py-1.5">
                  {productGetByIds?.offer}% off
                </span>
              ) : null}
            </div>
            <h4 className="text-chatlook-gray font-normal leading-6 w-full pt-6">
              {productGetByIds?.description}
            </h4>
            <h4 className="font-bold pt-5">
              Item Code:
              <span className="text-chatlook-gray pl-1">
                {productGetByIds?.itemCode}
              </span>
            </h4>
          </div>
        </main>
      </div>
      <Modal isOpen={isProductDeletePopUpOpen}>
        <ProductDeleteModal
          // handleClose={setIsProductDeletePopUpOpen}
          setIsProductDeletePopUpOpen={setIsProductDeletePopUpOpen}
          singleProductDetail={singleProductDetail}
        />
      </Modal>
    </>
  );
};

export default NewProductDetails;
