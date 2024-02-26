import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getProfile } from "../services/profileServices"
import {
  createNewProduct,
  deleteSingleProduct,
  getProductById,
  productList,
  updateProduct,
  uploadProductsImage,
} from "../services/productServices";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { friendsProductList } from "./../services/productServices";

const initialState = {
  products: {
    page: 1,
    limit: 10,
    search: "",
    sortfield: "title",
    sortoption: 1,
  },
  productGetByIds: {},
  productslist: [],
  friendsProductsList: {},
  friendProduct: {}
};

export const productsImageUpload = createAsyncThunk(
  "user/uploadproductsimage",
  async (payload) => {
    return await uploadProductsImage(payload);
  },
);
export const newProductCreate = createAsyncThunk(
  "user/createnewproduct",
  async (payload) => {
    return await createNewProduct(payload);
  },
);
export const productGetById = createAsyncThunk(
  "user/getproductbyid",
  async (id) => {
    return await getProductById(id);
  },
);
export const listOfProduct = createAsyncThunk(
  "user/productlist",
  async (payload) => {
    return await productList(payload);
  },
);

export const friendsListOfProduct = createAsyncThunk(
  "user/friendsproductlist",
  async (payload) => {
    return await friendsProductList(payload);
  },
);

export const productDeleteSingle = createAsyncThunk(
  "user/deleteproduct",
  async (payload) => {
    return await deleteSingleProduct(payload);
  },
);
export const productUpdate = createAsyncThunk(
  "user/updateproduct",
  async (payload) => {
    return await updateProduct(payload);
  },
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    getProduct: (state, action) => {

      const product = {
        page: action?.payload?.page
          ? action?.payload?.page
          : state?.products?.page,
        limit: action?.payload?.limit
          ? action?.payload?.limit
          : state?.products?.limit,
        search: action?.payload?.search
          ? action?.payload?.search
          : state?.products?.search,
        sortfield: action?.payload?.sortfield
          ? action?.payload?.sortfield
          : state?.products?.sortfield,
        sortoption: action?.payload?.sortoption
          ? action?.payload?.sortoption
          : state?.products?.sortoption,
      };
      state.products = { ...product };
    },
    setNewProductList: (state, action) => {
      state.productslist = action.payload
    },
  setMyFriendsProduct: (state, action) => {
      state.friendProduct = action.payload
    },
    deleteProductg: (state, action) => {
      state.productslist = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(productGetById.fulfilled, (state, action) => {
      state.productGetByIds = action?.payload?.data?.Data;
    });
    builder.addCase(listOfProduct.fulfilled, (state, action) => {
      state.productslist = action?.payload?.data?.Data;
    });
    builder.addCase(friendsListOfProduct.fulfilled, (state, action) => {
      state.friendsProductsList = action?.payload?.data?.Data;
    });
  },
});

export default productSlice.reducer;
export const { getProduct, setNewProductList, deleteProductg,setMyFriendsProduct } = productSlice.actions;
export const selectProductGetByIds = (state) => state.product.productGetByIds;

export const useProductGetByIds = () => {
  const productGetByIds = useSelector(selectProductGetByIds);
  return useMemo(() => productGetByIds, [productGetByIds]);
};

export const selectProductslist = (state) => state.product.productslist;

export const useProductslist = () => {
  const productslist = useSelector(selectProductslist);
  return useMemo(() => productslist, [productslist]);
};

export const selectFriendsProductslist = (state) =>
  state.product.friendsProductsList;

export const useFriendsProductslist = () => {
  const friendsProductslist = useSelector(selectFriendsProductslist);
  return useMemo(() => friendsProductslist, [friendsProductslist]);
};

export const selectProducts = (state) => state.product.products;

export const useProducts = () => {
  const products = useSelector(selectProducts);
  return useMemo(() => products, [products]);
};
