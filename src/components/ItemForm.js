import React, { useState, useContext} from 'react'
import { StateContext, MethodContext, DispatchContext } from '../App'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import FilledInput from '@material-ui/core/FilledInput'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput'
// import axios from 'axios'
// NEED TO: NPM INSTALL --SAVE AXIOS


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function ItemForm(item, props) {
  // const [name, setName] = React.useState('Placeholder');
  const { formItem } = useContext(StateContext)
  const { formItemDispatch } = useContext(DispatchContext)
  const { createItemMode, createItem } = useContext(MethodContext)
  const [ subCatDisplay, setSubCatDisplay ] = useState(false)
  const classes = useStyles();
  //form states:
  // const [category, setCategory] = useState("")
  // const [subCategory, setSubCategory] = useState("")
  // const [color, setColor] = useState("")
  // const [size, setSize] = useState("")
  // const [brand, setBrand] = useState("")
  // const [selectedFile, setSelectedFile] = useState(null)
  // const [age, setAge] = React.useState('');

  const handleChange = (e) => {
      return formItemDispatch({type: 'UPDATE_FORMITEM', payload: {name: e.target.name, value: e.target.value}})
  };

  const handleSubCatSelect = (e) => {
    if (e.target.value == "Custom Subcategory") {
      setSubCatDisplay(true)
    } else if (subCatDisplay) {
      setSubCatDisplay(false)
    } 
    handleChange(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createItem()
    alert(`Submitting Item: ${formItem.color} ${formItem.brand} ${formItem.category}`)
  }





  //handle image selector
  const handleFileSelector = e => {
    // console.log(e.target.files[0])
    // setSelectedFile(e.target.files[0])
    console.log("hello")
  }

  //handle image uploader
  const handleFileUploader = e => {
    console.log("hi")
    // const fd = new FormData()
    // fd.append('image', selectedFile, )
    // axios.post('')
    //firebase storage??
  }

  const subcats = {
    'Tops': ["Tank Shirt", "White Top", "Patterned Shirt", "Sweater", "Flannel Shirt", "Blouse", "Button-down Chambray", "Cardigan"],
    'Bottoms': ["Skinny Jeans", "Black Pants", "Leggings", "Shorts", "Skirts", "Colored/Patterned Pants"],
    'Outerwear': ["Sweatshirt", "Denim Jacket", "Blazer", "Trench Coat", "Outerwear Coat"],
    'Dresses': ["Shirt Dress", "Patterened Dress", "Sweater Dress"],
    'Shoes': ["Tall Boots", "Short Boots", "Wedges", "Flats", "Sandals", "Sneakers"],
    'Accessories': ["Neutral Purse", "Sunhat", "Winter Hat", "Sunglasses", "Scarves", "Choice Jewelry"]
  }

  const select = () => {
    console.log(subcats[`${formItem.category}`])
    if (formItem.category){
           return subcats[`${formItem.category}`].map( sub => {
             console.log(subcats)
            return <MenuItem value={sub}>{sub}</MenuItem>
           })

    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      {/* <FormControl>
        <InputLabel htmlFor="component-simple">Category</InputLabel>
        <Input 
          id="component-simple" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </FormControl> */}

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formItem.category}
          name={'category'}
          onChange={handleChange}
        >

          <MenuItem value={"Tops"}>Tops</MenuItem>
          <MenuItem value={"Bottoms"}>Bottoms</MenuItem>
          <MenuItem value={"Dresses"}>Dress</MenuItem>
          <MenuItem value={"Outerwear"}>Outerwear</MenuItem>
          <MenuItem value={"Shoes"}>Shoes</MenuItem>
          <MenuItem value={"Accessories"}>Accessories</MenuItem>
        </Select>
      </FormControl>
<br></br>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formItem.subCategory}
          name={'sub_category'}
          onChange={handleSubCatSelect}
        >
          {/* <MenuItem value={"Tops"}>Tops</MenuItem>
          <MenuItem value={"Bottoms"}>Bottoms</MenuItem>
          <MenuItem value={"Dresses"}>Dresses</MenuItem>
          <MenuItem value={"Outerwear"}>Outerwear</MenuItem>
          <MenuItem value={"Shoes"}>Shoes</MenuItem>
          <MenuItem value={"Accessories"}>Accessories</MenuItem> */}
          <MenuItem value={"Custom Subcategory"}>Custom Subcategory</MenuItem>
          {select()}
        </Select>
      </FormControl>

      { subCatDisplay &&
        <FormControl>
          <InputLabel htmlFor="component-simple">Create SubCategory</InputLabel>
          <Input 
            id="component-simple" 
            value={formItem.subCategory}
            name={'sub_category'}
            onChange={handleChange} />
        </FormControl>
      }
      <br></br>
      <FormControl>
        <InputLabel htmlFor="component-simple">Color</InputLabel>
        <Input 
          id="component-simple" 
          value={formItem.color}
          name={'color'}
          onChange={handleChange} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Size</InputLabel>
        <Input 
          id="component-simple" 
          value={formItem.size}
          name={'size'}
          onChange={handleChange} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Brand</InputLabel>
        <Input 
          id="component-simple" 
          value={formItem.brand}
          name={'brand'}
          onChange={handleChange} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Image</InputLabel>
        <Input type="file"
          id="component-simple" 
          //  value={selectedFile}
          onChange={handleFileSelector} />
        <Button onClick={handleFileUploader}>Upload</Button>
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