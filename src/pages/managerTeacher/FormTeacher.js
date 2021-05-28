import React, { useState, useEffect, useReducer } from "react";
import { Button, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { Title } from "../../components/globalStyleds"
import { Container, Actions } from "./styleTeacher";
import { makeStyles } from '@material-ui/core/styles';
import Form from '../../components/Form';
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
}));

const FormTeacher = () => {

  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      login: "",
      email: "",
      password: "",
    }
  );

  function onBack() {
    history.goBack()
  }

  useEffect(() => {

    const loadTeacher = async () => {
      const id = isNew() ? null : id;
      if (!id) {
        return;
      }

      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/teacher/${id}`
        );

        console.log('data: ', data)

        setTeacher(data.teacher.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadTeacher();

  }, []);

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
        `/create/teacher`,
        newData
      );
      console.log('DATA CREATE Narrative', data)
    } else {
      const data = await api.put(
        `/update/teacher`,
        newData
      );
    }
  }

  function isNew() {
    return history.location.pathname.includes('new')
  }


  return (
    <Container>
      <Actions>
        <div>
          <Title>{isNew() ? 'Cadastrar Professor' : 'Editar Professor'}</Title>
        </div>
        <div>
          <Button onClick={() => onBack()}>Voltar</Button>
        </div>
      </Actions>
      <Form handleSubmit={handleSubmit}>
        <div>
          <TextField id="outlined-basic" label="Nome do professor" variant="outlined" onChange={handleInput} />
          <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleInput} />
          <TextField id="outlined-basic" label="Login do professor" variant="outlined" onChange={handleInput} />
          <TextField id="outlined-basic" label="Password do professor" variant="outlined" onChange={handleInput} />
        </div>
      </Form>
    </Container>
  );
};

export default FormTeacher;
