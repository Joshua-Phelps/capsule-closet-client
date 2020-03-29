import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ComposedTextField() {
  const [name, setName] = React.useState('Placeholder');
  const classes = useStyles();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="component-simple">Category</InputLabel>
        <Input id="component-simple" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Sub Category</InputLabel>
        <Input id="component-simple" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Color</InputLabel>
        <Input id="component-simple" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Size</InputLabel>
        <Input id="component-simple" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Brand</InputLabel>
        <Input id="component-simple" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Image</InputLabel>
        <Input id="component-simple" onChange={handleChange} />
      </FormControl>
      
    </form>
  );
}
