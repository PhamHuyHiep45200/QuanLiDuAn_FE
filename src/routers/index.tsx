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
import ProjectSupperAdmin from "../pages/supper-admin/ProjectSupperAdmin";
import SupperAdmin from "../pages/supper-admin/SupperAdmin";
import Task from "../pages/task";
import Top from "../pages/top";
import GroupSupperAdmin from "../pages/supper-admin/GroupSupperAdmin";
import MemberSupperAdmin from "../pages/supper-admin/MemberSupperAdmin";
import ItemSupperAdmin from "../pages/supper-admin/ItemSupperAdmin";
import ChangePassWord from "../pages/auth/forgot-password/ForgotPassWord";
import DashBoard from "../pages/supper-admin/DashBoard";
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
    path: "/change-pasword/:id",
    component: ChangePassWord,
  },
  {
    path: "/supper-admin",
    component: SupperAdmin,
    children: [
      {
        path: "/supper-admin",
        component: DashBoard,
      },
      {
        path: "/supper-admin/project",
        component: ProjectSupperAdmin,
      },
      {
        path: "/supper-admin/group",
        component: GroupSupperAdmin,
      },
      {
        path: "/supper-admin/item",
        component: ItemSupperAdmin,
      },
      {
        path: "/supper-admin/member",
        component: MemberSupperAdmin,
      },
    ],
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
        path: "/home/me",
        component: WorkMeHome,
      },
      {
        path: "/home/me/:id",
        component: WorkMeTask,
      },
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
        path: "/home/calendar/:id",
        component: Calender,
      },
      {
        path: "/home/docs/:id",
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
