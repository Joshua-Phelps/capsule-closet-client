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
    backgroundColor: theme.palette.primary.light,
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
    background: theme.palette.primary.gradient,
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 36,
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
            name='add-item'
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