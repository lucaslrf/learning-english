import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router";
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

const FormMaterial = () => {
  const classes = useStyles();
  const history = useHistory();
  const [material, setMaterial] = useState(null);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      description: "",
    }
  );

  useEffect(() => {

    const loadMaterial = async () => {
      const id = isNew() ? null : match.params.id;
      if (!id) {
        return;
      }

      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/material/${id}`
        );

        console.log('data: ', data)

        setMaterial(data.material.data);
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


  function onBack() {
    history.goBack();
  }

  function isNew() {
    return history.location.pathname.includes("new");
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { formInput };
    console.log('DATA SUBMIT HANDLE: ', data)

    if (isNew()) {
      const dataMaterial = await api.post(
        `/create/materials`,
        data
      );

    } else {
      const dataUpdateMaterial = await api.put(
        `/update/material`,
        data
      );
    }
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
      <Form handleSubmit={handleSubmit}>
        <div>
          <TextField id="outlined-basic" label="Nome" variant="outlined" onChange={handleInput} />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Descrição"
            multiline
            rows={5}
            variant="outlined"
            onChange={handleInput}
          />
        </div>
      </Form>
    </Container>
  );
};

export default FormMaterial;
