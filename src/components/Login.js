import React, { useState, useContext, useEffect } from 'react';
import { StateContext, DispatchContext, MethodContext } from '../App'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { api } from '../services/api'
// import { Link } from 'react-router-dom'

import { 
  Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Paper, 
  Box, 
  Grid, 
  Typography, 
  makeStyles 
} from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Nicole Cabral, Josh Phelps, Alice Won
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    // backgroundImage: 'url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)',
    backgroundImage: 'url(https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
}));

export default function Login({ history }) {
  const classes = useStyles();
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const { user, items } = useContext(StateContext)
  const { itemsDispatch, outfitsDispatch, boardsDispatch, userDispatch } = useContext(DispatchContext)
  const { addItem, login } = useContext(MethodContext)

  const handleSubmit = e => {
    e.preventDefault()
    login(username, password).then((itemLength) => {
      if (itemLength > 0 ) {  
        history.push('/closet')
      } else {
        history.push('/guide')
      }
    })
  }

  // useEffect(() => {
  //   let token = localStorage.getItem('token')
  //   if (token){
  //     if (user.items && user.items.length > 0 ) {  
  //       history.push('/closet')
  //     } else {
  //       history.push('/guide')
  //     }
  //   }
  // }, [user]);


  // const login = (username, password) => {
  //   api.auth.login(username, password)
  //   .then(data => {
  //     console.log(data.user.items)
  //     localStorage.setItem("token", data.jwt)
  //     userDispatch({type: 'GET_USER', payload: data.user})
  //     itemsDispatch({type: 'GET_ITEMS', payload: data.user.items})
  //     outfitsDispatch({type: 'GET_OUTFITS', payload: data.user.outfits})
  //     boardsDispatch({type: 'GET_BOARDS', payload: data.user.boards})
  //     // return data.user.items.length
  //   })
  //   // .catch(error => userDispatch({type: 'FETCH_ERROR', payload: error})) 
  // } 


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>

            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              name='submit'
              className={classes.submit}
              
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}