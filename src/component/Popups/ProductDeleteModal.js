import React from "react";
import { useDispatch } from "react-redux";
import { productDeleteSingle } from "../../redux/Slice/productSlice";
import { useNavigate } from "react-router-dom";


const ProductDeleteModal = ({ setIsProductDeletePopUpOpen, singleProductDetail }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { productListApi } = useContext(Context);
  // const { id } = useParams();

  // console.log(id, "ididididid");
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const DeleteProduct = async () => {
  //   const payload = { pid: id };
  //   try {
  //     const response = await dispatch(productDeleteSingle(payload)).unwrap();
  //     if (response) {
  //       productListApi();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleDelete = async () => {
    const payload = {
      pid: singleProductDetail?._id
    }
    const response = await dispatch(productDeleteSingle(payload))

    if (response?.payload?.data?.IsSuccess) {
      navigate("/product")
      setIsProductDeletePopUpOpen(false)
    }
  }

  return (
    <div
      id="deletePop"
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
              <button
                className="icon-close flex justify-end w-full"
                onClick={() => setIsProductDeletePopUpOpen(false)}
              ></button>
              <span className="icon-delete text-5xl inline-block pt-3"></span>
              <h2 className="capitalize pt-5">delete product</h2>
              <p className="chat text-chatlook-gray font-normal pt-4">
                Are you sure you want to delete this item?
              </p>
              <div className="space-x-3 py-5">
                <button
                  className="inline-block border border-chatlook-gray text-chatlook-gray uppercase rounded-md px-9 py-2.5 text-lg font-normal"
                  onClick={() => setIsProductDeletePopUpOpen(false)}
                >
                  Cancle
                </button>
                <button
                  className="inline-block bg-[#FC5858] text-white uppercase rounded-md px-12 py-2.5 text-lg font-normal"
                  onClick={handleDelete}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDeleteModal

