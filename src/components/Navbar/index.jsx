import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "../../styles/navbar";

const useStyles = makeStyles(styles);

const Navbar = ({ handleOpenModal }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleOpenModal}>
            Otwórz modal
          </Button>
          <Typography edge="end" variant="h6" className={classes.title}>
            Kadromierz
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
