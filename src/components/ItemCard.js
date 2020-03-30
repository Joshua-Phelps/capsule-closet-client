import React, { useContext } from 'react'
import { StateContext } from '../App'
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
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  centered: {
    display: 'block'
  }
}));

export default function ItemCard({item, handleClick, buttonText}) {
  const classes = useStyles();
  const { image, id, category } = item 
 
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
        </CardContent>
        <CardActions className={classes.centered}>
          <Button onClick={() => handleClick(id)} size="small">{buttonText}</Button>
        </CardActions>
      </Card>    
    </>
  );
}