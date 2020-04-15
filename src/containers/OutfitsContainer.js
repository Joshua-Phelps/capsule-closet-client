import React, { useContext } from 'react'
import { StateContext, MethodContext, DispatchContext } from '../App'
import { Grid, makeStyles, Paper, Fab, Typography, AppBar, Button, Toolbar } from '@material-ui/core';
import OutfitCard from '../components/OutfitCard';
import EditIcon from '@material-ui/icons/Edit';
import ItemDisplayModal from '../components/ItemDisplayModal';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingTop: theme.spacing(3)
    }, 
  paper: {
    padding: theme.spacing(1),
  },
  extendedIconRight: {
    marginRight: '-90%',
  },
  extendedIcon: {
    marginTop: theme.spacing(1),
    width: '100%',
    height: '3vh'
  },
  iconText: {
    position: 'absolute'
  },
  appBar: {
    marginTop: '48px',
  }
}))

export default function OutfitContainer({ history }){
  const classes = useStyles()
  const { outfits } = useContext(StateContext)
  const { setEditMode, setNavBarValue } = useContext(MethodContext)
  const { selectedOutfitDispatch } = useContext(DispatchContext)

  const handleEdit = outfit => {
    setEditMode(true)
    selectedOutfitDispatch({type: 'SELECT_OUTFIT', payload: outfit})
    history.push('/closet')
    setNavBarValue(1)
  }

  const handleCreate = () => {
    setEditMode(true)
    history.push('/closet')
    setNavBarValue(1)
  }

  const renderOufits = () => {
    return outfits.map(outfit => {
      return (
        <Grid className={classes.root} key={outfit.id} item xs={3} >
          <Paper className={classes.paper}>
            <OutfitCard outfit={outfit} />
            <Fab 
            onClick={() => handleEdit(outfit)} 
            className={classes.extendedIcon} 
            variant="extended" 
            color="secondary" 
            aria-label="edit">
              {/* <EditIcon className={extendedIconRight} /> */}
              <Typography className={classes.iconText}>Edit</Typography>
            </Fab>
          </Paper>
        </Grid>
      )
    })
  }

  return (
    <div className={classes.root}>
      <ItemDisplayModal />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Button            
                color="inherit"
                variant="outlined" 
                aria-label="open drawer"
                edge="start"
                onClick={handleCreate}
                >
                Create Outfit
          </Button>
        </Toolbar>
      </AppBar>
      <Grid className={classes.appBar} container spacing={3}>
        {renderOufits()}                            
      </Grid>                       
    </div>
  )
} 