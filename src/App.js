import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Paperbase from "./components/Paperbase";
import SignIn from "./pages/login/SingIn";
import Activity from "./pages/activities/Activity";
import Challenge from "./pages/challenges/Challenge";
import MaterialStudent from "./pages/materials/MaterialStudent";
import Flashcard from "./pages/flashcards/Flashcard";
import Content from "./components/Content";
import ContentGame from "./pages/contentGame/ContentGame";
import Quest from "./pages/quests/Quest";
import Routes from "./routes";

function App() {
  return (
    <Routes />
  );
}

export default App;
