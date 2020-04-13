import React, { useContext, useRef, useEffect } from 'react';
import { makeStyles, Tab, FormControl, InputLabel, Select, MenuItem, FormHelperText, AppBar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { StateContext, MethodContext } from '../App';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SubCategoryFilter() {
  const classes = useStyles();
  const { categoryNavBarValue, items, subCategoryNavBarValue } = useContext(StateContext)
  const { getSubCategories, categoryItems, setSubCategoryNavBarValue } = useContext(MethodContext)
  const tabsActions = useRef()  

  const handleChange = (e) => {
    setSubCategoryNavBarValue(e.target.value)
  }

  useEffect(() => {
    setSubCategoryNavBarValue('')
  }, [categoryNavBarValue])


  const renderSelections = () => {
    let subCategories = getSubCategories(categoryItems(categoryNavBarValue, items))
    return subCategories.map(subCategory => {
      return (
        <MenuItem 
          key={subCategory} 
          value={subCategory} 
          // label={subCategory}
          >
          <em>{subCategory}</em>
        </MenuItem>
      )
    })
  }

  return (
    <>
      {categoryNavBarValue !== '' && 
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-autowidth-label"></InputLabel>
          <Select
            value={subCategoryNavBarValue}
            onChange={handleChange}
            autoWidth
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {renderSelections()}
          </Select>
          <FormHelperText>Sub Categories</FormHelperText>
        </FormControl>
      }
    </>
  );
}