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
        <Route path="/flashcards">
          <Paperbase>
            <Flashcard />
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
