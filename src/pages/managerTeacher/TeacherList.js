import React, { useState, useEffect } from "react";
import {Title} from "../../components/globalStyleds"
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataTeacher } from "../../services/dadosTeacher";
import { Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, makeStyles, TableBody } from "@material-ui/core";
import { Actions } from "./styleTeacher";
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


const TeacherList = () => {

  const data = dataTeacher
  let { path, url } = useRouteMatch();
  
  const history = useHistory();

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 130, editable: true},
    { field: 'login', headerName: 'Login', width: 130, editable: true }
  ];

  const rows = [
    { id: 1, name: 'Snow', login: 'Jon' },
    { id: 2, name: 'Lannister', login: 'Cersei' },
    { id: 3, name: 'Lannister', login: 'Jaime' },
    { id: 4, name: 'Stark', login: 'Arya' },
    { id: 5, name: 'Targaryen', login: 'Daenerys' },
    { id: 6, name: 'Melisandre', login: 'Mel' },
    { id: 7, name: 'Clifford', login: 'Ferrara' },
    { id: 8, name: 'Frances', login: 'Rossini' },
    { id: 9, name: 'Roxie', login: 'Harvey' },
  ];

  function onCreateTeacher(){
    history.push(`${path}/new`)
  }
  
  return (
    <React.Fragment>
      <Actions>
        <div>
          <Title>Professores</Title>
        </div>
        <div>
          <Button onClick={() => onCreateTeacher()}>Adicionar<AddCircleOutlineIcon style={{ marginLeft: '4px' }} /></Button>          
        </div>
      </Actions>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {/* <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} 
        components={{
          Toolbar: GridToolbar,
        }}       
        getRowId={(r) => r.id}
      />
    </div> */}
    </React.Fragment>
  );
};

export default TeacherList;
