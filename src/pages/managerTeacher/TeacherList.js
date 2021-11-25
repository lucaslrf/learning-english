import React, { useState, useEffect } from "react";
import { dataTeacher } from "../../services/dadosTeacher";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  useRouteMatch,
  useHistory
} from "react-router-dom";
import DataTable from "../../components/DataTable";
import api from "../../services/api";
import { Actions, Title } from "../../components/globalStyleds";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    textAlign: 'center',
    marginLeft: '50%'
  },
}));

const TeacherList = () => {
  const classes = useStyles();
  let { path } = useRouteMatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Nome",
    },
    { id: "email", disablePadding: true, label: "Email" }
  ];

  useEffect(() => {

    const loadTeachers = async () => {
      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/teachers/${itemsPerPage}`
        );

        console.log('data: ', data)

        setTeachers(data.teachers.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadTeachers();

  }, []);

  if (loading) {
    return <CircularProgress size={24} className={classes.buttonProgress} />
  }



  function onCreateTeacher() {
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
      <DataTable nameEntityApi={"teacher"} rowsTable={teachers} headCellsTable={headCells} nameTable={"Professores"} />
    </React.Fragment>
  );
};

export default TeacherList;
