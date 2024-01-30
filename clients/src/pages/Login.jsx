import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { loginUser } from "../apis/auth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs";
import { toast } from "react-toastify";
import { validUser } from "../apis/auth";


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
      <div className="bg-[#4651e0] w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="bg-gray-100 w-[90%]  md:w-1/2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md p-10 bg-opacity-25 shadow-slate-400 shadow-lg  relative">
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


          <form
            className="flex flex-col gap-y-5 mt-[12%]"
            onSubmit={formSubmit}
          >
            <div>
              <input
                className="w-[100%] rounded-md sm:w-[90%] bg-[#fffdfd] h-[50px] pl-3 text-[#000]"
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
                className="w-[100%] sm:w-[90%] rounded-md bg-[#fffdfd] h-[50px] pl-3 text-[#000]"
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
                    className="text-[#000] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]"
                  />
                </button>
              ) : (
                <button type="button">
                  {" "}
                  <BsEmojiExpressionless
                    onClick={() => setShowPass(!showPass)}
                    className="text-[#000] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]"
                  />
                </button>
              )}
            </div>

            <button
              style={{
                background:
                  "linear-gradient(to left bottom, rgb(232, 121, 249), rgb(229, 229, 229), rgb(253, 224, 71))",
              }}
              className="w-[100%]  sm:w-[90%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative"
              type="submit"
            >
              <div
                style={{ display: isLoading ? "" : "none" }}
                className=" flex justify-center items-center"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
                Loading
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
