import React, { useState, useEffect, useReducer } from "react";
import {
  Button,
  TextField
} from "@material-ui/core";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { Title, Container, Actions } from "../../components/globalStyleds";
import { makeStyles } from "@material-ui/core/styles";
import Form from "../../components/Form";
import api from "../../services/api";

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
}));

const FormNarrative = () => {
  const classes = useStyles();
  const history = useHistory();
  let { path, url } = useRouteMatch();
  const { id } = useParams();
  const [narrative, setNarrative] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      description: "",
      image: "",
    }
  );

  useEffect(() => {

    const loadNarrative = async () => {
      const idNarrative = isNew() ? null : id;
      console.log('edit narratiie: ', idNarrative)
      if (!idNarrative) {
        setLoading(false)
        return;
      }

      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/narrative/${id}`
        );

        console.log('data: ', data)

        setNarrative(data.narrative); 
        setFormInput({ ["name"]: data.narrative.name });
        setFormInput({ ["description"]: data.narrative.description });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadNarrative();

  }, []);

  function isNew() {
    return history.location.pathname.includes("new");
  }

  function onBack() {
    history.goBack();
  }

  const handleInput = evt => {
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


  const handleSubmit = async evt => {
    evt.preventDefault();

    let newData = formInput;

    console.log('newData', newData)

    const formData = new FormData();
    formData.append('name', newData.name)
    formData.append('description', newData.description)
    formData.append('imageNarrative', newData.image)
    console.log('DATA SUBMIT HANDLE 2: ', formData)

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }

    let result = null;
    if (isNew()) {
      result = await api.post(
        `/create/narrative`,
        formData,
        config
      );
      console.log('DATA CREATE Narrative', result)
    } else {
      result = await api.post(
        `/edit/narrative/${narrative.id}`,
        formData,
        config
      );

      console.log('DATA UPDATE Narrative', result)
    }

    if(result.data.error){
      return
    }

    history.goBack();
  }

  console.log('narrative edit: ', narrative)

  if (loading && !narrative) {
    return (
      <div></div>
    )
  }


  return (
    <Container>
      <Actions>
        <div>
          <Title>{isNew() ? "Cadastrar Narrativa" : "Editar Narrativa"}</Title>
        </div>
        <div>
          <Button onClick={() => onBack()}>Voltar</Button>
        </div>
      </Actions>
      <Form handleSubmit={handleSubmit}>
        <div>
          <TextField 
            id="outlined-basic" 
            label="Nome" 
            name="name" 
            variant="outlined" 
            onChange={handleInput} 
            defaultValue={isNew() ? '' : narrative?.name} 
            style={{ width: "100%" }}/>
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
            defaultValue={isNew() ? '' : narrative?.description}
            onChange={handleInput}
            required
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

export default FormNarrative;
