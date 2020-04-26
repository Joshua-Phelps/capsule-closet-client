
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
  }
}));

export default function ItemCard({item, handleClick, buttonText, recommendedText}) {
  const classes = useStyles();
  // const { setEditMode, setOpenItemModal } = useContext(MethodContext)
  const { setItemDisplayModal} = useContext(MethodContext)
  const { itemDisplayModal } = useContext(StateContext)
  const { modalItemsDispatch } = useContext(DispatchContext)
  const { image, id, category, sub_category, recommended} = item 

  // const choiceClick = (id) => {
  //   if (buttonText === 'Add to Closet') {
  //     return <AddItemModal />
  //   } else {
  //     return <Button onClick={() => handleClick(id)} size="small">{buttonText}</Button>
  //   }
  // }

  const handleClothesClick = () => {
    setItemDisplayModal(!itemDisplayModal)
    // modalItemsDispatch({type: 'SET_ITEMS', payload: {itemIds: item, current: item.id}})
  }

  return (
    <>     
      <Card className={classes.root} variant="outlined" onClick={handleClothesClick}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {category}
          </Typography>
          <CardMedia
          className={classes.media}
          image={image}
          // onClick={handleClothesClick}
          />
          {/* <img
            src={image}
            alt="clothes"
            className="clothes-image"
            // onClick={() => setOpenItemModal(true)}
          /> */}
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {sub_category}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {recommendedText}{recommended}
          </Typography>
        </CardContent>
        <CardActions className={classes.centered}>
          <Button onClick={() => handleClick(id)} size="small">{buttonText}</Button>
          {/* {choiceClick(id)} */}
        </CardActions>
      </Card>    
    </>
  );
}

