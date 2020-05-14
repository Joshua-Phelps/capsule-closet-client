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
    background: '#accacc',
  },
  leftText: {
    textAlign: 'left',
    paddingLeft: '10px'
  },

  catGroup: {
    marginTop: '8px',
    marginBottom: '2px'
  },
  catTop: {
    // margin: '10px!important'
  },
  badge: {
    marginTop: '12px!important'
  },
  outfitDrawerCard: {
    //border: 'solid 2px #e0e0e0!important',
    '&:hover': {
      border: 'solid 1px #d6e286!important'
    }
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
        return <Grid key={item.id} item xs={12}><ItemCard className={classes.outfitDrawerCard} buttonText={'Remove From Outfit'} handleClick={removeItem} item={item} /><Divider /></Grid>
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
      <Grid className={classes.catGroup} item xs={11}>
        <Typography className={classes.leftText}>{category}</Typography>
      </Grid>
      <Grid className={classes.catTop} item xs={1}>
        <Badge className={classes.badge} color="secondary" badgeContent={items.length}></Badge>
      </Grid>
      <Divider />
      {open && renderItems() }
    </Grid>
  )
} 