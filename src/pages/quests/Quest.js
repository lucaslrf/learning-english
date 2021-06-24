import React, { useState, useEffect } from "react";
import Card  from "../../components/Card"
import {Title, FooterActions, HeaderActions, Content} from "../contentGame/styled"
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Button from '@material-ui/core/Button';
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


const Quest = () => {

    const pathCurrent = useLocation()
    const data = pathCurrent.state;
    let { path, url } = useRouteMatch();
    const [quest, setQuest] = useState(data.quest);
    const [positionQuest, setPositionQuest] = useState(0)
    let history = useHistory();
    
    const [valueAlternativeChecked, setValueAlternativeChecked] = useState(data.alternatives.length ? data.alternatives[0].id : null);

    console.log('pathCurrent quest: ', pathCurrent.state)

    const handleChange = (event) => {
      console.log('handleChange: ', event.target.value)
      setValueAlternativeChecked(event.target.value);
    };

    useEffect(() => {
      const data = pathCurrent.state;
      setQuest(data.quest);
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
        
    }

    if(!quest){
      return (
        <div>

        </div>
      )
    }

    console.log('quest content game: ', quest, data)

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
    </React.Fragment>
  );
};

export default Quest;
