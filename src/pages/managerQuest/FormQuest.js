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
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertDialog from '../../components/AlertDialog';


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
  },
  buttonProgress: {
    textAlign: 'center',
    marginLeft: '50%'
  },
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
  const [alternativesAdded, setAlternativesAdded] = useState([{"id": 1, "description": "", "correct": false}])
  const [showError, setShowError] = useState(false)

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      position: "",
      score: "",
      question: "",
      description: "",
      image: null,
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

      console.log('edit quest: ', idQuest)
      
      if (!idQuest) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/quest/${id}`
        );

        console.log('data quest edit: ', data)

        setQuest(data.quest);
        setCurrentNarrative(data.narrative)
        setValueNarrative(data.narrative)
        setAlternativesAdded(data.alternatives)
        setFormInput({ 'name': data.quest.name });
        setFormInput({ 'description': data.quest.description });
        setFormInput({ 'position': data.quest.position });
        setFormInput({ 'score': data.quest.score });
        setFormInput({ 'question': data.quest.question });
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

    let newData = formInput;
    let dataAlternatives = alternativesAdded;

    if(!valueNarrative){
      setLoading(false);
      setShowError(true);
      return;
    }

    newData.narrative_id = valueNarrative.id;
    newData.alternatives = dataAlternatives;

    console.log('newDataFormaInputQuest: ', newData)
    
    const formData = new FormData();
    formData.append('name', newData.name)
    formData.append('position', newData.position)
    formData.append('score', newData.score)
    formData.append('narrative_id', newData.narrative_id)
    formData.append('alternatives', JSON.stringify(newData.alternatives))
    formData.append('description', newData.description)
    formData.append('question', newData.question)
    formData.append('imageQuest', newData.image)
    console.log('DATA SUBMIT HANDLE 2: ', formData)

    const verifyAlternativeNull = newData.alternatives.find((item) => !item.description.trim())

    if(!newData.name.trim() || !newData.description.trim() || verifyAlternativeNull || !newData.position.trim() || !newData.score.trim() || !newData.question.trim()){
      setLoading(false);
      setShowError(true);
      return;
  }

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }

    
    console.log('DATA SUBMIT HANDLE: ', newData)

    let result = null;
    if (isNew()) {
      result = await api.post(
        `/create/quest`,
        formData,
        config
      );

    } else {
      result = await api.post(
        `/edit/quest/${id}`,
        formData,
        config
      );
    }

    if(result.data.error){
      return
    }

    setLoading(false);
    history.goBack();
  }

  function addAlternative(){
    const number = alternativesAdded?.length + 1;
    const alternative = {
      "id": number,
      "description": "",
      "correct": false
    }
    setAlternativesAdded(prev => [...prev, alternative]);
  }

  function onChangeAlternatives(id, evt){
    let alternative = alternativesAdded.find((item) => item.id === id)
    if(alternative){
      alternative.description = evt.target.value;
      const newAlternatives = alternativesAdded;
      setAlternativesAdded(newAlternatives);
    }
    
  }

  function onChangeCheckboxAlternative(id, evt){
    let alternative = alternativesAdded.find((item) => item.id === id)
    if(alternative){
      alternative.correct = evt.target.checked;
      const newAlternatives = alternativesAdded;
      setAlternativesAdded(newAlternatives);
    }
    
  }

  console.log('narratives form quest: ', narratives, alternativesAdded)

  if (loading) {
    return <CircularProgress size={24} className={classes.buttonProgress} />
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
      <Form loading={loading} handleSubmit={handleSubmit}>
        <div>
          <TextField
            id="outlined-basic"
            name="name"
            label="Nome"
            variant="outlined"
            required
            defaultValue={isNew() ? '' : quest?.name}
            onChange={handleInput}
          />
          <TextField
            id="outlined-basic"
            name="position"
            label="Posição"
            type="number"
            variant="outlined"
            required
            defaultValue={isNew() ? '' : quest?.position}
            onChange={handleInput}
          />
          <TextField
            id="outlined-basic"
            name="score"
            label="Pontos"
            type="number"
            variant="outlined"
            required
            defaultValue={isNew() ? '' : quest?.score}
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
            defaultValue={isNew() ? '' : quest?.description}
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
            defaultValue={isNew() ? '' : quest?.question}
            onChange={handleInput}
          />
          <Autocomplete
            onChange={(event, newValue) => {
              setValueNarrative(newValue);
              console.log('nw value: ', event, newValue)
            }}
            inputValue={inputValueNarrative}
            onInputChange={(event, newInputValue) => {
              setInputValueNarrative(newInputValue);
            }}
            id="controllable-states-demo"
            // options={narratives.map((narrative) => narrative.name)}
            options={narratives ? narratives : []}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            defaultValue={{id: currentNarrative?.id, name: currentNarrative?.name}}
            renderInput={(params) => <TextField {...params} label="Narrativa" variant="outlined" name="narrative"/>}
          />
        </div>
        <div className={classes.actionAlternative}>
          <Button disabled={loading} variant="contained" color="secondary" onClick={() => addAlternative()}><AddIcon />Adicionar Alternativa</Button>
        </div>
        <div>
          {alternativesAdded && alternativesAdded?.length && alternativesAdded.map((alternative, index) => 
            <Alternative description={alternative.description} number={index+1} key={`${alternative}-${index}`} handleChange={onChangeAlternatives} handleChangeCheckBoxAlternative={onChangeCheckboxAlternative}></Alternative>
          )}
        </div>
        {quest?.path_image ? <div>
          <a target="_blank" href={`${process.env.REACT_APP_HOST_SERVER}/${quest?.path_image}`}>Imagem Anexada</a>
        </div> :<></>}
        <div>
          <h1>Adicionar Imagem</h1>
          <input type="file" name="image" onChange={handleInputFile}/>    
        </div>
      </Form>
      <AlertDialog openDialog={showError} setFunctionError={setShowError} messageTitle={'Ops! Houve um problema'} contentMessage={'Verifique se preencheu os campos obrigatórios e tente novamente mais tarde'} ></AlertDialog>
    </Container>
  );
};

export default FormQuest;
