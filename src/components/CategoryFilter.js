import React, { useContext, useRef, useEffect, useState } from 'react';
import SubCategoryFilter from '../components/SubCategoryFilter'
import { makeStyles, Button, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, Typography } from '@material-ui/core'
import { StateContext, MethodContext } from '../App';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  counter: {
    padding: theme.spacing(1),
    marginBottom: "16px"
  },

  tabs: {
    // backgroundColor: '#a4d7e3'
    backgroundColor: 'palegoldenrod'
  },

  filterButton: {
    backgroundColor: '#e0e0e0'
  },

  subFilterGridStyles: {
    display: 'grid',
    gridGap:'10px',
    gridTemplateColumns:'repeat(5, 1fr)',
    gridTemplateRows: '1fr',
  },
  clearFilterDiv: {
    alignItems: 'center'
  },
  clearFilterButton: {
    marginTop: '1.5rem',
    marginLeft: '3rem',
    border: 'solid 2px #a4d7e3',
    color: '#607d8b'
  },
  catSection: {
    marginRight: '25px',
    marginLeft: '25px'
  }
}));

export default function CategoryFilter() {
  const classes = useStyles();
  const [openFilters, setOpenFilters] = useState(false)
  const { 
    categoryNavBarValue, 
    subCategoryFilter, 
    closetColorFilter, 
    editMode, 
    items,
    closetBrandFilter,
    closetSizeFilter,
  } = useContext(StateContext)
  const { 
    setCategoryNavBarValue, 
    setSubCategoryFilter, 
    categoryItems, 
    getSubCategories,  
    setClosetColorFilter,
    setClosetBrandFilter,
    setClosetSizeFilter ,
    closetDisplayedItems
  } = useContext(MethodContext)
  const tabsActions = useRef() 
  const subCategories = getSubCategories(categoryItems(categoryNavBarValue, items), 'sub_category') 
  const colors = getSubCategories(categoryItems(categoryNavBarValue, closetDisplayedItems), 'color') 
  const brands = getSubCategories(categoryItems(categoryNavBarValue, closetDisplayedItems), 'brand')
  const sizes = getSubCategories(categoryItems(categoryNavBarValue, closetDisplayedItems), 'size')

  const handleChange = (event, newValue) => {
    setCategoryNavBarValue(newValue)
  }

  const handleOpenFilters = () => {
    setOpenFilters(!openFilters)
  }

  const clearFilters = () => {
    setClosetBrandFilter('')
    setClosetColorFilter('')
    setClosetSizeFilter('')
    setSubCategoryFilter('')
  }

  useEffect(() => {
    setTimeout(() => tabsActions.current.updateIndicator(), 150)
    setTimeout(() => tabsActions.current.updateScrollButtons(), 150)
  }, [editMode, []])

  return (
    <>
      {/* <Grid container spacing={4} >
          <Grid item xs={9}></Grid>
          <Grid item >
            <Paper className={classes.counter}>
              <Typography color='secondary'>
                {`Total ${categoryNavBarValue ? categoryNavBarValue : 'Items'}: ${closetDisplayedItems.length}`}
                </Typography>
            </Paper>
          </Grid>
          <Grid item xs={1}></Grid>
      </Grid> */}

      <Paper className={classes.root, classes.catSection}>
           
        <Tabs
          action={tabsActions}
          value={categoryNavBarValue}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered={editMode ? false : true}
          variant={editMode ? 'scrollable' : 'standard'}        
          scrollButtons={editMode ? 'on': 'off'}
          className={classes.tabs}
        >      
          <Tab value='' label="All Items" />
          <Tab value='Tops' label="Tops" />
          <Tab value='Bottoms' label="Bottoms" />
          <Tab value='Dresses' label="Dresses" />
          <Tab value='Outerwear' label="Outerwear" />
          <Tab value='Shoes' label="Shoes" />
          <Tab value='Accessories' label="Accessories" />    
        </Tabs>
        <Container className={classes.filterButton}>
          <Button onClick={handleOpenFilters}>+ Filters</Button>  
        </Container> 
        { openFilters && (
          <>
          <Container className={classes.subFilterGridStyles}>
              <SubCategoryFilter 
                selections={subCategories} 
                handleSelection={setSubCategoryFilter} 
                selectionValue={subCategoryFilter}
                formText={'Sub Category'}
              />
              <SubCategoryFilter 
                selections={colors} 
                handleSelection={setClosetColorFilter} 
                selectionValue={closetColorFilter}
                formText={'Color'}
              />
              <SubCategoryFilter 
                selections={brands} 
                handleSelection={setClosetBrandFilter} 
                selectionValue={closetBrandFilter}
                formText={'Brand'}
              />
              <SubCategoryFilter 
                selections={sizes} 
                handleSelection={setClosetSizeFilter} 
                selectionValue={closetSizeFilter}
                formText={'Size'}
              />
              <div className={classes.clearFilterDiv}>
                <Button variant="outlined" onClick={clearFilters} className={classes.button, classes.clearFilterButton}>
                  Clear
                </Button>
              </div>
            </Container>
          </>
        )}
      </Paper>
    </>
  );
}