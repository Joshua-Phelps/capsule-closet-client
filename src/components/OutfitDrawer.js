
import React, { useContext, useState } from 'react';
import { StateContext } from '../App'
import {useScrollPosition} from '../hooks/useScrollPosition'
import DrawerItemsContainer from '../containers/DrawerItemsContainer'
import DrawerButtons from './DrawerButtons'
import DrawerHeader from './DrawerHeader'
import DrawerAppBar from './DrawerAppBar'
import clsx from 'clsx';
import { makeStyles, Drawer, CssBaseline, Divider, } from '@material-ui/core'

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
    // height: '100vh'
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
        className={classes.drawer, '.mui-fixed'}
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

