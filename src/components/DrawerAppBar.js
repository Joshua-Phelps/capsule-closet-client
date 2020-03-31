import React, { useContext, useState } from 'react';
import AddItemModal from './AddItemModal'
import { StateContext, MethodContext } from '../App'
import { useScrollPosition } from '../hooks/useScrollPosition'
import clsx from 'clsx';
import { makeStyles, Button, Toolbar } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';

const drawerWidth = 300; 

const useStyles = makeStyles(theme => ({
  appBar: {
    marginTop: '48px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  buttonstyle: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '4px'
  },
}))

export default function DrawerAppBar(){
  const { editMode } = useContext(StateContext)
  const { setEditMode } = useContext(MethodContext)
  const classes = useStyles();

    
  const handleDrawerOpen = () => {
    window.scrollTo(0, 48)
    setEditMode(true);
  };
  return(
    <AppBar
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: editMode,
        })}
      >
        <Toolbar>          
          <Button            
            color="inherit"
            variant="outlined" 
            // backgroundColor='secondary'
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.buttonstyle, classes.menuButton, {[classes.hide]: editMode})}
          >
            Create Outfit
          </Button>
          <AddItemModal/>
        </Toolbar>
    </AppBar>
  )
}