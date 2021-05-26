import React, { useState, useEffect } from "react";
import {Title, Actions} from "../../components/globalStyleds"
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Button, makeStyles } from "@material-ui/core";
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
import api from "../../services/api";


const NarrativeList = () => {

  let { path, url } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [narratives, setNarratives] = useState(null);
  
  const history = useHistory();

  function createData(name, description) {
    return { name, description };
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
    { id: "description", disablePadding: true, label: "Descrição"}
  ];

  const modelNarratives = [
    "name",
    "description"
  ]

  useEffect(() => {

    const loadNarratives = async () => {
      setLoading(true);
  
      try {
        const { data } = await api.get(
          `/get/narratives/${itemsPerPage}`
        );
        
        console.log('data: ', data)
  
        setNarratives(data.narratives.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadNarratives();

  }, []);
  
  if(loading){
    return (
      <div></div>
    )
  }

  console.log('NARRATIVES: ', narratives, rows)

  function onCreateNarrative(){
    history.push(`${path}/new`)
  }
  
  return (
    <React.Fragment>
      <Actions>
        <div>
          <Title>Narrativas</Title>
        </div>
        <div>
          <Button onClick={() => onCreateNarrative()}>Adicionar<AddCircleOutlineIcon style={{ marginLeft: '4px' }} /></Button>          
        </div>
      </Actions>
      <DataTable rowsTable={narratives} headCellsTable={headCells} nameTable={"Narrativas"}/>
    </React.Fragment>
  );
};

export default NarrativeList;
