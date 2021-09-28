import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import { useSnackbar } from "notistack";
import AuthService from "../../services/auth";
import api from "../../services/api";
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Trip Quest
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: 18,
    marginLeft: -12,
  },
}));

export default function SignIn() {

  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEnter, setLoadingEnter] = useState(false);

  async function onSubmit(e){
    e.preventDefault();
    
    if (!email || !senha) {
      return enqueueSnackbar("Por favor, preencha todos os campos!", {
        variant: "warning",
      });
    }

    setLoading(true);
    setLoadingEnter(true);
    try {
      const { data } = await api.post("login", {
        email: email,
        password: senha,
      });

      AuthService.setToken(data.token);

      setLoading(false);
      setLoadingEnter(false);

      const tipoUsuario = await AuthService.getTipoUsuario();
      console.log('TIPO USUARIO: ', tipoUsuario)

      history.push(`/${tipoUsuario.toLowerCase()}`);
    } catch (error) {
      setLoading(false);
      setLoadingEnter(false);
      if (error?.response?.data?.mensagem) {
        return enqueueSnackbar(error?.response?.data?.mensagem, {
          variant: "error",
        });
      }

      enqueueSnackbar("Erro ao fazer login!", { variant: "error" });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar-me"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={loadingEnter}
            className={classes.submit}
            onClick={(e) => onSubmit(e)}
          >
            Entrar
          </Button>
          {loadingEnter && <CircularProgress size={24} className={classes.buttonProgress} />}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}