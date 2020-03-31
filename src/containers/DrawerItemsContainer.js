import React, { useContext } from 'react'
import {  MethodContext } from '../App'
import { Grid, makeStyles } from '@material-ui/core';
import DrawerCategory from '../components/DrawerCategory';
import DrawerAppBar from '../components/DrawerAppBar';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      paddingTop: theme.spacing(3)
    }
}))

export default function DrawerContainer(){
  const { root } = useStyles()
  const { categories } = useContext(MethodContext)

  const renderCategoriesAndItems = () => {
    return categories.map(category => {
      return (
        <DrawerCategory key={category} category={category} />
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