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


const ContentGame = () => {

  let { path } = useRouteMatch();
  const pathCurrent = useLocation()
  let history = useHistory();

  console.log('pathCurrent', pathCurrent.state)

  function onContinue() {
    console.log('teste Card', pathCurrent.state)

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
    history.push(`${path}/quest`, pathCurrent.state)
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
