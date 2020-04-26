
import React, { useContext } from 'react'
import AddItemModal from '../components/AddItemModal'
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
    margin: theme.spacing(3)
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
  const { image, id, category, sub_category, recommended} = item 


  return (
    <>     
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {category}
          </Typography>
          <CardMedia
          className={classes.media}
          image={image}
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

