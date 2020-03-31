import React, { useContext, useState } from 'react'
import { StateContext, MethodContext } from '../App'
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import ItemCard from './ItemCard';

const useStyles = makeStyles({
  heading: {
    textAlign: 'center'
  }
})

export default function DrawerCategoryr({ category }){
  const { heading } = useStyles()
  const { selectedOutfit } = useContext(StateContext)
  const { filterItemsByOutfit, removeItem } = useContext(MethodContext)
  const [open, setOpen] = useState(true)
  const items = filterItemsByOutfit(selectedOutfit)
  

  const renderItems = () => {
    const itemsByCategory = items.filter(item => item.category === category)
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