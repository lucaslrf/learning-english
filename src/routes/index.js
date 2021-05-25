import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import SignIn from '../pages/login/SingIn';
import Manager from './manager';
import Student from './student';
import Teacher from './teacher';
import AuthService from '../services/auth';

const Routes = () => {
  const ManagerRoute = ({ children, ...rest }) => {
    return (
      <Route
      {...rest}
      render={({ location }) => (
        AuthService.loggedIn() &&
        AuthService.getTipoUsuario() === "admin" ? (
          children
        ) :
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      )}
    />
    );
  };

  const StudentRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          AuthService.loggedIn() &&
          AuthService.getTipoUsuario() === "student" ? (
            children
          ) :
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )}
      />
    );
  };

  const TeacherRoute = ({ children, ...rest }) => {
    return (
        <Route
        {...rest}
        render={({ location }) => (
          AuthService.loggedIn() &&
          AuthService.getTipoUsuario() === "teacher" ? (
            children
          ) :
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )}
      />
    );
  };

  return (
    <Router>      
       <Switch>         
        <ManagerRoute path="/admin">
          <Manager />
        </ManagerRoute>
        <StudentRoute path="/student">
          <Student />
        </StudentRoute>
        <TeacherRoute path="/teacher">
          <Teacher />
        </TeacherRoute>
        <Route exact path="/">
          <SignIn />
        </Route>
       </Switch>  
    </Router>
  );
};

export default Routes;
