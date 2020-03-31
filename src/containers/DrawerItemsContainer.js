import React, { useContext } from 'react'
import {  MethodContext } from '../App'
import { Grid, makeStyles } from '@material-ui/core';
import DrawerCategory from '../components/DrawerCategory';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      paddingTop: theme.spacing(3)
    }
}))

export default function DrawerContainer(){
  const { root } = useStyles()
  const { getCategories } = useContext(MethodContext)

  const renderCategoriesAndItems = () => {
    return getCategories.map(category => {
      return (
        <DrawerCategory category={category} />
      )
    })
  }


  return (
    <div className={root}>
        <Grid container spacing={1}> 
          {renderCategoriesAndItems()}
        </Grid>                       
    </div>
  )
} 