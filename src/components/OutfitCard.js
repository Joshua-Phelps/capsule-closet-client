import React, { useContext }from 'react'
import { MethodContext } from '../App'
import { makeStyles, GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

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
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function OutfitCard({ outfit }) {
  const classes = useStyles()
  const { filterItemsByOutfit } = useContext(MethodContext)
  const {id, times_worn, name } = outfit 
  const items = filterItemsByOutfit(outfit)


  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">{name}</ListSubheader>
        </GridListTile>
        {items.map(item => (
          <GridListTile key={item}>
            <img src={item.image} alt={item.category} />
            <GridListTileBar
              title={item.category}
              subtitle={<span>{item.sub_category}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${''}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}