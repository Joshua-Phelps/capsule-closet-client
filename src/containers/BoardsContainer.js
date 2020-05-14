import React, { useContext } from 'react'
import { StateContext, MethodContext, DispatchContext } from '../App'
import { Grid, makeStyles, Paper, Fab, Typography, AppBar, Button, Toolbar, Container } from '@material-ui/core';
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

  boardTitle: {
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
    position: 'fixed'
  },
  outfitContainer: {
    marginTop: '100px'
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
        <Grid className={root, classes.outfitContainer} key={board.id} item xs={3} >
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
          // onClick={handleCreate}
          >
          Create Board
        </Button>
        <h3 className={classes.boardTitle}>My Boards</h3>
      </Container>

      <Grid className={classes.appBar} container spacing={3}>
        {renderBoards()}                            
      </Grid>                       
    </div>
  )
} 