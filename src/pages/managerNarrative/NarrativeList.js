import React, { useState, useEffect } from "react";
import { Title, Actions } from "../../components/globalStyleds"
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  useRouteMatch,
  useHistory
} from "react-router-dom";
import DataTable from "../../components/DataTable";
import api from "../../services/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    textAlign: 'center',
    marginLeft: '50%'
  },
}));

const NarrativeList = () => {
  const classes = useStyles();
  let { path } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [narratives, setNarratives] = useState(null);

  const history = useHistory();

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Nome",
    },
    { id: "description", disablePadding: true, label: "Descrição" }
  ];

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

  }, [itemsPerPage]);

  if (loading || !narratives) {
    return <CircularProgress size={24} className={classes.buttonProgress} />
  }

  console.log('NARRATIVES: ', narratives)

  function onCreateNarrative() {
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
      <DataTable nameEntityApi={"narrative"} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} rowsTable={narratives} headCellsTable={headCells} nameTable={"Narrativas"} />
    </React.Fragment>
  );
};

export default NarrativeList;
