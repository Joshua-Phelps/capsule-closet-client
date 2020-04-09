import React, { useContext, useState, useEffect, useRef } from 'react'
import { StateContext, MethodContext } from '../App'
import { Grid, makeStyles, Divider, Typography, Badge } from '@material-ui/core';
import clsx from 'clsx';
import ItemCard from './ItemCard';

const useStyles = makeStyles(theme => ({
  heading: {
    padding: '8px'
  },
  colorHeading: {
    background: theme.palette.primary.gradient,
  },
  leftText: {
    textAlign: 'left',
    paddingLeft: '10px'
  },
  rightText: {
    textAlign: 'right',
    paddingRight: '10px'
  }
}))

export default function DrawerCategory({ category }){
  const classes = useStyles()
  const { selectedOutfit, newOutfitItemCategory } = useContext(StateContext)
  const { filterItemsByOutfit, removeItem, categoryItems } = useContext(MethodContext)
  const [open, setOpen] = useState(true)
  const myRef = useRef(null)
  const items = (() => {
    const outfitItems = filterItemsByOutfit(selectedOutfit)
    return categoryItems(category, outfitItems)
  })()

  useEffect(() => {
    if (newOutfitItemCategory === (category) || ( newOutfitItemCategory === category + '2')){ 
      setOpen(true)
      myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [newOutfitItemCategory])
  
  const renderItems = () => {
    if (items.length > 0){
      return items.map(item => {       
        return <Grid key={item.id} item xs={12}><ItemCard buttonText={'Remove From Outfit'} handleClick={removeItem} item={item} /><Divider /></Grid>
      })
    } 
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <Grid 
      item 
      container 
      className={clsx(classes.heading, {[classes.colorHeading]: items.length > 0})} 
      xs={12} 
      ref={myRef}
      onClick={toggleOpen} 
    >
      <Grid item xs={6}>
        <Typography className={classes.leftText}>{category}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Badge className={classes.rightText} color="secondary" badgeContent={items.length}></Badge>
      </Grid>
      <Divider />
      {open && renderItems() }
    </Grid>
  )
} 