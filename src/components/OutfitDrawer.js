
import React, { useContext, useState } from 'react';
import AddItemModal from './AddItemModal'
import { StateContext, MethodContext, DispatchContext } from '../App'
import {useScrollPosition} from '../hooks/useScrollPosition'
import { api } from '../services/api'
import DrawerItemsContainer from '../containers/DrawerItemsContainer'
import DrawerButtons from './DrawerButtons'
import DrawerHeader from './DrawerHeader'
import DrawerAppBar from './DrawerAppBar'
import clsx from 'clsx';
import { 
    makeStyles,
    useTheme,
    Button, 
    Drawer, 
    CssBaseline, 
    List, 
    Divider, 
    Toolbar,
    IconButton,
    TextField,
    Grid
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 300; 

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '48px',
    // height: 'calc(100vh - 48px)',
    height: '100vh',
    position: 'absolute'
  },
  drawerPaperShift: {
    position: 'fixed',
    marginTop: 0,
    height: '100vh'
  },
  itemDisplay: {
    width: '300px',
    overflowX: 'hidden',
    height: '100%'
  }, 
}));

export default function OutfitDrawer() {
  const { editMode } = useContext(StateContext)
  const [hideNavBar, setHideNavBar] = useState(false)
  const classes = useStyles();

  useScrollPosition(({ prevPos, currPos }) => {
    const isShow = currPos.y < (-48)
    if (isShow !== hideNavBar) setHideNavBar(isShow)
  }, [hideNavBar])


  return (
    <div className={classes.root}>
      <CssBaseline /> 
      <DrawerAppBar />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={editMode}
        classes={{
          paper: clsx(classes.drawerPaper, {[classes.drawerPaperShift]: hideNavBar}),
        }}        
      >
        <DrawerHeader />
        <Divider />
        <div className={classes.itemDisplay} >
          <DrawerItemsContainer />
        </div>         
        <DrawerButtons /> 
      </Drawer>
    </div>
  );
}

