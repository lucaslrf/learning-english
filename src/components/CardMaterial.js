import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import {LinkToDownload} from "./styled"
import {
  useRouteMatch,
  useHistory
} from "react-router-dom";
import api from "../services/api";


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
    marginRight: 10,
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
  line: {
    display: 'flex',
    backgroundColor: 'blue',
    width: '5px'
  }
}));

export default function MediaControlCard({ item }) {
  const classes = useStyles();
  const theme = useTheme();
  let { path, url } = useRouteMatch();
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  async function downloadMaterial() {
  
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
            <LinkToDownload target="_blank"  href={`${process.env.REACT_APP_HOST_SERVER}/${item?.path}`} aria-label="play/pause">
              <GetAppIcon className={classes.playIcon} />
              <Typography variant="subtitle1" color="textSecondary">
                Download
              </Typography>
            </LinkToDownload>
        </div>
      </div>
    </Card>
  );
}
