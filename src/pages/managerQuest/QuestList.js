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
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    textAlign: 'center',
    marginLeft: '50%'
  },
}));


const QuestList = () => {
  const classes = useStyles();
  let { path } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [quests, setQuests] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [linkNextPage, setLinkNextPage] = useState(null);
  const [linkPreviousPage, setLinkPreviousPage] = useState(null);
  const [totalRecords, setTotalRecords] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)

  const history = useHistory();

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Nome",
    },
    { id: "description", disablePadding: false, label: "Descrição" },
    { id: "position", numeric: true, disablePadding: false, label: "Posição" },
    { id: "question", disablePadding: false, label: "Questão" },
    { id: "score", numeric:true, disablePadding: false, label: "Pontos" }
  ];

  function onCreateQuest() {
    history.push(`${path}/new`)
  }


  useEffect(() => {

    const loadQuests = async () => {

      try {
        const { data } = await api.get(
          `/get/quests/${itemsPerPage}`
        );

        console.log('data get Quest: ', data)

        setQuests(data.quests.data);
        setLinkNextPage(data.quests.next_page_url)
        setLinkPreviousPage(data.quests.prev_page_url)
        setTotalRecords(data.quests.total)
        setCurrentPage(data.quests.current_page)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadQuests();

  }, [itemsPerPage]);

  const nextPage = async (linkNextPage) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `${linkNextPage}`
      );

      console.log('dataQuest: ', data)
      setQuests(data.quests.data);
      setLinkNextPage(data.quests.next_page_url)
      setLinkPreviousPage(data.quests.prev_page_url)
      setTotalRecords(data.quests.total)
      setCurrentPage(data.quests.current_page)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  if (loading || !quests) {
    return <CircularProgress size={24} className={classes.buttonProgress} />
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
      <DataTable functionNextPage={nextPage} linkPrevPage={linkPreviousPage} linkNextPage={linkNextPage} totalRecords={totalRecords} nameEntityApi={"quest"}  itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} rowsTable={quests} headCellsTable={headCells} nameTable={"Quests"} />
    </React.Fragment>
  );
};

export default QuestList;
