import React, { useContext } from 'react'
import { StateContext } from '../App'
import { Grid, makeStyles } from '@material-ui/core';
import OutfitCard from '../components/OutfitCard';



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
  const classes = useStyles()
  const { outfits } = useContext(StateContext)

  const renderOufits = () => {
    return outfits.map(outfit => {
      return <OutfitCard />
    })
  }

  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
              <Grid item xs={6} >
        
              </Grid>                                
        </Grid>                       
    </div>
  )
} 