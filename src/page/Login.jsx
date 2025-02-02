import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authimg from "../assets/authimg.png";
import loginimage from "../assets/loginimage.gif";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please enter required fields");
      return;
    }

    try {
      const loginResponse = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok)
        throw new Error(loginData.message || "Login failed");

      toast.success(loginData.message);

      // Save accessToken to local storage
      if (loginData.accessToken) {
        localStorage.setItem("accessToken", loginData.accessToken);
        const userResponse = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/user/load-user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${loginData.accessToken}`,
            },
          }
        );

        const userData = await userResponse.json();

        if (!userResponse.ok)
          throw new Error(userData.message || "Failed to load user data");

        dispatch(loginRedux({ ...loginData, user: userData }));

        // Redirect and refresh the page based on user role
        const redirectUrl =
          userData.user.email === process.env.REACT_APP_ADMIN_EMAIL
            ? "/manage/dashboard"
            : "/";
        window.location.href = redirectUrl; // This will cause the page to refresh
      } else {
        toast.error(
          loginData.alert || "Authentication failed, please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className=" bg-white grid grid-cols-12 gap-6 py-10 px-3 md:px-4 ">
      <div className="col-span-6 w-full flex justify-center items-center">
        <img src={authimg} className="w-[600px]" alt="authimg" />
      </div>

      <div className="w-full max-w-sm  m-auto flex border rounded-lg flex-col col-span-6 p-6">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginimage} className="w-full" alt="Login" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 mb-2 w-full px-2 py-2 rounded focus-within:outline-blue-300 border"
              value={data.email}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="flex px-2 py-2 rounded mt-1 mb-2 border focus-within:outline-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full outline-none"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center">
          <p className="text-left text-sm my-2">
            Dont have an account?{" "}
            <Link to={"/signup"} className="text-red-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
