import React from 'react'
import { 
    makeStyles, 
    Card, 
    CardActions, 
    CardContent, 
    Button, 
    Typography,
    CardMedia 
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

export default function ItemCard({ item, handleClick }) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Black T-Shirt
        </Typography>
        <CardMedia
        className={classes.media}
        image="https://chilledworld.com/image/cache/Women's%20T-Shirts/Aesthetic_BLACK-LADIES-TSHIRT-600x600.jpg"
      />
      </CardContent>
      <CardActions className={classes.centered}>
        <Button onClick={() => handleClick(item.id)} size="small">Remove from Outfit</Button>
      </CardActions>
    </Card>
  );
}