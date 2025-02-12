import AuthProvider from "./component/AuthProvider";

import productSliceReducer from "./productSlice";
//stores value in datafield
export const store = configureStore({
  reducer: {
    product: productSliceReducer,
  },
});
