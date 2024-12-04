import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
import { Bounce, toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Register } = useContext(AppContext);

  const HandleSibmit = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      toast.success("All fields are required!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    const res = await Register(fullname, email, password);
    console.log(res);
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      navigate("/verification");
    } else {
      toast.error(res.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  return (
    <div className="bg-blue-100 w-[100%] py-[10rem] flex flex-col justify-center items-center">
      <form
        action=""
        className="border w-[40%] max-[600px]:w-[100%] p-5 bg-white shadow-md rounded-lg"
        onSubmit={HandleSibmit}
      >
        <h1 className="text-2xl text-gray-700 cursor-pointer font-medium capitalize text-center mb-3">
          Registeration
        </h1>
        <input
          id="fullname"
          name="fullname"
          type="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          autoComplete="name"
          placeholder="Enter Fullname..."
          className="block w-full rounded-md bg-white px-3 py-[10px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="Enter Email..."
          className="block w-full rounded-md bg-white px-3 py-[10px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 my-2"
        />
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="password"
          placeholder="Enter Password"
          className="block w-full rounded-md bg-white px-3 py-[10px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <div className="already-account">
          <p class="text-center text-gray-500 mt-4">
            Allready have an account?{" "}
            <span
              class="cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              login
            </span>
          </p>
        </div>
        <button className="btn text-gray-100 bg-blue-600 py-[8px] text-center w-[100%] mt-4 rounded-lg hover:bg-blue-800">
          Register now
        </button>
      </form>
    </div>
  );
}

export default Register;
