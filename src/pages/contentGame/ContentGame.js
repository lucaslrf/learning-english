import React, { useState, useEffect } from "react";
import Card  from "../../components/Card"
import {Title, FooterActions, Content} from "../contentGame/styled"
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
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    useParams
  } from "react-router-dom";
import ActionsHeader from "../../components/ActionsHeader";


const ContentGame = () => {

    const pathCurrent = useLocation()
    let history = useHistory();

    console.log('pathCurrent', pathCurrent.state)

    function onContinue(){
      console.log('teste Card', pathCurrent.state)
  
      history.push(`/quest/`, pathCurrent.state)
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
