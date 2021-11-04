import React, { useState, useEffect, useReducer } from "react";
import {
  Button,
  TextField,
} from "@material-ui/core";
import { Title, Container, Actions } from "../../components/globalStyleds";
import { makeStyles } from "@material-ui/core/styles";
import Form from "../../components/Form";
import api from "../../services/api";
import { useHistory, useParams } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
  buttonProgress: {
    textAlign: 'center',
    marginLeft: '50%'
  }
}));

const FormMaterial = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      description: "",
      image: "",
    }
  );

  useEffect(() => {

    const loadMaterial = async () => {
      const idMaterial = isNew() ? null : id;
      if (!idMaterial) {
        return;
      }

      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/material/${id}`
        );

        console.log('data: ', data)

        setMaterial(data.material);
        setFormInput({ 'name': data.material.name });
        setFormInput({ 'description': data.material.description });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadMaterial();

  }, []);

  const handleInput = evt => {
    console.log('evt target name: ', evt.target.name, evt.target.value)
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleInputFile = evt => {
    console.log('evt target name file: ', evt.target.name, evt.target.files[0])
    const name = evt.target.name;
    const newValue = evt.target.files[0];
    setFormInput({ [name]: newValue });
  };


  function onBack() {
    history.goBack();
  }

  function isNew() {
    return history.location.pathname.includes("new");
  }

  const handleSubmit = async evt => {
    setLoading(true);
    evt.preventDefault();

    let data = { formInput };
    console.log('DATA SUBMIT HANDLE: ', data.formInput)

    const formData = new FormData();
    formData.append('name', data.formInput.name)
    formData.append('description', data.formInput.description)
    formData.append('materialImage', data.formInput.image)
    console.log('DATA SUBMIT HANDLE 2: ', formData)

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }

    let result = null;
    if (isNew()) {
      result = await api.post(
        `/create/material`,
        formData,
        config
      );

    } else {
      result = await api.post(
        `/edit/material/${id}`,
        formData,
        config
      );
    }

    if(result.data.error){
      return
    }

    history.goBack();
    setLoading(false);
  }

  console.log('material: ', material)

  if(loading || !material){
    return <CircularProgress size={24} className={classes.buttonProgress} />
  }

  return (
    <Container>
      <Actions>
        <div>
          <Title>{isNew() ? "Cadastrar Material" : "Editar Material"}</Title>
        </div>
        <div>
          <Button onClick={() => onBack()}>Voltar</Button>
        </div>
      </Actions>
      <Form loading={loading} handleSubmit={handleSubmit}>
        <div>
          <TextField 
            id="outlined-basic" 
            name="name" 
            label="Nome" 
            variant="outlined" 
            style={{ width: "100%" }} 
            onChange={handleInput} 
            defaultValue={isNew() ? '' : material?.name} 
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Descrição"
            name="description"
            style={{ width: "100%" }}
            multiline
            rows={5}
            variant="outlined"
            defaultValue={isNew() ? '' : material?.description}
            onChange={handleInput}
          />
        </div>
        <div>
          <h1>Adicionar Arquivo</h1>
          <input type="file" name="image" onChange={handleInputFile}/>    
        </div>
      </Form>
    </Container>
  );
};

export default FormMaterial;
