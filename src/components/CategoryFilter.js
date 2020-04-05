import React, { useContext, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, Typography, TabPanel} from '@material-ui/core'
import { StateContext, MethodContext } from '../App';
import clsx from 'clsx'

const drawerWidth = 300

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  counter: {
    padding: theme.spacing(1),
  },
  tabs: {
    // flexGrow: 1,
  },
  tabsShift: {
  },
  root2: {
    justifyContent: "center"
  },
  scroller: {
    flexGrow: "0"
  }
}));

export default function CategoryFilter() {
  const classes = useStyles();
  const { categoryNavBarValue, editMode } = useContext(StateContext)
  const { setCategoryNavBarValue, closetDisplayedItems } = useContext(MethodContext)
  const tabsActions = useRef()  

  const handleChange = (event, newValue) => {
    setCategoryNavBarValue(newValue)
  }

  useEffect(() => {
    setTimeout(() => tabsActions.current.updateIndicator(), 200)
    setTimeout(() => tabsActions.current.updateScrollButtons(), 500)
  }, [editMode])

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

      <Paper className={clsx(classes.tabs, {[classes.tabsShift]: editMode})}>      
        <Tabs
          action={tabsActions}
          value={categoryNavBarValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          // classes={{root: classes.root2, scroller: classes.scroller}}
          varient='scrollable'        
          scrollButtons='on'
          // className={clsx(classes.tabs), {[classes.tabsShift]: editMode}}
        >      
          <Tab value='' label="All Items" />
          <Tab value='Tops' label="Tops" />
          <Tab value='Bottoms' label="Bottoms" />
          <Tab value='Dresses' label="Dresses" />
          <Tab value='Outerwear' label="Outerwear" />
          <Tab value='Shoes' label="Shoes" />
          <Tab value='Accessories' label="Accessories" />    

          <Tab value='Outerwear' label="Outerwear" />
          <Tab value='Shoes' label="Shoes" />
          <Tab value='Accessories' label="Accessories" />    
        </Tabs>
      </Paper>
    </>
  );
}