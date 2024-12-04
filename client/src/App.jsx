import { Route, Routes } from "react-router-dom";
import Home from "./Components/home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Verification from "./Components/Verification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import AppContext from "./Context/AppContext";

function App() {
  const { Authorization, user, registerUser } = useContext(AppContext);
  console.log(registerUser);
  return (
    <div>
      <Routes>
        <Route path="/" element={Authorization ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
