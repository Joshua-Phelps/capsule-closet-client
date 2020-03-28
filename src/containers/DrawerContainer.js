import React, { useContext } from 'react'
import { StateContext, MethodContext } from '../App'
import { Grid, makeStyles } from '@material-ui/core';
import ItemCard from '../components/ItemCard';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingTop: theme.spacing(3)
    }
}))

export default function DrawerContainer(){
  const { root } = useStyles()
  const { selectedOutfit } = useContext(StateContext)
  const { filterItemsByOutfit } = useContext(MethodContext)
 

  const items = filterItemsByOutfit(selectedOutfit)

  const renderItems = () => {
    return items.map(item => {
      return <ItemCard />
    })
  }

  return (
    <div className={root}>
        <Grid container spacing={3}>
            {renderItems()}                            
        </Grid>                       
    </div>
  )
} 