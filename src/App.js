import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Paperbase from "./components/Paperbase";
import SignIn from "./components/SingIn";
import Activity from "./pages/activities/Activity";
import Challenge from "./pages/challenges/Challenge";
import MaterialStudent from "./pages/materials/MaterialStudent";
import Flashcard from "./pages/flashcards/Flashcard";
import Content from "./components/Content";
import ContentGame from "./pages/contentGame/ContentGame";
import Quest from "./pages/quests/Quest";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/challenges">
          <Paperbase>
            <Challenge />
          </Paperbase>
        </Route>
        <Route path="/materials">
          <Paperbase>
            <MaterialStudent />
          </Paperbase>
        </Route>
        <Route path="/contentGame">
          <Paperbase>
            <ContentGame />
          </Paperbase>
        </Route>
        <Route path="/contentGame/:id">
          <Paperbase>
            <ContentGame />
          </Paperbase>
        </Route>
        <Route path="/quest">
          <Paperbase>
            <Quest />
          </Paperbase>
        </Route>
        <Route path="/quest/:id">
          <Paperbase>
            <Quest />
          </Paperbase>
        </Route>
        <Route path="/">
          <Paperbase />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
