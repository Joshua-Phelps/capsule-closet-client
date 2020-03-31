import React, { useContext, useState, useEffect } from 'react'
import { StateContext, MethodContext } from '../App'
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import ItemCard from './ItemCard';

const useStyles = makeStyles({
  heading: {
    textAlign: 'center'
  }
})

export default function DrawerCategory({ category }){
  const { heading } = useStyles()
  const { selectedOutfit, newOutfitItemCategory } = useContext(StateContext)
  const { filterItemsByOutfit, removeItem } = useContext(MethodContext)
  const [open, setOpen] = useState(true)
  const items = filterItemsByOutfit(selectedOutfit)

  useEffect(() => {
    if (newOutfitItemCategory === category) setOpen(true)
  }, [newOutfitItemCategory])
  

  const renderItems = () => {
    const itemsByCategory = items.filter(item => item.category === category)
    if (itemsByCategory.length > 0) 
    return itemsByCategory.map(item => {       
      return <Grid key={item.id} item xs={12}><ItemCard buttonText={'Remove From Outfit'} handleClick={removeItem} item={item} /><Divider /></Grid>
    })
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <Grid item xs={12}>
      <Typography onClick={toggleOpen} className={heading}>{category}</Typography>
      <Divider />
      {open && renderItems() }
    </Grid>
  )
} 