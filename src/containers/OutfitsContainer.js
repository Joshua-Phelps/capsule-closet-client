import React, { useContext } from 'react'
import { StateContext, MethodContext, DispatchContext } from '../App'
import { Grid, makeStyles, Paper, Fab, Typography, AppBar, Button, Toolbar, Container } from '@material-ui/core';
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
    height: '5vh',
    '&:hover': {
      backgroundColor: '#cbc478'
    }
  },
  iconText: {
    position: 'absolute'
  },
  appBar: {
    marginTop: '48px',
    position: 'absolute'
  },
  container: {
    marginTop: '48px',
  },
  outfitTitle: {
    gridColumn: '6',
    textAlign: 'center',
    fontSize: '28px',
    textTransform: 'uppercase',
    marginTop: '0px',
    marginBottom: '0px',
    alignSelf: 'center'
  },
  gridStyles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, auto)',
    gridTemplateRows: 'repeat(2, 40px)',
    gridGap: '20px',
    marginTop: '20px',
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
        <Grid className={classes.root} key={outfit.id} item xs={12} sm={3} >
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
      {/* <AppBar className={classes.appBar}>
        <Toolbar>
          
        </Toolbar>
      </AppBar> */}
      <Container className={classes.gridStyles}>

          <Button            
            color="inherit"
            variant="outlined" 
            aria-label="open drawer"
            edge="start"
            onClick={handleCreate}
            >
            Create Outfit
          </Button>
          <h3 className={classes.outfitTitle}>My Outfits</h3>
      </Container>
      <Grid className={classes.container} container spacing={2}>
        {renderOufits()}                            
      </Grid>                       
    </div>
  )
} 