import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/activities">Atividades</Link>
            </li>
            <li>
              <Link to="/challenges">Desafios</Link>
            </li>
          </ul>
          <li>
              <Link to="/materials">Materiais</Link>
          </li>
          <li>
            <Link to="/flashcards">FlashCards</Link>
          </li>
        </nav>

        <Switch>
          <Route path="/activities">
            {/* <About /> */}
          </Route>
          <Route path="/challenges">
            {/* <Users /> */}
          </Route>
          <Route path="/">
            {/* <Home /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
