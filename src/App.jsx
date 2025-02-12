import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { setDataProduct } from "./redux/productSlice";
import { setDataCategory } from "./redux/categorySlice"; // Adjust import as needed

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products
    (async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/product/getallproducts`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    // Fetch categories
    (async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/category`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const resData = await res.json();
        dispatch(setDataCategory(resData));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Welcome to My App</h1>
      {/* Add your components here */}
    </div>
  );
}

export 'setDataCategory' (imported as 'setDataCategory') was not found in './redux/categorySlice' (possible exports: categorySlice, default)
