
import React, { useState, useContext }from 'react'
import { StateContext, MethodContext, DispatchContext } from '../App'
// import AddItemModal from '../components/AddItemModal'
import { 
    makeStyles, 
    Card, 
    CardActions, 
    CardContent, 
    Button, 
    Typography,
    CardMedia,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
    // added styling below to size images and cards
    // textAlign: "center",
    // minWidth: 300,
    // minHeight: "100%"
  },
  title: {
    fontSize: 14,
  },
  media: {
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain'
  },
  centered: {
    display: 'block'
  },
  cardActions: {
    textAlign: 'center',
    display: 'block',
    backgroundColor: 'palegoldenrod',
    width: '100%',
    padding: '10px',
    borderRadius: '0'
  },
  subcat: {
    textAlign: 'center',
    fontSize: '.7rem',
    textTransform: 'uppercase',
    letterSpacing:'2px',
    padding: '6px',
    margin: '10px',
    marginTop: '4px',
    border: 'solid 1px #cabc2f'
  },
  cardContent:{
    padding: '8px'
  }
}));

export default function ItemCard({item, handleClick, buttonText, recommendedText}) {
  const classes = useStyles();
  // const { setEditMode, setOpenItemModal } = useContext(MethodContext)
  const { setItemDisplayModal, closetDisplayedItems} = useContext(MethodContext)
  const { itemDisplayModal } = useContext(StateContext)
  const { modalItemsDispatch } = useContext(DispatchContext)
  const { image, avatar, id, category, sub_category, recommended} = item 
  const closetItemIds = closetDisplayedItems.map(item => item.id) || []


  const handleClothesClick = () => {
    setItemDisplayModal(!itemDisplayModal)
    modalItemsDispatch({type: 'SET_ITEMS', payload: {itemIds: closetItemIds, current: item.id}})
  }

  return (
    <>     
      <Card className={classes.root} variant="outlined" >
        <CardContent className={classes.cardContent}>
          {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
            {category}
          </Typography> */}
           <Typography className={classes.title, classes.subcat} color="textSecondary" gutterBottom>
            {sub_category}
          </Typography>
          
          <CardMedia
          className={classes.media}
          image={avatar.url}
          onClick={handleClothesClick}
          />
          {/* <img
            src={image}
            alt="clothes"
            className="clothes-image"
            // onClick={() => setOpenItemModal(true)}
          /> */}
         
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {recommendedText}{recommended}
          </Typography>
        </CardContent>
        {/* <CardActions className={classes.centered, classes.cardActions}> */}
          <Button  className={classes.centered, classes.cardActions} onClick={() => handleClick(id)} size="small">{buttonText}</Button>
          {/* {choiceClick(id)} */}
        {/* </CardActions> */}
      </Card>    
    </>
  );
}

