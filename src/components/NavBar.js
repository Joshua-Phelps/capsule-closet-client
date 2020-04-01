import React, { useContext, useEffect } from 'react'
import { StateContext, MethodContext } from '../App'
import { makeStyles, AppBar, Tabs, Tab } from "@material-ui/core/";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function NavBar({ history, location }) {
  const classes = useStyles();
  const { navBarValue} = useContext(StateContext)
  const { setNavBarValue } = useContext(MethodContext)

  const handleChange = (event, newValue) => {
    setNavBarValue(newValue)
    newValue === 0 && history.push('/guide')
    newValue === 1 && history.push('/closet')
    newValue === 2 && history.push('/outfits')
    newValue === 3 && history.push('/boards')
  };

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
          {/* create hamburger menu item for Signout, My Account (edit) */}
        </Tabs>
      </AppBar>
    </div>
  );
}
