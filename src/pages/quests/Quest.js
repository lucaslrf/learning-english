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


const Quest = () => {

    let { path, url } = useRouteMatch();
    const [quest, setQuest] = useState([]);
    const [positionQuest, setPositionQuest] = useState(0)
    let history = useHistory();
    const pathCurrent = useLocation()

    console.log('pathCurrent quest: ', pathCurrent.state.quests)

    useEffect(() => {

        const loadQuestion = async () => {
            //verificar status da narrativa
            /**
             * if (narrativa.status === "INICIADA"){
             *      setPositionQuest(0)
             * }else if(narrativa.status === "RECOMECADA"){
             *      sverificar na tabela SAVES
             * pegar idquest -> pegar quest e position da quest
             *      const data = questPesquisada
             *       setPositionQuest(data.position)
             * }
             * 
             */
            //idNarrativa, possitionQuest
            console.log('pathCurrent.state.quests[positionQuest]: ', pathCurrent.state.quests[positionQuest])
            if(pathCurrent.state.quests[positionQuest]){
              setQuest(pathCurrent.state.quests[positionQuest])
              console.log('quest  nova: ', quest)
            }else{
              history.push(`${path}/finished`)
            }

        }

        loadQuestion()

    }, [positionQuest])

    
    function onNext(){
        console.log('onNext')
        let newPosition = positionQuest
        setPositionQuest(++newPosition)
    }

  return (
    <React.Fragment>

    <ActionsHeader />

      <Content>
        <Title>
            {quest.name}
          </Title>
          <Typography component="p" variant="body1">
            {quest.description}
          </Typography>
      </Content>
       
       <FooterActions>
            <Button onClick={() => onNext()}>Next</Button>
       </FooterActions>
    </React.Fragment>
  );
};

export default Quest;
