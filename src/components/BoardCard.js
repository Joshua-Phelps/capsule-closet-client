import React, { useContext }from 'react'
import { MethodContext } from '../App'
import { makeStyles, GridList, GridListTile, ListSubheader } from '@material-ui/core'
import OutfitCard from './OutfitCard';

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

export default function BoardCard({ board }) {
  const classes = useStyles()
  const { filterOutfitsByBoard } = useContext(MethodContext)
  const { name } = board
  const outfits = filterOutfitsByBoard(board)

  const renderTiles = () => {
    return outfits.map(outfit => {
      return (
        <GridListTile key={outfit.id}>
          <OutfitCard outfit={outfit}/>
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