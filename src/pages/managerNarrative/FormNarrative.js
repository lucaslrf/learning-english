import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextareaAutosize,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Title, Container, Actions } from "../../components/globalStyleds";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Form from "../../components/Form";

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

  function onBack() {
    history.goBack();
  }

  function isNew() {
    return history.location.pathname.includes("new");
  }

  console.log("é um novo cadastro: ", isNew());

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
      <Form>
        <div>
          <TextField id="outlined-basic" label="Nome" variant="outlined" />
        </div>
        <div>
        <TextField
            id="outlined-multiline-static"
            label="Descrição"
            multiline
            rows={5}
            variant="outlined"
          />
        </div>
      </Form>
    </Container>
  );
};

export default FormNarrative;
