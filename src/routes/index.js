import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import SignIn from '../pages/login/SingIn';
import Manager from './manager';
import Student from './student';
import Teacher from './teacher';

const Routes = () => {
  const ManagerRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          // AuthService.loggedIn() &&
          // AuthService.getTipoUsuario() === "Teacher" ? (
          //   children
          // ) :
          // "Teacher" === "Teacher" ? (
            children
          // ):
          // <Redirect
          //   to={{
          //     pathname: "/login",
          //     state: { from: location },
          //   }}
          // />
        )}
      />
    );
  };

  const StudentRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          // AuthService.loggedIn() &&
          // AuthService.getTipoUsuario() === "Teacher" ? (
          //   children
          // ) :
          // "Teacher" === "Teacher" ? (
            children
          // ):
          // <Redirect
          //   to={{
          //     pathname: "/login",
          //     state: { from: location },
          //   }}
          // />
        )}
      />
    );
  };

  const TeacherRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          // AuthService.loggedIn() &&
          // AuthService.getTipoUsuario() === "Teacher" ? (
          //   children
          // ) :
          // "Teacher" === "Teacher" ? (
            children
          // ):
          // <Redirect
          //   to={{
          //     pathname: "/login",
          //     state: { from: location },
          //   }}
          // />
        )}
      />
    );
  };

  const AccessRoute = ({ children, ...rest }) => (
    <Route
      {...rest}
      render={({ location }) => {
        // const tipoUsuario = AuthService.getTipoUsuario();
        const tipoUsuario = "Administrador";

        // if (!AuthService.loggedIn()) {
        if(tipoUsuario === "Login"){
          return children;
        } else if (tipoUsuario === "Aluno") {
          return (
            <Redirect
              to={{ pathname: "/student", state: { from: location } }}
            />
          );
        } else if (tipoUsuario === "Administrador") {
          return (
            <Redirect
              to={{ pathname: "/admin", state: { from: location } }}
            />
          );
        } else if (tipoUsuario === "Professor") {
          return (
            <Redirect
              to={{ pathname: "/teacher", state: { from: location } }}
            />
          );
        }
      }}
    />
  );

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
