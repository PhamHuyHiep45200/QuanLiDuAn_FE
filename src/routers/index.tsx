import React from "react";
import { Routes, Route } from "react-router-dom";
import Board from "../pages/board";
import Home from "../pages/home";
import List from "../pages/list";
import Project from "../pages/project";
import Top from "../pages/top";
// interface Router {
//   path: string;
//   component: () => JSX.Element;
// }
const routers = [
  {
    path: "/",
    component: Top,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/project/:id",
    component: Project,
    children: [
      {
        path: "/project/:id/list",
        component: List,
      },
      {
        path: "/project/:id/board",
        component: Board,
      },
    ],
  },
];

function Routers() {
  return (
    <Routes>
      {routers.map((routes: any, index: number) => {
        if (routes.children) {
          return (
            <Route
              key={index}
              path={routes.path}
              element={<routes.component />}
            >
              {routes?.children.map((route: any, i: number) => (
                <Route
                  key={i}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Route>
          );
        } else {
          return (
            <Route
              key={index}
              path={routes.path}
              element={<routes.component />}
            />
          );
        }
      })}
    </Routes>
  );
}

export default Routers;
