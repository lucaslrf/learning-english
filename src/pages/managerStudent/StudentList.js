import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {Actions, Title} from "../../components/globalStyleds"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
  useLocation
} from "react-router-dom";
import DataTable from "../../components/DataTable";

const StudentList = () => {

  let { path, url } = useRouteMatch();
    
  const history = useHistory();

  const columns = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "login", numeric: false, disablePadding: false, label: "Login" },
  ];

  function createData(name, login) {
    return { name, login };
  }
  
  const rows = [
    createData("Cupcake", "cup"),
    createData("Donut", "donut"),
    createData("Eclair", "eclair"),
    createData("Frozen yoghurt", "frozen"),
    createData("Gingerbread", "ginger"),
    createData("Honeycomb", "honey"),
  ];

  function onCreateStudent(){
    history.push(`${path}/new`)
  }

  return (
    <React.Fragment>
      <Actions>
        <div>
          <Title>Estudantes</Title>
        </div>
        <div>
          <Button onClick={() => onCreateStudent()}>Adicionar<AddCircleOutlineIcon style={{ marginLeft: '4px' }} /></Button>          
        </div>
      </Actions>
      <DataTable rowsTable={rows} headCellsTable={columns} nameTable={"Estudantes"} />

    </React.Fragment>
  );
};

export default StudentList;
