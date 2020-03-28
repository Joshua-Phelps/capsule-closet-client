import React, { useContext } from 'react';
import { StateContext, MethodContext } from '../App'
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
    IconButton
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
}));

export default function OutfitDrawer() {

  const { editMode, selectedOutfit } = useContext(StateContext)
  const { setEditMode } = useContext(MethodContext)
  const classes = useStyles();
  const theme = useTheme();
  // const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setEditMode(true);
  };

  const handleDrawerClose = () => {
    setEditMode(false);
  };

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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <DrawerContainer />
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

