import React, { useContext } from 'react'
import { StateContext, MethodContext } from '../App'
import { Grid, makeStyles } from '@material-ui/core'
import OutfitDrawer from '../components/OutfitDrawer'
import CategoryFilter from '../components/CategoryFilter'
import ItemCard from '../components/ItemCard'
import SubCategoryFilter from '../components/SubCategoryFilter'
import clsx from 'clsx'

// import Paper from '@material-ui/core/Paper';
// import ItemForm from '../components/ItemForm'

const itemsURL = "http://localhost:3000/items"

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      width: '100%'
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
  // marginLeft: -drawerWidth,
    width: '100%',
    marginTop: '70px', 
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
    justifyContent: 'flex-end',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawerHeader: {
    display: 'block',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  items: {
    maxWidth: '100%'
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
    const classes = useStyles()
    const {editMode, items, selectedOutfit, categoryNavBarValue} = useContext(StateContext)
    const { addItem, removeItem, closetDisplayedItems } = useContext(MethodContext)
    // const displayedItems = items.filter(item => item.category.includes(categoryNavBarValue)) 
    
    const renderItems = () => {
      return closetDisplayedItems.map(item => {
        if (!selectedOutfit.items.includes(item.id)){
          return (
            <Grid 
            key={item.id} 
            item xs={3} 
            >
              <ItemCard 
              item={item} 
              buttonText='Add to Outfit' 
              handleClick={addItem} 
              />
            </Grid>)
        } else {
          return (
            <Grid 
            key={item.id} 
            item xs={3} 
            >
              <ItemCard 
              item={item} 
              buttonText='Remove from Outfit' 
              handleClick={removeItem} />
            </Grid>)
        }
      })
    }
    
    return (
       <Grid className={classes.root} container spacing={3}>           
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: editMode,
            })}
            >
            <OutfitDrawer />

            <CategoryFilter/>  
            {/* <br></br>  */}
            {/* <SubCategoryFilter />              */}
            <Grid container spacing={4}>
              {renderItems()}
            </Grid>         
          </main>                    
       </Grid>          
  )
} 

