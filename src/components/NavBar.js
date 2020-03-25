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
          <Tab label="Guide" />
          <Tab label="Closet" />
          <Tab label="Outifts" />
          <Tab label="Boards" />
          {/* create hamburger menu item for Signout, My Account (edit) */}
        </Tabs>
      </AppBar>
    </div>
  );
}
