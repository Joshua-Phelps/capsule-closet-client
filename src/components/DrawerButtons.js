import React, { useContext  } from 'react'
import { StateContext, MethodContext } from '../App'
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  button: {
    marginTop: '5px'
  },
  spacer: {
    marginTop: '5px'
  }
}))

export default function DrawerButtons() {
  const { selectedOutfit } = useContext(StateContext)
  const { deleteOutfit, clearSelectedOutfit, createOutfit, updateOutfit } = useContext(MethodContext)
  const classes = useStyles();
  const { id } = selectedOutfit

  const handleSubmit = e => {
    e.preventDefault()
    id ? updateOutfit() : createOutfit()
  }

  return (
    <>          
      <Button variant='contained' onClick={clearSelectedOutfit}>
          Clear Outfit
      </Button>   

      <Button variant='contained' className={classes.button} onClick={handleSubmit}>
        {id ? 'Update Outfit' : 'Add Outfit to Collection'}
      </Button>

      {id && <Button className={classes.button} variant='contained' onClick={deleteOutfit}>
          Delete Outfit
        </Button> 
      }
      <div className={classes.spacer}></div>
    </>
  )
}