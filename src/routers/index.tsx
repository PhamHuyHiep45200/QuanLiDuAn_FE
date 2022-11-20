import React from "react";
import { Routes, Route } from "react-router-dom";
import Chart from "../pages/chart";
import Home from "../pages/home";
import NotifyCations from "../pages/notifications";
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
        path: "/home/notifycations",
        component: NotifyCations,
      },
      {
        path: "/home/task/:id",
        component: Task,
      },
      {
        path: "/home/chart/:id",
        component: Chart,
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
