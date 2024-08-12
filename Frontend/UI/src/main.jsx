import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./componnects/Register.jsx";
import Album from "./componnects/Album.jsx";
import Login from "./componnects/Login.jsx";
import Profile from "./componnects/Profile.jsx";
import Comapany from "./componnects/Company.jsx";
import RegisterCompany from "./componnects/RegisterCompany.jsx";
import Post from "./componnects/Post.jsx";
import JobPage from "./componnects/JobPage.jsx";
import CompanyPage from "./componnects/CompanyPage.jsx";
import AppliedJob from "./componnects/Appliedjob.jsx";
import Postedjobs from "./componnects/Postedjobs.jsx";
import Getapplicants from "./componnects/Getapplicants.jsx";
import Jobprofile from "./componnects/Jobprofile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "", element: <Album></Album> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <Profile /> },
      { path: "company", element: <Comapany /> },
      { path: "postjob", element: <Post /> },
      { path: "jobpage", element: <JobPage /> },
      { path: "appliedjobs", element: <AppliedJob /> },
      { path: "companypage", element: <CompanyPage /> },
      { path: "registerCompany", element: <RegisterCompany /> },
      { path: "postedjobs", element: <Postedjobs /> },
      { path: "/getapplicants", element: <Getapplicants /> },
      { path: "/jobprofile", element: <Jobprofile /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
