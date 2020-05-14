import React, { useState, useContext } from 'react';
import { StateContext, DispatchContext, MethodContext } from '../App'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'

import { 
  Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  // Link, 
  Paper, 
  Box, 
  Grid, 
  Typography, 
  makeStyles 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 500,
  },

  image: {
    background: 'linear-gradient(0deg, rgba(224, 175, 158, 0.64), rgba(178, 209, 216, 0.47)), url(https://images.unsplash.com/photo-1585914924626-15adac1e6402?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    textAlign: 'center',
    marginTop: '150px',
    fontSize: '3rem',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: '100',
    letterSpacing: '14px',
  }
}));


export default function Homepage(props) {
  const classes = useStyles();

  return(
    <div className={classes.image}>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={2}>
        </Grid>
        <Grid className={classes.title}item xs={8}>
         <h3>Capsule <br></br> Closet</h3>
        </Grid>
        <Grid item xs={2}>
        </Grid>

        <Grid item xs={4}/>
        <Grid item xs={4} container spacing={1}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Button component={Link} name='login' to="/login">
                Login
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Button component={Link} to="/signup">
                Signup
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={4}/>
      
      </Grid>
    </div>
  )
}