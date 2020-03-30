
import React, { useContext } from 'react';
import AddItemModal from './AddItemModal'
import { StateContext, MethodContext, DispatchContext } from '../App'
import { api } from '../services/api'
import DrawerContainer from '../containers/DrawerContainer'
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
    TextField
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '48px',
    height: 'calc(100vh - 48px)',
    position: 'absolute'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
  itemDisplay: {
    marginLeft: '-64px',
    marginRight: '-64px'
  }, 
  form: {
    textAlignLast: 'center'
  },
  button: {
    width: '100%',
    padding: '10px'  
  },
}));

export default function OutfitDrawer() {
  const { editMode, selectedOutfit, outfits, user } = useContext(StateContext)
  const { selectedOutfitDispatch, outfitsDispatch } = useContext(DispatchContext)
  const { setEditMode, updateOutfit, createOutfit } = useContext(MethodContext)
  const classes = useStyles();
  const theme = useTheme();
  const { name, id } = selectedOutfit

  const handleDrawerOpen = () => {
    setEditMode(true);
  };

  const handleDrawerClose = () => {
    setEditMode(false);
  };

  const handleChangeName = ({target: {value} }) => {
    selectedOutfitDispatch({type: 'EDIT_NAME', payload: value})
  }

  const handleCreateOutfit = () => {
    const newOutfit = {...selectedOutfit, user_id: user.id}
    api.outfits.createOutfit(newOutfit)
    .then(outfit => outfitsDispatch({type: 'UPDATE_OUTFIT', payload: outfit}))
  }

  const handleUpdate = () => {
    api.outfits.updateOutfit(selectedOutfit)
    .then(outfit => outfitsDispatch({type: 'UPDATE_OUTFIT', payload: outfit}))
  }

  const handleSubmit = e => {
    e.preventDefault()
    id ? handleUpdate() : handleCreateOutfit()
  }


  return (
    <div className={classes.root}>
      <CssBaseline /> 
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
            className={clsx(classes.menuButton, editMode && classes.hide)}
            className={classes.buttonstyle}
          >
            Create Outfit
          </Button>
        <AddItemModal/>
        </Toolbar>

      </AppBar>




      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={editMode}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {/* <Typography className={classes.title}>{name}</Typography> */}
          {/* <form onSubmit={id ? handleUpdate : handleCreateOutfit} noValidate autoComplete="off">
            <TextField 
            id="standard-basic" 
            label='Edit Outfit Name' 
            value={name}
            onChange={handleChangeName}  />
          </form> */}
          <Button
          className={classes.button}
          variant="outlined" 
          onClick={id ? handleUpdate : handleCreateOutfit}
            >
              <div className={classes.buttonText}>{id ? 'Update Outfit' : 'Add Outfit to Collection'}</div>
          </Button>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField 
            id="standard-basic" 
            label='Edit Outfit Name' 
            value={name}
            onChange={handleChangeName}  />
        </form>
          {/* <Button
          variant="outlined" 
          onClick={id ? handleUpdate : handleCreateOutfit}
            >
              {id ? 'Update Outfit' : 'Add Outfit to Collection'}
          </Button> */}
        <div className={classes.itemDisplay}>
          <DrawerContainer />
        </div>
        <List>
        </List>
      </Drawer>
    </div>
  );
}

