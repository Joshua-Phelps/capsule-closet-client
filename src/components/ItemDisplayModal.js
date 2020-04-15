import React, { useContext } from 'react';
import { StateContext, MethodContext, DispatchContext } from '../App'
import { 
  makeStyles, 
  Modal, 
  Backdrop, 
  Fade, 
  Grid, 
  GridListTile, 
  GridList, 
  GridListTileBar,
  Button 
} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50vw', 
    height: '70vh',
    margin: 'auto'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '50vw', 
    height: '70vh'
  },
  image: {
    // height: '100%',
    width: '100%'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  button: {
    height: '100%',
  },
  gridCenter: {
    overflowY: 'auto',
    height: '100%'
  }
}));

export default function ItemDisplayModal() {
  const classes = useStyles();
  const { itemDisplayModal, modalItems } = useContext(StateContext)
  const { setItemDisplayModal } = useContext(MethodContext)
  const { modalItemsDispatch } = useContext(DispatchContext)
  const item = modalItems.current
  
  const currentIndex = modalItems.items.findIndex(currItem => currItem === item)

  const handleClose = () => setItemDisplayModal(false)

  const handleNext = () => {
    let nextItem = (currentIndex+1 >= modalItems.items.length) ? modalItems.items[0] : modalItems.items[currentIndex+1]
    modalItemsDispatch({type: 'SET_CURRENT', payload: nextItem})
  }

  const handlePrevious = () => {
    let prevItem = currentIndex === 0 ? modalItems.items[modalItems.items.length-1] : modalItems.items[currentIndex-1]
    modalItemsDispatch({type: 'SET_CURRENT', payload: prevItem})
  }

  return (
    <div>
      <div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={itemDisplayModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={itemDisplayModal}>

          <div className={classes.paper}>
            <div  className={classes.root}>
              <Grid container>
                <Grid item xs={1}>
                  <Button onClick={handlePrevious} className={classes.button}>
                    <ArrowBackIosIcon />
                  </Button>
                </Grid>
                <Grid className={classes.gridCenter} item xs={10}>
                  <img className={classes.image} src={item.image} />
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={handleNext} className={classes.button}>
                    <ArrowForwardIosIcon />
                  </Button>
                </Grid>
              </Grid>
              <Grid item >
                <Button>Edit</Button>                     
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}