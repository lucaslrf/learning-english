import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import AuthService from "../services/auth";
import Paperbase from "../components/Paperbase";
import TeacherList from "../pages/managerTeacher/TeacherList";
import FormTeacher from "../pages/managerTeacher/FormTeacher";
import StudentList from "../pages/managerStudent/StudentList";
import FormStudent from "../pages/managerStudent/FormStudent";
import HomeIcon from "@material-ui/icons/Home";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import ListAltIcon from "@material-ui/icons/ListAlt";

export default function Manager({ children, ...rest }) {
  
  const location = useLocation();
  let { path, url } = useRouteMatch();

  const categories = [
    {
      id: "",
      children: [
        { id: "Início", icon: <HomeIcon />, path: `${path}` },
        {
          id: "Professores",
          icon: <AirplanemodeActiveIcon />,
          path: `${path}/teachers`,
        },
        { id: "Alunos", icon: <ListAltIcon />, path: `${path}/students` },
      ],
    },
  ];

  console.log("Route Manager: ", `${path}/teacher`);
  return (
    <>
      <Route exact path={`${path}/teachers`}>
        <Paperbase categories={categories}>
          <TeacherList />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/teachers/new`}>
        <Paperbase categories={categories}>
          <FormTeacher />
        </Paperbase>
      </Route>
      <Route path={`${path}/teachers/edit/:id`}>
        <Paperbase categories={categories}>
          <FormTeacher />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/students`}>
        <Paperbase categories={categories}>
          <StudentList />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/students/new`}>
        <Paperbase categories={categories}>
          <FormStudent />
        </Paperbase>
      </Route>
      <Route path={`${path}/students/edit/:id`}>
        <Paperbase categories={categories}>
          <FormStudent />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/`}>
        <Paperbase categories={categories} />
      </Route>
    </>
  );
}
