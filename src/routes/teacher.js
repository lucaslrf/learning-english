import React, { useState } from "react";

import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const Teacher = () => {
  <Router>
    <Switch>
      <Route exact path={`${path}/unidades`}>
        <Unidades />
      </Route>
      <Route path={`${path}/unidades/adicionar`}>
        <FormUnidade />
      </Route>
      <Route path={`${path}/unidades/editar/:id`}>
        <FormUnidade />
      </Route>
      <Route exact path={`${path}/categorias`}>
        <Categorias />
      </Route>
      <Route path={`${path}/categorias/adicionar`}>
        <FormCategoria />
      </Route>
      <Route path={`${path}/categorias/editar/:id`}>
        <FormCategoria />
      </Route>
      <Route exact path={`${path}/postagens`}>
        <Postagens />
      </Route>
      <Route path={`${path}/postagens/adicionar`}>
        <FormPostagem />
      </Route>
      <Route path={`${path}/postagens/editar/:id`}>
        <FormPostagem />
      </Route>
      <Route exact path={`${path}/usuarios`}>
        <Usuarios />
      </Route>
      <Route path={`${path}/usuarios/adicionar`}>
        <FormUsuario />
      </Route>
      <Route path={`${path}/usuarios/editar/:id`}>
        <FormUsuario />
      </Route>
    </Switch>
  </Router>;
};

export default Teacher;
