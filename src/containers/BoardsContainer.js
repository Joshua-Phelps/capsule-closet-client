import React, { useContext } from 'react'
import { StateContext, MethodContext, DispatchContext } from '../App'
import { Grid, makeStyles, Paper, Fab, Typography, AppBar, Button, Toolbar } from '@material-ui/core';
import BoardCard from '../components/BoardCard';
import EditIcon from '@material-ui/icons/Edit';

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
    position: 'absolute'
  }
}))

export default function BoardsContainer({ history }){
  const classes = useStyles()
  const { paper, root, extendedIcon, iconText } = useStyles()
  const { boards } = useContext(StateContext)
  const { setEditMode, setNavBarValue, setEditModeAndWindow } = useContext(MethodContext)
  const { selectedOutfitDispatch } = useContext(DispatchContext)

  // const handleEdit = outfit => {
  //   setEditMode(true)
  //   // setEditModeAndWindow(true)
  //   selectedOutfitDispatch({type: 'SELECT_OUTFIT', payload: outfit})
  //   // window.scrollTo(0, 48)
  //   history.push('/closet')
  //   setNavBarValue(1)
  // }

  const renderBoards = () => {
    return boards.map(board => {
      return (
        <Grid className={root} key={board.id} item xs={3} >
          <Paper className={paper}>
            <BoardCard board={board} />
            <Fab 
            // onClick={() => handleEdit(outfit)} 
            className={extendedIcon} 
            variant="extended" 
            color="secondary" 
            aria-label="edit">
              {/* <EditIcon className={extendedIconRight} /> */}
              <Typography className={iconText}>Edit</Typography>
            </Fab>
          </Paper>
        </Grid>
      )
    })
  }

  return (
    <div className={classes.root}>
      {/* <ItemDisplayModal /> */}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Button            
                color="inherit"
                variant="outlined" 
                aria-label="open drawer"
                edge="start"
                // onClick={handleCreate}
                >
                Create Board
          </Button>
        </Toolbar>
      </AppBar>
      <Grid className={classes.appBar} container spacing={3}>
        {renderBoards()}                            
      </Grid>                       
    </div>
  )
} 