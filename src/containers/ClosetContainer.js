import React, {useState, useContext} from 'react'
import { StateContext } from '../App'
import { Container, Grid, Drawer, makeStyles } from '@material-ui/core';
import OutfitDrawer from '../components/OutfitDrawer';
import ItemCard from '../components/ItemCard'
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';



const drawerWidth = 300;
const useStyles = makeStyles(theme => ({

    root: {
        flexGrow: 1,
      }, 
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop: '120px', 
    textAlign: 'left',
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'block',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
}))

export default function ClosetContainer(){
    const [open, setOpen] = useState(true)
    const classes = useStyles()
    const {editMode, items} = useContext(StateContext)
    

    return (
    <div className={classes.root}>
       <Grid container spacing={3}>
            <OutfitDrawer />
            
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: editMode,
                })}
            >
                
                <Grid container spacing={4}>
                    <Grid item xs={6} >
                        {/* <ItemCard item={items[0]}/> */}
                    </Grid>
                    
                    <Grid item xs={6} ><Paper className={classes.paper}>xs=12</Paper></Grid>

                    <Grid item xs ><Paper className={classes.paper}>xs=12</Paper></Grid>
                    </Grid>
                </main>
                    
                 </Grid>

           
                

        {/* <Grid container spacing={3}>
            
                <Grid item xs={1} style={{marginTop: '120px', textAlign: 'left', border: 'solid 1px black'}}> <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                
                <Grid item xs={1} style={{marginTop: '120px', textAlign: 'left', border: 'solid 1px black'}}> <Paper className={classes.paper}>xs=12</Paper></Grid>

                <Grid item xs={1} style={{marginTop: '120px', textAlign: 'left', border: 'solid 1px black'}}> <Paper className={classes.paper}>xs=12</Paper></Grid>
            
        </Grid> */}
    </div>
    )
} 

