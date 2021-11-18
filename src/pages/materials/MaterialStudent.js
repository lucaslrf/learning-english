import React, { useState, useEffect } from "react";
import { Title } from "../challenges/styled"
import api from "../../services/api";
import CardMaterial from "../../components/CardMaterial"
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    textAlign: 'center',
    marginLeft: '50%'
  },
}));

const MaterialStudent = () => {

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [materials, setMaterials] = useState(null);

  useEffect(() => {
    const loadMaterials = async () => {
      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/materials/${itemsPerPage}`
        );

        console.log('data materials: ', data.materials)

        setMaterials(data.materials.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadMaterials();
  }, []);


  if(loading || !materials){
    return <CircularProgress size={24} className={classes.buttonProgress} />
  }


    return (
        <React.Fragment>
        <Title>Materiais</Title>
        {materials.map((item, index) => (
          <div key={`${index}-${item._id}`}>
            <CardMaterial item={item}></CardMaterial>
          </div>
        ))}
    </React.Fragment>
    )
}

export default MaterialStudent