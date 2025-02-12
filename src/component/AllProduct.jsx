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