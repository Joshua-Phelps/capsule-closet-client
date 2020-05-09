import React, { useContext, useState } from 'react'
import { StateContext, MethodContext } from '../App'
import { makeStyles, AppBar, Tabs, Tab, Menu, MenuItem, Grid } from "@material-ui/core/";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  account: {
    margin: theme.spacing(1)
  }
}));

export default function NavBar({ history, location }) {
  const classes = useStyles();
  const { navBarValue } = useContext(StateContext)
  const { setNavBarValue, clearState } = useContext(MethodContext)
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(false);
  }

  const handleAccount = () => {

  }

  const handleChange = (event, newValue) => {
    setNavBarValue(newValue)
    newValue === 0 && history.push('/guide')
    newValue === 1 && history.push('/closet')
    newValue === 2 && history.push('/outfits')
    newValue === 3 && history.push('/boards')
  }

  const handleLogout = () => {
    localStorage.clear()
    history.push('/login')
    clearState()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Grid container >
          <Grid item xs={11}>
        <Tabs
          variant="fullWidth"
          value={navBarValue}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab label="Guide" />
          <Tab name='closet' label="Closet" />
          <Tab label="Outifts" />
          <Tab label="Boards" />

        </Tabs>
        </Grid>
        <Grid item xs={1}>
          <AccountCircleIcon 
          aria-controls="simple-menu" 
          aria-haspopup="true"  
          className={classes.account} 
          onClick={handleClick} 
          fontSize='medium' 
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={anchorEl}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout} component={Link} to="/">Logout</MenuItem>
            
          </Menu>
          </Grid>
          </Grid>
      </AppBar>
    </div>
  );
}
