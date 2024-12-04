import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
import Navbar from "./Navbar/Navbar";

function Home() {
  const { user } = useContext(AppContext);
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Home;
