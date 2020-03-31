import React, { useContext, useEffect } from 'react'
import { StateContext, MethodContext } from '../App'
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import ItemCard from '../components/ItemCard';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      // paddingLeft: theme.spacing(8),
      // paddingRight: theme.spacing(8),
      paddingTop: theme.spacing(3)
    },
  heading: {
    textAlign: 'center'
  }
}))

export default function DrawerContainer(){
  const { root, heading } = useStyles()
  const { selectedOutfit, categories } = useContext(StateContext)
  const { filterItemsByOutfit, removeItem } = useContext(MethodContext)
  const items = filterItemsByOutfit(selectedOutfit)
  
  // const renderItems = () => {
  //   return items.map(item => {       
  //     return <Grid key={item.id} item xs={12}><ItemCard buttonText={'Remove From Outfit'} handleClick={removeItem} item={item} /><Divider /></Grid>
  //   })
  // }

  const renderItems = (category) => {
    const itemsByCategory = items.filter(item => item.category === category)
    return itemsByCategory.map(item => {       
      return <Grid key={item.id} item xs={12}><ItemCard buttonText={'Remove From Outfit'} handleClick={removeItem} item={item} /><Divider /></Grid>
    })
  }

  const renderCategoriesAndItems = () => {
    return categories.map(category => {
      return (
        <Grid item xs={12}>
          <Typography className={heading}>{category}</Typography>
          <Divider />
          {renderItems(category)}
        </Grid>
      )
    })
  }

  return (
    <div className={root}>
        <Grid container spacing={1}> 
          {renderCategoriesAndItems()}
        </Grid>                       
    </div>
  )
} 