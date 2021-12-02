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


const MaterialList = () => {
  const classes = useStyles();
  let { path, match } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState(null)
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
    { id: "description", disablePadding: true, label: "Descrição" }
  ];


  useEffect(() => {

    const loadMaterials = async () => {
      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/materials/${itemsPerPage}`
        );

        console.log('data: ', data)

        setMaterials(data.materials.data);
        setLinkNextPage(data.materials.next_page_url)
        setLinkPreviousPage(data.materials.prev_page_url)
        setTotalRecords(data.materials.total)
        setCurrentPage(data.materials.current_page)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadMaterials();

  }, [itemsPerPage]);

  const nextPage = async (linkNextPage) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `${linkNextPage}`
      );

      console.log('dataQuest: ', data)
      setMaterials(data.materials.data);
      setLinkNextPage(data.materials.next_page_url)
      setLinkPreviousPage(data.materials.prev_page_url)
      setTotalRecords(data.materials.total)
      setCurrentPage(data.materials.current_page)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  if (loading) {
    return <CircularProgress size={24} className={classes.buttonProgress} />
  }


  function onCreateMaterial() {
    history.push(`${path}/new`)
  }


  return (
    <React.Fragment>
      <Actions>
        <div>
          <Title>Materiais</Title>
        </div>
        <div>
          <Button onClick={() => onCreateMaterial()}>Adicionar<AddCircleOutlineIcon style={{ marginLeft: '4px' }} /></Button>
        </div>
      </Actions>
      <DataTable functionNextPage={nextPage} linkPrevPage={linkPreviousPage} linkNextPage={linkNextPage} totalRecords={totalRecords} nameEntityApi={"material"} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} rowsTable={materials} headCellsTable={headCells} nameTable={"Materiais"} />
    </React.Fragment>
  );
};

export default MaterialList;
