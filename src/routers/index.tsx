import React from "react";
import { Routes, Route } from "react-router-dom";
import Calender from "../pages/Calender";
import Chart from "../pages/chart";
import Docs from "../pages/docs";
import Home from "../pages/home";
import ListMember from "../pages/list-member/ListMember";
import WorkMe from "../pages/me";
import WorkMeHome from "../pages/me/components/WorkMeHome";
import WorkMeTask from "../pages/me/components/WorkMeTask";
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
    path: "/me",
    component: WorkMe,
    children: [
      {
        path: "/me",
        component: WorkMeHome,
      },
      {
        path: "/me/:id",
        component: WorkMeTask,
      },
    ],
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
      {
        path: "/home/project/list-member/:id",
        component: ListMember,
      },
      {
        path: "/home/group/list-member/:id",
        component: ListMember,
      },
      {
        path: "/home/calender",
        component: Calender,
      },
      {
        path: "/home/docs",
        component: Docs,
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
