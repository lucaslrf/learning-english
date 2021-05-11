import React, { useState, useEffect } from "react";
import Card  from "./Card"
import {Title, FooterActions, Content} from "./styled"
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
import ActionsHeader from "./ActionsHeader";


const FinishedNarrative = () => {

    let history = useHistory();
    
    function onHome(){  
        console.log('history finished: ', history)
      history.location.pathname = "/"
      history.replace("student/")
    }

  return (
    <React.Fragment>

    <ActionsHeader />

      <Content>
        <Title>
                Narrativa Finalizada!
          </Title>
          <Typography component="h6" variant="h6">
            Parabéns, você concluiu a narrativa com sucesso e ganhou pontos de acordo com o que acertou.
            Viva outras aventuras e acumule mais pontos e use para adquirir habilidades
          </Typography>
      </Content>
       
       <FooterActions>
            <Button onClick={() => onHome()}>Voltar para Home</Button>
       </FooterActions>
    </React.Fragment>
  );
};

export default FinishedNarrative;
