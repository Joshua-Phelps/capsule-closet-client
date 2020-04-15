import React, { useContext } from 'react';
import AddItemModal from './AddItemModal'
import { StateContext, MethodContext } from '../App'
import clsx from 'clsx';
import { makeStyles, Button, Toolbar, Paper, Typography } from '@material-ui/core'
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
  const { setEditMode, setOpenItemModal, closetDisplayedItems } = useContext(MethodContext)
  const { categoryNavBarValue } = useContext(StateContext)
  const classes = useStyles()
    
  const handleDrawerOpen = () => {
    setEditMode(true)
  }

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
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.buttonstyle, classes.menuButton, {[classes.hide]: editMode})}
          >
            Create Outfit
          </Button>
          <Button 
            type="button" 
            onClick={() => setOpenItemModal(true)}
            variant="outlined" 
            color="inherit"
            // backgroundColor='secondary'
          >
          Add Item to Closet
          </Button>
          <AddItemModal/>
          <Paper className={classes.counter}>
              <Typography color='secondary'>
                {`Total ${categoryNavBarValue ? categoryNavBarValue : 'Items'}: ${closetDisplayedItems.length}`}
              </Typography>
          </Paper>
        </Toolbar>
    </AppBar>
  )
}