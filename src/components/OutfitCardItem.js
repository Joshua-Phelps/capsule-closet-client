import React, { useState }from 'react'
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

export default function OutfitCardItem({ item }) {
  const [hover, setHover] = useState(false)
  const classes = useStyles()
  const { image, sub_category, id, category } = item 
  const showHover = () => setHover(true) 
  const hideHover = () => setHover(false)

  const handleClick = () => {
    //show item Modal
  }

  return (
    <GridListTile 
    onMouseEnter={showHover}
    onMouseLeave={hideHover} 
    key={id}
    style={{height: '180px'}}
    >
    <img src={image} alt={category} />

      <GridListTileBar
        title={sub_category}
        subtitle={category}
        className={clsx(classes.show, {[classes.hide]: !hover})}
        onClick={handleClick}
      />
    </GridListTile>
  );
}