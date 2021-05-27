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


const MaterialList = () => {

  let { path } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState(null)

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
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadMaterials();

  }, []);

  if (loading) {
    return (
      <div></div>
    )
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
      <DataTable rowsTable={materials} headCellsTable={headCells} nameTable={"Materiais"} />
    </React.Fragment>
  );
};

export default MaterialList;
