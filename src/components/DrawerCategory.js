import React, { useContext, useState, useEffect } from 'react'
import { StateContext, MethodContext } from '../App'
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import ItemCard from './ItemCard';

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'center'
  },
  colorHeading: {
    background: theme.palette.primary.gradient
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}))

export default function DrawerCategory({ category }){
  const { heading, colorHeading } = useStyles()
  const { selectedOutfit, newOutfitItemCategory } = useContext(StateContext)
  const { filterItemsByOutfit, removeItem, categoryItems } = useContext(MethodContext)
  const [open, setOpen] = useState(true)
  // const outfitItems = filterItemsByOutfit(selectedOutfit)
  const items = (() => {
    const outfitItems = filterItemsByOutfit(selectedOutfit)
    return categoryItems(category, outfitItems)
  })()
  const totalItemsDisplay = items.length > 0 && ` - ${items.length}`


  useEffect(() => {
    if (newOutfitItemCategory === (category) || ( newOutfitItemCategory === category + '2')) setOpen(true)
  }, [newOutfitItemCategory])
  

  const renderItems = () => {
    if (items.length > 0) 
    return items.map(item => {       
      return <Grid key={item.id} item xs={12}><ItemCard buttonText={'Remove From Outfit'} handleClick={removeItem} item={item} /><Divider /></Grid>
    })
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <Grid className={clsx(heading, {[colorHeading]: totalItemsDisplay})} item xs={12}>
      <Typography 
      onClick={toggleOpen} 
      // className={clsx(heading, {[colorHeading]: totalItemsDisplay})}
      >
        {category}{totalItemsDisplay}
      </Typography>
      <Divider />
      {open && renderItems() }
    </Grid>
  )
} 