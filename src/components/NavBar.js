import React from "react";
import { makeStyles, AppBar, Tabs, Tab } from "@material-ui/core/";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab label="Page One" />
          <Tab label="Page Two" />
          <Tab label="Page Three" />
        </Tabs>
      </AppBar>
    </div>
  );
}
