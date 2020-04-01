import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid } from '@material-ui/core'
import { StateContext, MethodContext } from '../App';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const { categoryNavBarValue } = useContext(StateContext)
  const { setCategoryNavBarValue } = useContext(MethodContext)
  // const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setCategoryNavBarValue(newValue)
  }

  return (
    <Grid container spacing={4}>
      <Grid container item xs={12}>
      <Paper className={classes.root}>
        <Tabs
          value={categoryNavBarValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {/* map over all subcategories and add a tab for each: */}
          <Tab value='' label="All Items" />
          <Tab value='Tops' label="Tops" />
          <Tab value='Bottoms' label="Bottoms" />
          <Tab value='Dresses' label="Dresses" />
          <Tab value='Shoes' label="Shoes" />
          <Tab value='Accessories' label="Accessories" />
          
        </Tabs>
      </Paper>
      </Grid>
    </Grid>
  );
}