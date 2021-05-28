import React, { useState, useEffect } from "react";
import { Title, Actions } from "../../components/globalStyleds"
import { Button, } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import DataTable from "../../components/DataTable";
import api from "../../services/api";


const QuestList = () => {

  let { path } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [quests, setQuests] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const history = useHistory();

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Nome",
    },
    { id: "description", disablePadding: true, label: "Descrição" },
    { id: "position", disablePadding: true, label: "Posição" },
    { id: "question", disablePadding: true, label: "Questão" },
    { id: "score", numeric: true.valueOf, disablePadding: true, label: "Pontos" }
  ];

  function onCreateQuest() {
    history.push(`${path}/new`)
  }


  useEffect(() => {

    const loadQuests = async () => {
      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/quests/${itemsPerPage}`
        );

        console.log('data: ', data)

        setQuests(data.quests.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadQuests();

  }, []);

  if (loading) {
    return (
      <div></div>
    )
  }

  return (
    <React.Fragment>
      <Actions>
        <div>
          <Title>Quests</Title>
        </div>
        <div>
          <Button onClick={() => onCreateQuest()}>Adicionar<AddCircleOutlineIcon style={{ marginLeft: '4px' }} /></Button>
        </div>
      </Actions>
      <DataTable rowsTable={quests} headCellsTable={headCells} nameTable={"Quests"} />
    </React.Fragment>
  );
};

export default QuestList;
