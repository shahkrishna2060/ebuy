import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  //creating an array
  categoryList: [],
};
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setDataCategory: (state, action) => {
      console.log({action})
      state.categoryList = [...action.payload.categories];
    },
  },
});

const productCount = productData?.length || 0;
const categoryCount = categoryData?.length || 0;

export const { setDataCategory } = categorySlice.actions;

  type: "category/setData",
  payload: data,
});

