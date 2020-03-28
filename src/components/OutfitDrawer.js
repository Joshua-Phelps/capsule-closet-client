import React, { useContext } from 'react';
import { StateContext, MethodContext, DispatchContext } from '../App'
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
    marginTop: '60px',
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
    marginTop: '60px',
    height: 'calc(100vh - 60px)'
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
  itemDisplay: {
    marginLeft: '-64px',
    marginRight: '-64px'
  }
}));

export default function OutfitDrawer() {
  const { editMode, selectedOutfit } = useContext(StateContext)
  const { selectedOutfitDispatch } = useContext(DispatchContext)
  const { setEditMode } = useContext(MethodContext)
  const classes = useStyles();
  const theme = useTheme();
  const { name } = selectedOutfit
  // const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setEditMode(true);
  };

  const handleDrawerClose = () => {
    setEditMode(false);
  };

  const handleChangeName = ({target: {value} }) => {
    selectedOutfitDispatch({type: 'EDIT_NAME', payload: value})
  }

  return (
    <div className={classes.root}>
      <CssBaseline /> 
        {/* <Toolbar>
          <Button
            color="primary"
            backgroundColor='primary'
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            variant='outlined'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            Create Outfit
        </Button> 
        </Toolbar> */}

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: editMode,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, editMode && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
      
          <Button
            color="primary"
            // backgroundColor='primary'
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            variant='outlined'
            className={clsx(classes.menuButton, editMode && classes.hide)}
          >
            Create Outfit
        </Button> 
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
          <form noValidate autoComplete="off">
            <TextField 
            id="standard-basic" 
            label='Edit Outfit Name' 
            value={name}
            onChange={handleChangeName}  />
          </form>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.itemDisplay}>
          <DrawerContainer />
        </div>
        {/* <List>
          <ItemCard />
        </List>
        <Divider />
        <List>
          <ItemCard />
        </List>
        <Divider />
        <List>
          <ItemCard />
        </List> */}
      </Drawer>
    </div>
  );
}

