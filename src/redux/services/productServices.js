import {
  CREATENEWPRODUCT,
  DELETESINGLEPRODUCT,
  FRIENDSPRODUCTLIST,
  GETPRODUCTBYID,
  PRODUCTLIST,
  UPDATEPRODUCT,
  UPLOADPRODUCTSIMAGE,
} from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const uploadProductsImage = (payload) => {
  return apiInstance.post(UPLOADPRODUCTSIMAGE, payload, {
    headers: authHeader(),
  });
};
export const createNewProduct = (payload) => {
  return apiInstance.post(CREATENEWPRODUCT, payload, { headers: authHeader() });
};
export const getProductById = (id) => {
  return apiInstance.get(GETPRODUCTBYID, { params: id, headers: authHeader() });
};
export const productList = (payload) => {
  return apiInstance.post(PRODUCTLIST, payload, { headers: authHeader() });
};
export const friendsProductList = (payload) => {
  return apiInstance.post(FRIENDSPRODUCTLIST, payload, {
    headers: authHeader(),
  });
};
export const deleteSingleProduct = (payload) => {
  return apiInstance.post(DELETESINGLEPRODUCT, payload, {
    headers: authHeader(),
  });
};
export const updateProduct = (payload) => {
  return apiInstance.post(UPDATEPRODUCT, payload, { headers: authHeader() });
};
