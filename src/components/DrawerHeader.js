import React, { useContext } from 'react';
import { StateContext, DispatchContext, MethodContext } from '../App'
import { makeStyles, useTheme, IconButton, TextField,} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  form: {
    textAlignLast: 'center'
  },
}))

export default function DrawerHeader(){
  const { selectedOutfit } = useContext(StateContext)
  const { selectedOutfitDispatch } = useContext(DispatchContext)
  const { setEditModeAndWindow } = useContext(MethodContext)

  const classes = useStyles();
  const theme = useTheme();
  const { name } = selectedOutfit
  

  const handleChangeName = ({target: {value} }) => {
    selectedOutfitDispatch({type: 'EDIT_NAME', payload: value})
  }

  const handleDrawerClose = () => {
    setEditModeAndWindow(false);
  }

  return (
    <div className={classes.drawerHeader}>
      {/* <Typography className={classes.title}>{name}</Typography> */}
      <form className={classes.form} noValidate autoComplete="off">
        <TextField 
        id="standard-basic" 
        label='Edit Outfit Name' 
        value={name}
        onChange={handleChangeName}  />
      </form>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
  )
}