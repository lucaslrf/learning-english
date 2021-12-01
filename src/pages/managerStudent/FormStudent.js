import React, { useState, useEffect, useReducer } from "react";
import { Button, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { Title, Container, Actions } from "../../components/globalStyleds"
import { makeStyles } from '@material-ui/core/styles';
import Form from '../../components/Form';
import api from "../../services/api";
import CircularProgress from '@material-ui/core/CircularProgress';

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
  buttonProgress: {
    textAlign: 'center',
    marginLeft: '50%'
  }
}));

const FormStudent = () => {

  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      password: "",
    }
  );

  function onBack() {
    history.goBack()
  }

  useEffect(() => {

    const loadStudent = async () => {
      const idStudent = isNew() ? null : id;
      if (!idStudent) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/student/${id}`
        );

        console.log('data: ', data)

        setStudent(data.student);
        setFormInput({ ["name"]: data.student.name });
        setFormInput({ ["email"]: data.student.email });
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

    let newData = formInput;

    let result = null;
    if (isNew()) {
      result = await api.post(
        `/register/student`,
        newData
      );
      console.log('DATA CREATE Narrative', result)
    } else {
      result = await api.put(
        `/edit/student/${id}`,
        newData
      );
    }

    console.log('result Student EDIT: ', result)

    if(result.data.error){
      return
    }

    history.goBack();
  }

  function isNew() {
    return history.location.pathname.includes('new')
  }

  if(loading){
    return <CircularProgress size={24} className={classes.buttonProgress} />
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
        <TextField 
            id="outlined-basic" 
            name="name" 
            label="Nome do aluno" 
            variant="outlined" 
            defaultValue={isNew() ? '' : student.name}
            onChange={handleInput} 
          />
          <TextField 
            id="outlined-basic" 
            name="email" 
            label="Email" 
            variant="outlined" 
            defaultValue={isNew() ? '' : student.email}
            onChange={handleInput} 
          />
          <TextField 
            id="outlined-basic" 
            name="password" 
            label="Password do aluno" 
            variant="outlined" 
            type="password"
            onChange={handleInput} 
          />
        </div>
      </Form>
    </Container>
  );
};

export default FormStudent;
