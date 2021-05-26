import React, { useState, useEffect } from "react";
import {Title} from "../../components/globalStyleds"
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataTeacher } from "../../services/dadosTeacher";
import { Button, makeStyles } from "@material-ui/core";
import { Actions, ContainerButton } from "./styleTeacher";
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


const TeacherList = () => {

  const data = dataTeacher
  let { path, url } = useRouteMatch();
  
  const history = useHistory();

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  async function buscaTeachers() {
  
  }
  
  const rows = [
    createData("Cupcake", 'TESTE'),
    createData("Donut", 'TESTE'),
  ];

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Nome",
    },
    { id: "description", numeric: false, disablePadding: false, label: "Descrição" }
  ];

  function onCreateTeacher(){
    history.push(`${path}/new`)
  }
  
  return (
    <React.Fragment>
      <Actions>     
        <ContainerButton>
          <Button onClick={() => onCreateTeacher()}>Adicionar<AddCircleOutlineIcon style={{ marginLeft: '4px' }} /></Button>          
        </ContainerButton>
      </Actions>
      <DataTable rowsTable={rows} headCellsTable={headCells} nameTable={"Professores"}/>
    </React.Fragment>
  );
};

export default TeacherList;
