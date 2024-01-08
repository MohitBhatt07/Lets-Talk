import React from "react";
import { useEffect } from "react";

import { useState } from "react";
import { loginUser } from "../apis/auth";
import { Link, useNavigate } from "react-router-dom";
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs";
import { toast } from "react-toastify";
import { validUser } from "../apis/auth";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const defaultData = {
  email: "",
  password: "",
};
function Login() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const pageRoute = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.includes("@") && formData.password.length > 6) {
      setIsLoading(true);
      const { data } = await loginUser(formData);
      if (data?.token) {
        localStorage.setItem("userToken", data.token);
        toast.success("Succesfully Login!");
        setIsLoading(false);
        pageRoute("/chats");
      } else {
        setIsLoading(false);
        toast.error("Invalid Credentials!");
        setFormData({ ...formData, password: "" });
      }
    } else {
      setIsLoading(false);
      toast.warning("Provide valid Credentials!");
      setFormData(defaultData);
    }
  };
  useEffect(() => {
    const isValid = async () => {
      const data = await validUser();
      if (data?.user) {
        window.location.href = "/chats";
      }
    };
    isValid();
  }, []);
  return (
    <>
      <div className="bg-[#121418] w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="bg-gray-200 w-[90%] md:w-1/2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md p-10 bg-opacity-10 border border-gray-100  relative">
          <div className="">
            <h3 className=" text-[25px] font-bold tracking-wider text-[#fff]">
              Login
            </h3>
            <p className="text-[#fff] text-[12px] tracking-wider font-medium">
              No Account ?{" "}
              <Link
                className="text-[rgba(0,195,154,1)] underline"
                to="/register"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* <form className="w-full max-w-md mx-auto" onSubmit={formSubmit}>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <EmailOutlinedIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
              </span>

              <input
                type="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
                name="email"
                onChange={handleOnChange}
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <HttpsOutlinedIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
              </span>

              <input
                type={showPass ? "text" : "password"}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                onChange={handleOnChange}
                name="password"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </div>
          </form> */}

          <form
            className="flex flex-col gap-y-3 mt-[12%]"
            onSubmit={formSubmit}
          >
            <div>
              <input
                className="w-[100%] sm:w-[80%] bg-[#222222] h-[50px] pl-3 text-[#ffff]"
                onChange={handleOnChange}
                name="email"
                type="text"
                placeholder="Email"
                value={formData.email}
                required
              />
            </div>
            <div className="relative">
              <input
                className="w-[100%] sm:w-[80%] bg-[#222222] h-[50px] pl-3 text-[#ffff]"
                onChange={handleOnChange}
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                required
              />
              {!showPass ? (
                <button type="button">
                  <BsEmojiLaughing
                    onClick={() => setShowPass(!showPass)}
                    className="text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]"
                  />
                </button>
              ) : (
                <button type="button">
                  {" "}
                  <BsEmojiExpressionless
                    onClick={() => setShowPass(!showPass)}
                    className="text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]"
                  />
                </button>
              )}
            </div>

            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)",
              }}
              className="w-[100%]  sm:w-[80%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative"
              type="submit"
            >
              <div
                style={{ display: isLoading ? "" : "none" }}
                className="absolute -top-[53px] left-[27%] sm:-top-[53px] sm:left-[56px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
                  <path
                    fill="none"
                    stroke="#FF156D"
                    stroke-width="15"
                    stroke-linecap="round"
                    stroke-dasharray="300 385"
                    stroke-dashoffset="0"
                    d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      calcMode="spline"
                      dur="2"
                      values="685;-685"
                      keySplines="0 0 1 1"
                      repeatCount="indefinite"
                    ></animate>
                  </path>
                </svg>
                {/* <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "200px", height: "160px" }}
                  loop
                  autoplay
                ></lottie-player> */}
              </div>
              <p
                style={{ display: isLoading ? "none" : "block" }}
                className="test-[#fff]"
              >
                Login
              </p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
