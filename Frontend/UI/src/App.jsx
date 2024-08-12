import React from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./componnects/Navbar";
import ContextProvider from "./store/userDetails";

const App = () => {
  return (
    <>
      <ContextProvider>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </ContextProvider>
    </>
  );
};

export default App;
