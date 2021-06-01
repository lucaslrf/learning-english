import React, { useState, useEffect, useReducer } from "react";
import {
  Button,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { Title, Container, Actions } from "../../components/globalStyleds";
import { makeStyles } from "@material-ui/core/styles";
import Form from "../../components/Form";
import AddIcon from '@material-ui/icons/Add';
import Alternative from "../../components/Alternative";
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  actionAlternative: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const FormQuest = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [quest, setQuest] = useState(null);
  const [narratives, setNarratives] = useState(null);
  const [valueNarrative, setValueNarrative] = useState(null);
  const [currentNarrative, setCurrentNarrative] = useState(null);
  const [inputValueNarrative, setInputValueNarrative] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      position: "",
      score: "",
      description: "",
      narrative: ""
    }
  );

  useEffect(() => {

    const loadNarratives = async () => {
      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/narratives/30`
        );

        console.log('data form quests narratives: ', data)

        setNarratives(data.narratives.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadNarratives();

  }, []);

  useEffect(() => {

    const loadQuest = async () => {
      const idQuest = isNew() ? null : id;
      if (!idQuest) {
        return;
      }

      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/quest/${id}`
        );

        console.log('data: ', data)

        setQuest(data.quest.data);
        setCurrentNarrative(data.quest.data.narrative)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadQuest();

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

  const handleSubmit = async evt => {
    evt.preventDefault();

    let data = { formInput };
    console.log('DATA SUBMIT HANDLE: ', data)

    // if (isNew()) {
    //   const dataQuest = await api.post(
    //     `/create/quest`,
    //     data
    //   );

    // } else {
    //   const dataUpdateQuest = await api.put(
    //     `/edit/quest/${id}`,
    //     data
    //   );
    // }

    // if(result.data.error){
    //   return
    // }

    // history.goBack();
  }

  console.log('narratives form quest: ', narratives)

  if (loading || !narratives) {
    return (
      <div></div>
    )
  }

  return (
    <Container>
      <Actions>
        <div>
          <Title>{isNew() ? "Cadastrar Quest" : "Editar Quest"}</Title>
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
            label="Nome"
            variant="outlined"
            required
            onChange={handleInput}
          />
          <TextField
            id="outlined-basic"
            name="position"
            label="Posição"
            variant="outlined"
            required
            onChange={handleInput}
          />
          <TextField
            id="outlined-basic"
            name="score"
            label="Pontos"
            variant="outlined"
            required
            onChange={handleInput}
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
            required
            onChange={handleInput}
          />
          <TextField
            id="outlined-multiline-static"
            label="Questão"
            name="question"
            style={{ width: "100%" }}
            multiline
            rows={5}
            variant="outlined"
            required
            onChange={handleInput}
          />
          <Autocomplete
            value={currentNarrative ? currentNarrative : ''}
            onChange={(event, newValue) => {
              setValueNarrative(newValue);
            }}
            inputValue={inputValueNarrative}
            onInputChange={(event, newInputValue) => {
              setInputValueNarrative(newInputValue);
            }}
            id="controllable-states-demo"
            options={narratives.map((narrative) => narrative.name)}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Narrativa" variant="outlined" />}
          />
        </div>
        <div className={classes.actionAlternative}>
          <Button variant="contained" color="secondary"><AddIcon />Adicionar Alternativa</Button>
        </div>
        <div>
          <Alternative number={1}></Alternative>
        </div>
      </Form>
    </Container>
  );
};

export default FormQuest;
