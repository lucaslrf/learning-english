import React, { useState, useEffect } from "react";
import {
  Button,
  TextField
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

const FormNarrative = () => {
  const classes = useStyles();
  const history = useHistory();
  const [narrative, setNarrative] = useState(null);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      description: "",
    }
  );

  useEffect(() => {

    const loadNarrative = async () => {
      const id = isNew() ? null : match.params.id;
      if (!id) {
        return;
      }

      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/narrative/${id}`
        );

        console.log('data: ', data)

        setNarrative(data.narrative.data);
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
    console.log('evt target name: ', evt.target.name, evt.target.value)
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };


  const handleSubmit = async evt => {
    evt.preventDefault();

    let newData = { formInput };

    if (isNew()) {
      const data = await api.post(
        `/create/narrative`,
        newData
      );
      console.log('DATA CREATE Narrative', data)
    } else {
      const data = await api.put(
        `/update/narrative`,
        newData
      );
    }
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

export default FormNarrative;
