import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display:"flex",
      justifyContent:"flex-end"
    },
  })
);

export default function Navbar({ handleOpenModal }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleOpenModal}>
            Otwórz modal
          </Button>
          <Typography   edge="end" variant="h6" className={classes.title}>
            Kadromierz
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
