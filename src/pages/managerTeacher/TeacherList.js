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


const TeacherList = () => {

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
    { id: "login", disablePadding: true, label: "Descrição" },
    { id: "email", disablePadding: true, label: "Posição" },
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
    return (
      <div></div>
    )
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
      <DataTable rowsTable={teachers} headCellsTable={headCells} nameTable={"Professores"} />
    </React.Fragment>
  );
};

export default TeacherList;
