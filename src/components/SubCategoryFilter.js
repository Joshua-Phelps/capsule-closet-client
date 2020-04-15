import React, { useContext, useRef, useEffect } from 'react'
import { makeStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText, AppBar } from '@material-ui/core'
import { StateContext, MethodContext } from '../App'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SubCategoryFilter({handleSelection, selectionValue, formText, selections}) {
  const classes = useStyles();
  const { categoryNavBarValue } = useContext(StateContext)

  const handleChange = (e) => {
    handleSelection(e.target.value)
  }

  // useEffect(() => {
  //   handleSelection('')
  // }, [categoryNavBarValue])


  const renderSelections = () => {
    return selections.map(category => {
      return (
        <MenuItem 
          key={category} 
          value={category} 
        >
          <em>{category}</em>
        </MenuItem>
      )
    })
  }

  return (
    <FormControl className={classes.select}>
      <InputLabel id="demo-simple-select-autowidth-label"></InputLabel>
      <Select
        value={selectionValue}
        onChange={handleChange}
        autoWidth
        className={classes.selectEmpty}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {renderSelections()}
      </Select>
      <FormHelperText>{formText}</FormHelperText>
    </FormControl>
  );
}