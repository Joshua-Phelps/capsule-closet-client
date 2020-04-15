import React, { useContext }from 'react'
import { MethodContext } from '../App'
import { makeStyles, GridList, GridListTile, ListSubheader } from '@material-ui/core'
import OutfitCardItem from './OutfitCardItem'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '50vh',
  }
}));

export default function OutfitCard({ outfit }) {
  const classes = useStyles()
  const { filterItemsByOutfit } = useContext(MethodContext)
  const { name } = outfit 
  const items = filterItemsByOutfit(outfit)

  const renderTiles = () => {
    return items.map(item => {
      return (
        <GridListTile key={item.id}>
          <OutfitCardItem outfit={outfit} item={item}/>
        </GridListTile>
      )
    })
  }


  return (
    <div className={classes.root} >
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">{name}</ListSubheader>
        </GridListTile>
        {renderTiles()}
      </GridList>
    </div>
  );
}