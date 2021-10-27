import React, { useState, useEffect } from "react";
import Card  from "../../components/Card"
import {Title, FooterActions, HeaderActions, Content} from "../contentGame/styled"
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    useParams
  } from "react-router-dom";
import ActionsHeader from "../../components/ActionsHeader";
import AlternativesQuests from "./AlternativesQuests";
import api from "../../services/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    textAlign: 'center',
    marginLeft: '50%'
  },
}));


const Quest = () => {
    const classes = useStyles();
    const pathCurrent = useLocation()
    const data = pathCurrent.state;
    let { path, url } = useRouteMatch();
    const [quest, setQuest] = useState(data.quest);
    const [loading, setLoading] = useState(false);
    const [positionQuest, setPositionQuest] = useState(0)
    const [openDialog, setOpenDialog] = useState(false);
    const [showAlternativesCorrect, setShowAlternativeCorrect] = useState([])
    const [alternativeIncorrect, setAlternativeIncorrect] = useState(false)
    let history = useHistory();
    
    const [valueAlternativeChecked, setValueAlternativeChecked] = useState(data.alternatives.length ? data.alternatives[0].id : null);

    console.log('pathCurrent quest: ', pathCurrent.state)

    const handleChange = (event) => {
      console.log('handleChange: ', event.target.value)
      setValueAlternativeChecked(event.target.value);
    };

    useEffect(() => {
      setLoading(true)
      const data = pathCurrent.state;
      setQuest(data.quest);
      setLoading(false)
    }, [pathCurrent.state]);
    
    async function onNext(){
        console.log('onNext');
        let result = null;
        if (valueAlternativeChecked) {
          result = await api.post(
            `register/point/quest/${quest.id}/${valueAlternativeChecked}/${quest.narrative_id}`,
          );
          console.log('DATA CREATE Narrative', result)
        }

        
      if(!result || result.data.error){
        return false;
      }

      console.log(result.data.next_narrative_quest.original.narrative_quest);
      if(result.data.next_narrative_quest.original.narrative_quest){
        console.log('history finished: ', history)
        history.location.pathname = "/";
        history.replace(`${path}`, result.data.next_narrative_quest.original.narrative_quest)
      }else{
        history.location.pathname = "/";
        history.replace('student/challenges/quest/finished')
      } 

      if(!result.data.alternative_correct){
          setAlternativeIncorrect(true)
          setOpenDialog(true)
          setShowAlternativeCorrect(result.data.alternatives_corrects);
      }
        
    }

    if(loading || !quest){
      return <CircularProgress size={24} className={classes.buttonProgress} />
    }

    console.log('quest content game: ', quest, data)

    const handleClickOpen = () => {
      setOpenDialog(true);
    };
  
    const handleClose = () => {
      setOpenDialog(false);
    };

  return (
    <React.Fragment>

    <ActionsHeader />

      <Content>
        <Title>
            {quest.name_quest}
          </Title>
          <Typography component="p" variant="body1">
            {quest.description_quest}
          </Typography>
          <br />
          <Typography component="p" variant="body1">
            {quest.question}
          </Typography>
          <AlternativesQuests alternativesQuest={data.alternatives} handleChange={handleChange} valueAlternativeRadio={valueAlternativeChecked} />
      </Content>
       <FooterActions>
            <Button onClick={() => onNext()}>Next</Button>
       </FooterActions>

       <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alternativeIncorrect ? 'Ops, você errou, mas continue estudando para melhorar' : 'Muito bem, conseguiu acertar'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {!!showAlternativesCorrect.length && showAlternativesCorrect.map((alternative) => (
              <p key={alternative.id}>{alternative.description}</p>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Prosseguir
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
};

export default Quest;
