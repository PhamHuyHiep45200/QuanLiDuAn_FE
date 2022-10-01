import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Top from "../pages/top";
interface Router {
  path: string;
  component: () => JSX.Element;
}
const routers = [
  {
    path: "/",
    component: Top,
  },
  {
    path: "/home",
    component: Home,
  },
];

function Routers() {
  return (
    <Routes>
      {routers.map((router: Router, index: number) => {
        return (
          <Route
            key={index}
            path={router.path}
            element={<router.component />}
          />
        );
      })}
    </Routes>
  );
}

export default Routers;
