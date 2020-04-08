import React, { useContext, useState, useEffect, useRef } from 'react'
import { StateContext, MethodContext } from '../App'
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import ItemCard from './ItemCard';

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'center',
    padding: '8px'
  },
  colorHeading: {
    background: theme.palette.primary.gradient,
  },
}))

export default function DrawerCategory({ category }){
  const { heading, colorHeading } = useStyles()
  const { selectedOutfit, newOutfitItemCategory } = useContext(StateContext)
  const { filterItemsByOutfit, removeItem, categoryItems } = useContext(MethodContext)
  const [open, setOpen] = useState(true)
  const myRef = useRef(null)
  const items = (() => {
  const outfitItems = filterItemsByOutfit(selectedOutfit)
    return categoryItems(category, outfitItems)
  })()
  const totalItemsDisplay = items.length > 0 && ` - ${items.length}`

  useEffect(() => {
    if (newOutfitItemCategory === (category) || ( newOutfitItemCategory === category + '2')){ 
      setOpen(true)
      myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
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
    <Grid item xs={12} ref={myRef}>
      <Typography 
      onClick={toggleOpen} 
      className={clsx(heading, {[colorHeading]: totalItemsDisplay})}
      >
        <span>{category}</span>
        <span>{totalItemsDisplay}</span>
      </Typography>
      <Divider />
      {open && renderItems() }
    </Grid>
  )
} 