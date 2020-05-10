import React, { useContext } from 'react';
import { StateContext, MethodContext, DispatchContext } from '../App'
import { 
  makeStyles, 
  Modal, 
  Backdrop, 
  Fade, 
  Grid, 
  Typography,
  Button,
  Paper
} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  container: {
    width: '50vw', 
    // height: '70vh',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  image: {
    height: '60vh',
  },
  button: {
    height: '100%',
    width: '100%',

  },
  gridCenter: {
    // overflowY: 'auto',
    height: '100%',
    textAlignLast: 'center',
  },

  modalHeader: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto auto',
    gridGap: '10px',
    borderRadius: '20px',
    backgroundColor: 'palegoldenrod',
    padding: '4px 12px',
    marginBottom: '10px'
  },

  modalHeaderSubCat: {
    gridColumnStart: '1',
  },
  modalHeaderCat: {
    gridColumnStart: '3',
    textAlign: 'right'
  },
  modalHeaderCount: {
    gridColumnEnd: '-1'
  },

  modalHeaderStyles: {
    fontSize: '0.8rem',
    textTransform: 'uppercase'
  },
  rightButton: {
    textAlign: 'right'
  },
  modalButton: {
    backgroundColor: 'lightgrey'
  }
}));

export default function ItemDisplayModal() {
  const classes = useStyles();
  const { itemDisplayModal, modalItems, items } = useContext(StateContext)
  const { setItemDisplayModal, getItemOutfits } = useContext(MethodContext)
  const { modalItemsDispatch } = useContext(DispatchContext)
  const item = items.filter(item => item.id === modalItems.current)[0] || {id: null}
  const currentIndex = modalItems.items.findIndex(currItem => currItem === item.id)
  const outfits = getItemOutfits(item.id)

  const handleClose = () => setItemDisplayModal(false)

  const handleNext = () => {
    let nextItem = (currentIndex+1 >= modalItems.items.length) ? modalItems.items[0] : modalItems.items[currentIndex+1]
    modalItemsDispatch({type: 'SET_CURRENT', payload: nextItem})
  }

  const handlePrevious = () => {
    let prevItem = currentIndex === 0 ? modalItems.items[modalItems.items.length-1] : modalItems.items[currentIndex-1]
    modalItemsDispatch({type: 'SET_CURRENT', payload: prevItem})
  }

  const handleEdit = () => {

  }

  const renderOutfits = () => {
    if (outfits.length === 1 ){
      return `Currently in 1 outfit`
    } else {
      return `Currently in ${outfits.length} outfits`
    }
  }
  

  return (
    <div>
      {item && <Modal
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
          <Paper className={classes.container}>
          <Grid container >
          <Grid className={classes.modalHeader} item xs={12}>
              <Typography className={classes.modalHeaderSubCat, classes.modalHeaderStyles}>
                {item.sub_category} |
              </Typography >
              <Typography className={classes.modalHeaderCat, classes.modalHeaderStyles}>
                 {item.category} 
              </Typography>
              <Typography className={classes.modalHeaderCount, classes.modalHeaderStyles}>
                {renderOutfits()}
              </Typography>
            </Grid>
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
            
            <Grid item xs={6}>
              <Button className={classes.modalButton}>Add to Outfit</Button>
            </Grid>
            <Grid className={classes.rightButton}item xs={6}>
              <Button className={classes.modalButton} onClick={handleEdit}>
                Edit Item
              </Button>
            </Grid>
            {/* <Grid item xs={3}>
              <Button onClick={handleEdit} className={classes.edit}>
                EDIT
              </Button>
            </Grid> */}
          </Grid>
          </Paper>
        </Fade>
      </Modal>}
    </div>
  );
}