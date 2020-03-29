import React, {useState, useContext} from 'react'
import { StateContext } from '../App'
import { Container, Grid, Drawer, Button, makeStyles } from '@material-ui/core'
import OutfitDrawer from '../components/OutfitDrawer'
import CategoryFilter from '../components/CategoryFilter'
import ItemCard from '../components/ItemCard'
import AddItemModal from '../components/AddItemModal'
import clsx from 'clsx'

import Paper from '@material-ui/core/Paper';
import ItemForm from '../components/ItemForm'

const itemsURL = "http://localhost:3000/items"

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({

    root: {
        flexGrow: 1,
      }, 
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop: '120px', 
    textAlign: 'left',
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'block',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
}))


//get this user's closet items
//need to fix URL to get user's items
const getItems = () => {
    fetch(itemsURL)
    .then(response => response.json())
    .then(data => console.log(data))
    // send to everyItem function
}

//post an item to this user's closet items (action comes from modal)
const postItem = (item) => {
    fetch(itemsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
           
        })
    })
}

//iterate over all items for this specific user and create an ItemCard for them
const everyItem = () => {

}

export default function ClosetContainer(){
    const [open, setOpen] = useState(true)
    const classes = useStyles()
    const {editMode, items} = useContext(StateContext)
    

    return (
    <div className={classes.root}>
       <Grid container spacing={3}>
            <OutfitDrawer />
            
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: editMode,
                })}
            >
               
                <CategoryFilter/>
                
                <Grid container spacing={4}>
                    <Grid item xs={6} >
                        {/* <ItemCard item={items[0]}/> */}
                    </Grid>                                    
                </Grid>
                </main>
                    
                 </Grid>
                 

        
    </div>
    )
} 

