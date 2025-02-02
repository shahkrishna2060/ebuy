import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";

const Cart = () => {
  const dispatch = useDispatch();

  const productCartItem = useSelector((state) => state.product.cartItem);

  const subtotals = productCartItem.map((item) => item.price * item.qty);

  const totalPrice = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);

  const formattedTotalPrice = totalPrice.toFixed(2);

  const handleCheckout = async () => {
    const products = productCartItem.map((item) => ({
      product: item._id,
      quantity: item.qty,
    }));

    const orderData = {
      products,
      paymentType: "khalti",
      returnUrl: "http://localhost:3000/manage/orders/",
      websiteUrl: "https://github.com",
    };

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Redirect to the payment URL received in the response
      window.location.href = data.payment_url;
    } catch (error) {
      console.error("Error during fetch: ", error);
      // Here you could navigate to an error page or display an error message
    }
  };

  return (
    <div className="p-2 md:p-4 min-h-[351px] h-full bg-white">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">
        Your Cart Items
      </h2>

      {productCartItem.length > 0 ? (
        <div className="my-10">
          {/* displaying cart items */}
          <div className="w-full">
            <div className="grid grid-cols-12 w-full py-6 border-b-2">
              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">Product</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">Name</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">Price</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">Quantity</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">SubTotal</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w/full text-center ">Remove</p>
              </div>
            </div>
            {productCartItem.map((el) => {
              return (
                <div>
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                </div>
              );
            })}

            <div className="flex justify-end mt-4 p-4 border-t-2">
              <h2 className="text-lg md:text-xl font-semibold text-slate-600">
                Total: Rs {formattedTotalPrice}
              </h2>
            </div>

            <div className="flex item-center justify-center">
              <button
                className="bg-amber-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <p className="text-lg text-gray-600">No items added</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
