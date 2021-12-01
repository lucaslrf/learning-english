import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Actions, Title } from "../../components/globalStyleds"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  useRouteMatch,
  useHistory
} from "react-router-dom";
import DataTable from "../../components/DataTable";
import api from "../../services/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    textAlign: 'center',
    marginLeft: '50%'
  },
}));

const StudentList = () => {
  const classes = useStyles();
  let { path } = useRouteMatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [students, setStudents] = useState(null)

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Nome",
    },
    { id: "email", disablePadding: true, label: "Email" },
  ];


  useEffect(() => {

    const loadStudents = async () => {
      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/students/${itemsPerPage}`
        );

        console.log('data: ', data)

        setStudents(data.students.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadStudents();

  }, []);

  if (loading) {
    return <CircularProgress size={24} className={classes.buttonProgress} />
  }

  function onCreateStudent() {
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
      <DataTable nameEntityApi={"student"} rowsTable={students} headCellsTable={headCells} nameTable={"Estudantes"} />

    </React.Fragment>
  );
};

export default StudentList;
