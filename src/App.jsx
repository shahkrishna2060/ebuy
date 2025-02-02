// src/App.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { setDataProduct } from "./redux/productSlice";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product/getallproducts`
      );
      const resData = await res.json();
      dispatch(setDataProduct(resData));
    })();
  }, [dispatch]);

  useEffect(() => {
    // Fetch categories
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/category`
      );
      const resData = await res.json();
      dispatch(setDataCategory(resData));
    })();
  }, [dispatch]);
}
