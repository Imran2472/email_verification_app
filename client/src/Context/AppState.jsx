import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
const AppState = (props) => {
  const [count, setCount] = useState(0);
  const URI = "http://localhost:4000/v1/api";
  const [verify, setVerify] = useState(null);
  const [Authorization, setAuthorization] = useState(false);
  const [user, setUser] = useState([]);
  const [registerUser, setRegisterUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthorization(true);
      profile();
    } else {
      setAuthorization(false);
    }
  }, [localStorage.getItem("token")]);

  const Register = async (fullname, email, password) => {
    try {
      const Response = await axios.post(
        `${URI}/user/register`,
        {
          fullname,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setRegisterUser(Response?.data?.newUser);
      return Response?.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const Verification = async (verificationcode) => {
    try {
      const Response = await axios.post(
        `${URI}/user/verify`,
        {
          verificationcode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return Response?.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const Login = async (email, password) => {
    try {
      const Response = await axios.post(
        `${URI}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(Response);
      localStorage.setItem("token", Response?.data?.token);
      setAuthorization(true);
      setVerify(Response?.data?.user?.verified);
      return Response?.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const profile = async () => {
    try {
      const Response = await axios.get(`${URI}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      setUser(Response?.data);
      return Response?.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setAuthorization(false);
    setUser([]);

    toast.success("Logout Successfully !", {
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
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };
  return (
    <AppContext.Provider
      value={{
        count,
        Register,
        Verification,
        Login,
        user,
        Logout,
        Authorization,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
