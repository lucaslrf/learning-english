import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import { Title, Container, Actions } from "../../components/globalStyleds"
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

const FormStudent = () => {

  const classes = useStyles();
  const history = useHistory();
  const [student, setStudent] = useState(null);

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

    const loadStudent = async () => {
      const id = isNew() ? null : match.params.id;
      if (!id) {
        return;
      }

      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/student/${id}`
        );

        console.log('data: ', data)

        setStudent(data.student.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadStudent();

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
        `/create/student`,
        newData
      );
      console.log('DATA CREATE Narrative', data)
    } else {
      const data = await api.put(
        `/update/student`,
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
          <Title>{isNew() ? 'Cadastrar Aluno' : 'Editar Aluno'}</Title>
        </div>
        <div>
          <Button onClick={() => onBack()}>Voltar</Button>
        </div>
      </Actions>
      <Form handleSubmit={handleSubmit}>
        <div>
          <TextField id="outlined-basic" label="Nome" variant="outlined" onChange={handleInput} />
          <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleInput} />
          <TextField id="outlined-basic" label="Login" variant="outlined" onChange={handleInput} />
          <TextField id="outlined-basic" label="Password" variant="outlined" onChange={handleInput} />
        </div>
      </Form>
    </Container>
  );
};

export default FormStudent;
