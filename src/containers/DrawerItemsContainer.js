import React, { useContext } from 'react'
import {  MethodContext } from '../App'
import { Grid, makeStyles } from '@material-ui/core';
import DrawerCategory from '../components/DrawerCategory';
import DrawerAppBar from '../components/DrawerAppBar';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      paddingTop: theme.spacing(3)
    },
    itemDisplay: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      width: '300px',
      overflowX: 'hidden',
      height: '100%'
    }, 
}))

export default function DrawerContainer(){
  const { root, itemDisplay } = useStyles()
  const { categories } = useContext(MethodContext)

  const renderCategoriesAndItems = () => {
    return categories.map(category => {
      return (
        <DrawerCategory key={category} category={category} />
      )
    })
  }


  return (
    <div className={itemDisplay}>
        <Grid container spacing={1}> 
        
          {renderCategoriesAndItems()}
        </Grid>                       
    </div>
  )
} 