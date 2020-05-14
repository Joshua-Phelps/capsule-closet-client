import React, { useState, useContext }from 'react'
import { StateContext, MethodContext, DispatchContext } from '../App'
import { makeStyles, GridListTile, GridListTileBar } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  show: {
    display: 'block',
    textAlign: 'center'
  },
  hide: {
    display: 'none'
  }
}));

export default function OutfitCardItem({ item, outfit }) {
  const [hover, setHover] = useState(false)
  const { setItemDisplayModal, filterItemsIdsByOutfit } = useContext(MethodContext)
  const { itemDisplayModal } = useContext(StateContext)
  const { modalItemsDispatch } = useContext(DispatchContext)
  const classes = useStyles()
  const { image, sub_category, id, category, avatar } = item 
  const showHover = () => setHover(true) 
  const hideHover = () => setHover(false)

  const handleClick = () => {
    setItemDisplayModal(!itemDisplayModal)
    modalItemsDispatch({type: 'SET_ITEMS', payload: {itemIds: outfit.items, current: item.id}})
  }

  return (
    <GridListTile 
    onMouseEnter={showHover}
    onMouseLeave={hideHover} 
    onClick={handleClick}
    key={id}
    style={{height: '180px'}}
    >
    <img src={avatar ? avatar.url : image} alt={category} />

      <GridListTileBar
        title={sub_category}
        subtitle={category}
        className={clsx(classes.show, {[classes.hide]: !hover})}
        onClick={handleClick}
      />
    </GridListTile>
  );
}