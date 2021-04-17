import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./styles.css";

const Routes = () => {
    const Teacher = ({ children, ...rest }) => {
        return (
          <Route
            {...rest}
            render={({ location }) =>
              AuthService.loggedIn() &&
              AuthService.getTipoUsuario() === "Teacher" ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location },
                  }}
                />
              )
            }
          />
        );
      };
}

export default Routes;
