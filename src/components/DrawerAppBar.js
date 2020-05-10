import React, { useContext } from 'react';
import AddItemModal from './AddItemModal'
import { StateContext, MethodContext } from '../App'
import clsx from 'clsx';
import { makeStyles, Button, Toolbar, Container, Tabs, Tab, Grid, Paper, Typography } from '@material-ui/core'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';

const drawerWidth = 300; 

const useStyles = makeStyles(theme => ({

  
  appBar: {
    // marginTop: '48px',
    backgroundColor: theme.palette.primary.light,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    width: '100%',

    // marginLeft: drawerWidth,
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

  gridStyles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, auto)',
    gridTemplateRows: 'repeat(2, 40px)',
    gridGap: '20px',
    marginTop: '20px',

  },
  closetTitle: {
    gridColumn: '7',
    textAlign: 'center',
    fontSize: '28px',
    textTransform: 'uppercase',
    marginTop: '0px',
    marginBottom: '0px',
    alignSelf: 'center'


  },
  outfitButton: {
    gridColumn: '1',
    alignSelf: 'center',
    justifySelf: 'center'
  },
  addItemButton: {
    gridColumn: '12',
    justifySelf: 'center'
  },
  chip: {

    gridColumn: '1/-1',
    
  }
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
    <Container
        position="absolute"
        width="100%"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: editMode,
        }), classes.gridStyles}spot
      >
        {/* <Toolbar> */}
        
        
          <Button            
            color="inherit"
            variant="outlined" 
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.buttonstyle, classes.menuButton, {[classes.hide]: editMode}), classes.outfitButton}
          >
            Create Outfit
          </Button>
          <h3 className={classes.closetTitle}>My Closet</h3>
          <Button 
            type="button" 
            onClick={() => setOpenItemModal(true)}
            variant="outlined" 
            color="inherit"
            name='add-item'
            className={classes.addItemButton}
            // backgroundColor='secondary'
          >
          Add Item to Closet
          </Button>
          <Chip className={classes.chip} label={`${categoryNavBarValue ? categoryNavBarValue : 'Items'}`} avatar={<Avatar>{`${closetDisplayedItems.length}`}</Avatar>}/>
          <AddItemModal/>
          

              {/* <Paper className={classes.counter}>
                {/* <Typography color='primary'> */}
                  {/* {`Total ${categoryNavBarValue ? categoryNavBarValue : 'Items'}: ${closetDisplayedItems.length}`}
                {/* </Typography> */}
              {/* </Paper> */} 
       
        {/* </Toolbar> */}
    </Container>
  )
}