import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={4}>
      <Grid container item xs={12}>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {/* map over all subcategories and add a tab for each: */}
          <Tab label="All Items" />
          <Tab label="Tops" />
          <Tab label="Bottoms" />
          <Tab label="Dresses" />
          <Tab label="Outerwear" />
          <Tab label="Shoes" />
          <Tab label="Accessories" />
          
        </Tabs>
      </Paper>
      </Grid>
    </Grid>
  );
}