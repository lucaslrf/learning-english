import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router";
import { Title, Container } from "./globalStyleds";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1.5),
      width: 230,
    },
  },
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
}));

const Form = ({ children, handleSubmit }) => {
  const classes = useStyles();

  return (
    <Container>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        {children}
        <div>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={classes.button}
            startIcon={<SaveIcon />}
            type="submit"
          >
            Save
          </Button>
          <Button className={classes.button} variant="contained">
            Cancelar
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Form;
