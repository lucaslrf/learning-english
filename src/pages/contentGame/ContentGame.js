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


const ContentGame = () => {

  let { path } = useRouteMatch();
  const pathCurrent = useLocation()
  let history = useHistory();

  console.log('pathCurrent', pathCurrent.state)

  function onContinue() {
    console.log('teste Card', pathCurrent.state)

    history.push(`${path}/quest`, pathCurrent.state)
  }

  return (
    <React.Fragment>

      <ActionsHeader />

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
