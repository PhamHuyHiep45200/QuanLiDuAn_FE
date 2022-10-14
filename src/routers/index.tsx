import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Group from "../pages/group";
import Home from "../pages/home";
import List from "../pages/list";
import Task from "../pages/task";
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
    children: [
      {
        path: "/home",
        component: Dashboard,
      },
      {
        path: "/home/group",
        component: Group,
      },
      {
        path: "/home/list",
        component: List,
      },
      {
        path: "/home/task",
        component: Task,
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
