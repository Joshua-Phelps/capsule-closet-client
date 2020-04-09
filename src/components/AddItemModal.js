import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import ItemForm from './ItemForm'
import { StateContext, MethodContext } from '../App'
import { Button } from '@material-ui/core'
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const {openItemModal} = useContext(StateContext) 
  const {setOpenItemModal} = useContext(MethodContext)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpenItemModal(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add an Item to your Closet</h2>
      <p id="simple-modal-description">
        Enter the details of your item below:
      </p>
      <ItemForm guideItem={props.item}/>
      {/* <SimpleModal /> */}
      {/* <Button
        variant="outlined" 
        onClick={handleClose}
        >Add Item
      </Button> */}
      <Button
        type="button"
        variant="outlined" 
        onClick={handleClose}
        >Close
      </Button>
    </div>
  );
  return (
    <div>
      {/* <Button 
        type="button" 
        onClick={handleOpen}
        variant="outlined" 
        color="inherit"
        // backgroundColor='secondary'
        >
        Add Item to Closet
      </Button> */}
      <Modal
        open={openItemModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}