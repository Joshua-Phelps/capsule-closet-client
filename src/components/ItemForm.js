import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import FilledInput from '@material-ui/core/FilledInput'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
// import axios from 'axios'
// NEED TO: NPM INSTAL --SAVE AXIOS
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
export default function ItemForm() {
  const [name, setName] = React.useState('Placeholder');
  const classes = useStyles();
  //form states:
  const [category, setCategory] = useState("")
  const [subCategory, setSubcategory] = useState("")
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [brand, setBrand] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    //add item to user's item array, should display in closet as an itemCard
  }
  //handle image selector
  const handleFileSelector = e => {
    console.log(e.target.files[0])
  }
  //handle image uploader
  const handleFileUploader = e => {
    console.log("hi")
    // axios.post('')
  }
  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="component-simple">Category</InputLabel>
        <Input 
          id="component-simple" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Sub Category</InputLabel>
        <Input 
          id="component-simple" 
          value={subCategory}
          onChange={(e) => setSubcategory(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Color</InputLabel>
        <Input 
          id="component-simple" 
          value={color}
          onChange={(e) => setColor(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Size</InputLabel>
        <Input 
          id="component-simple" 
          value={size}
          onChange={(e) => setSize(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Brand</InputLabel>
        <Input 
          id="component-simple" 
          value={brand}
          onChange={(e) => setBrand(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Image</InputLabel>
        <Input type="file"
          id="component-simple" 
          onChange={handleFileSelector} />
        <Button onClick={() => setSelectedFile(/*value of selected file goes here*/)}>Upload</Button>
      </FormControl>
      <FormControl>
        <Button
          variant="outlined"
          type="submit"
        >
          Add Item
        </Button>
      </FormControl>
    </form>
  );
}