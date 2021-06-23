import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, Link, Redirect, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import AuthService from "../services/auth";
import Paperbase from "../components/Paperbase";
import Activity from "../pages/activities/Activity";
import Challenge from "../pages/challenges/Challenge";
import MaterialStudent from "../pages/materials/MaterialStudent";
import Flashcard from "../pages/flashcards/Flashcard";
import ContentGame from "../pages/contentGame/ContentGame";
import Quest from "../pages/quests/Quest";
import HomeIcon from '@material-ui/icons/Home';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FinishedNarrative from "../components/FinishedNarrative";

export default function Student({ children, ...rest }) {

  const location = useLocation();
  let { path, url } = useRouteMatch();

  const categories = [
    {
      id: '',
      children: [
        { id: 'Início', icon: <HomeIcon />, path: `${path}/`  },
        { id: 'Narrativas', icon: <AirplanemodeActiveIcon />, path: `${path}/challenges`  },
        { id: 'Materiais', icon: <ListAltIcon />,  path: `${path}/materials`  }
      ],
    }
  ];

  return (
    <>
      <Route exact path={`${path}/challenges`}>
        <Paperbase categories={categories}>
          <Challenge />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/materials`}>
        <Paperbase categories={categories}>
          <MaterialStudent />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/challenges/contentGame`}>
        <Paperbase categories={categories}>
          <ContentGame />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/challenges/contentGame/quest`}>
        <Paperbase categories={categories}>
          <Quest />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/challenges/quest/finished`}>
        <Paperbase categories={categories}>
          <FinishedNarrative />
        </Paperbase>
      </Route>
      <Route exact path={`${path}/`}>
         <Paperbase categories={categories}/>
      </Route>
    </>
  );
}
