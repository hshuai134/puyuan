import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import FirstGloor from "../pages/FirstGloor";
import Home from "../pages/Home";
import Home2 from "../pages/Home2";
import Home3 from "../pages/Home3";
import Home4 from "../pages/Home4";
import Home5 from "../pages/Home5";

//全局路由
export const Router = () => {
  return useRoutes([
    { path: "/", element: <FirstGloor /> },
    { path: "/Home", element: <Home /> },
    { path: "/Home2", element: <Home2 /> },
    { path: "/Home3", element: <Home3 /> },
    { path: "/Home4", element: <Home4 /> },
    { path: "/Home5", element: <Home5 /> },
    { path: "*", element: <Navigate replace to="/404" /> },
  ]);
};
