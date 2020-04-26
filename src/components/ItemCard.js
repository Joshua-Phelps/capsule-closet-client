
import React, { useContext } from 'react'
import AddItemModal from '../components/AddItemModal'
// import { StateContext, MethodContext } from '../App'
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
    textAlign: "center",
    minWidth: 300,
    minHeight: "100%"
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
  const { image, id, category, sub_category, recommended} = item 

  // const choiceClick = (id) => {
  //   if (buttonText === 'Add to Closet') {
  //     return <AddItemModal />
  //   } else {
  //     return <Button onClick={() => handleClick(id)} size="small">{buttonText}</Button>
  //   }
  // }

  return (
    <>     
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {category}
          </Typography>
          {/* <CardMedia
          className={classes.media}
          image={image}
          /> */}
          <img
            src={image}
            alt="clothes"
            className="clothes-image"
            // onClick={() => setOpenItemModal(true)}
          />
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

