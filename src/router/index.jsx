import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Index from "../pages/Index";

//全局路由
export const Router = () => {
  return useRoutes([
    { path: "/", element: <Index /> },
    // { path: "*", element: <Navigate replace to="/404" /> },
  ]);
};
