import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Button from '@material-ui/core/Button';
import { dataRPG } from '../services/dados';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '15px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  doneAllIcon: {
    color: 'green',
    marginRight: '10px'
  },
  iconButtonDoneAll: {
    marginRight: '10px'
  },
  line:{
      display: 'flex',
      backgroundColor: 'blue',
      width: '5px'
  }
}));

export default function MediaControlCard({item}) {
  const classes = useStyles();
  const theme = useTheme();
  
  let history = useHistory();

  function onPlay(){
    console.log('TESTE ID OnPLay narrative: ', item._id)
    const data = dataRPG
    console.log('dataRPG Card', data)
    const teste = data.find((dado) => dado._id === item._id)
    console.log('teste Card', teste)

    history.push(`/contentGame/`, item)
  }

  return (
    <Card className={classes.root}>
        <div className={classes.line}>

        </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {item.description}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
            {item.status !== "FINISHED" ?
          <Button onClick={() => { onPlay(item._id) }} aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
            <Typography variant="subtitle1" color="textSecondary">
                Iniciar
            </Typography>
          </Button> : 
          <IconButton className={classes.iconButtonDoneAll}>    
              <DoneAllIcon  className={classes.doneAllIcon} />
              <Typography variant="subtitle1" color="textSecondary">
                Finalizado
            </Typography>
         </IconButton> 
        }
        </div>
      </div>
      {/* <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      /> */}
    </Card>
  );
}
