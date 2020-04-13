import React, { useContext, useState } from 'react'
import { StateContext, MethodContext } from '../App'
import { makeStyles, AppBar, Tabs, Tab, Menu, MenuItem } from "@material-ui/core/";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
  const { navBarValue} = useContext(StateContext)
  const { setNavBarValue } = useContext(MethodContext)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
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
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={navBarValue}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab label="Guide" />
          <Tab label="Closet" />
          <Tab label="Outifts" />
          <Tab label="Boards" />

          <AccountCircleIcon 
          aria-controls="simple-menu" 
          aria-haspopup="true"  
          className={classes.account} 
          onClick={handleClick} 
          fontSize='large' 
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={anchorEl}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Tabs>
      </AppBar>
    </div>
  );
}
