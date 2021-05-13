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
import NarrativeList from "../pages/managerNarrative/NarrativeList";
import FormNarrative from "../pages/managerNarrative/FormNarrative";
import QuestList from "../pages/managerQuest/QuestList";
import FormQuest from "../pages/managerQuest/FormQuest";
import MaterialList from "../pages/managerMaterials/MaterialList";
import FormMaterial from "../pages/managerMaterials/FormMaterial";

export default function Teacher({ children, ...rest }) {
  
  const location = useLocation();
  let { path, url } = useRouteMatch();

  const categories = [
    {
      id: "",
      children: [
        { id: "Início", icon: <HomeIcon />, path: `${path}` },
        {
          id: "Narratives",
          icon: <AirplanemodeActiveIcon />,
          path: `${path}/narratives`,
        },
        { id: "Quests", icon: <ListAltIcon />, path: `${path}/quests` },
        { id: "Materials", icon: <ListAltIcon />, path: `${path}/materials` },
      ],
    },
  ];
  
  return (
    <>
      <Route exact path={`${path}/narratives`}>
        <Paperbase categories={categories}>
          <NarrativeList />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/narratives/new`}>
        <Paperbase categories={categories}>
          <FormNarrative />
        </Paperbase>
      </Route>
      <Route path={`${path}/narratives/edit/:id`}>
        <Paperbase categories={categories}>
          <FormNarrative />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/quests`}>
        <Paperbase categories={categories}>
          <QuestList />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/quests/new`}>
        <Paperbase categories={categories}>
          <FormQuest />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/quests/edit/:id`}>
        <Paperbase categories={categories}>
          <FormQuest />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/materials`}>
        <Paperbase categories={categories}>
          <MaterialList />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/materials/new`}>
        <Paperbase categories={categories}>
          <FormMaterial />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/materials/edit/:id`}>
        <Paperbase categories={categories}>
          <FormMaterial />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/`}>
        <Paperbase categories={categories} />
      </Route>
    </>
  );
}
