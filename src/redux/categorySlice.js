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

export const { setDataCategory } = categorySlice.actions;
export default categorySlice.reducer;
