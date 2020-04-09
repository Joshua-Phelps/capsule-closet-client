import React, { useContext, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { StateContext, MethodContext } from '../App';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  tab: {
    minWidth: '0px',
  },
}));

export default function SubCategoryFilter() {
  const classes = useStyles();
  const { categoryNavBarValue, items, subCategoryNavBarValue } = useContext(StateContext)
  const { getSubCategories, categoryItems, setSubCategoryNavBarValue } = useContext(MethodContext)
  const tabsActions = useRef()  

  const handleChange = (event, newValue) => {
    setSubCategoryNavBarValue(newValue)
  }

  useEffect(() => {
    setSubCategoryNavBarValue('')
  }, [categoryNavBarValue])

  const renderTabs = () => {
    // getSubCategoryItems(items, )
    let subCategories = getSubCategories(categoryItems(categoryNavBarValue, items))
    return subCategories.map(subCategory => {
      return <Tab classes={{root: classes.tab}} key={subCategory} value={subCategory} label={subCategory} />
    })
  }

  // useEffect(() => {
  //   if( categoryNavBarValue !== ''){
  //   setTimeout(() => tabsActions.current.updateIndicator(), 200)
  //   setTimeout(() => tabsActions.current.updateScrollButtons(), 200)
  //   }
  // }, [editMode])

  return (
    <>
      {categoryNavBarValue !== '' && 
        <Paper className={classes.root}>      
          <Tabs
            action={tabsActions}
            value={subCategoryNavBarValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"         
            scrollButtons="on"
            className={classes.tabs}
          >   
          <Tab value='' label={`All ${categoryNavBarValue}`} />
          {renderTabs()} 

            {/* <Tab value='' label="All Items" />
            <Tab value='Tops' label="Tops" />
            <Tab value='Bottoms' label="Bottoms" />
            <Tab value='Dresses' label="Dresses" />
            <Tab value='Outerwear' label="Outerwear" />
            <Tab value='Shoes' label="Shoes" />
            <Tab value='Accessories' label="Accessories" />     */}
          </Tabs>
        </Paper>
      }
    </>
  );
}