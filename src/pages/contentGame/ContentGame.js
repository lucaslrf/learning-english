import React, { useState, useEffect } from "react";
import { Title, FooterActions, Content } from "../contentGame/styled"
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  useRouteMatch,
  useHistory,
  useLocation
} from "react-router-dom";
import ActionsHeader from "../../components/ActionsHeader";
import { Actions } from "../../components/globalStyleds";
import api from "../../services/api";


const ContentGame = () => {

  let { path } = useRouteMatch();
  const pathCurrent = useLocation()
  let history = useHistory();
  const [quest, setQuest] = useState([]);
  const [positionQuest, setPositionQuest] = useState(0)
  const narrative = pathCurrent.state;
  const [narrativeQuest, setNarrativeQuest] = useState(null)

  console.log('narrative contentGame', narrative, narrative.info.status)

  async function onContinue() {
    console.log('teste Card', pathCurrent.state)

     //verificar status da narrativa
      let result = null;
      result = await api.get(
        `/get/narrative/next/quest/${narrative.id}`
      );

      if(!result || result.data.error){
        return false;
      }
       
      console.log('positionQuest ContentGame with result: ', result, positionQuest)
      
    history.push(`${path}/quest`, result.data.narrative_quest)
  }

  function onBack() {
    history.goBack();
  }

  return (
    <React.Fragment>
      <Actions>
        <div>
          <Button onClick={() => onBack()}>Voltar</Button>
        </div>
      </Actions>
      <Content>
        <Title>
          {pathCurrent.state.name}
        </Title>
        <Typography component="h6" variant="h6">
          {pathCurrent.state.description}
        </Typography>
      </Content>

      <FooterActions>
        <Button onClick={() => onContinue()}>Continuar</Button>
      </FooterActions>
    </React.Fragment>
  );
};

export default ContentGame;
