
const styles = (theme) => ({
    formControl: {
      marginBottom: theme.spacing(3),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 200,
      maxWidth: 500,
    },
    modal: {
      maxWidth: "90vw",
    },
    buttonStyle:{
      color:"#fff"
    },
    textField: {
      marginLeft: "10px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        marginTop: "5px",
      },
    },
    dataControls: {
      marginBottom: theme.spacing(3),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 200,
      maxWidth: 500,
      display:"flex",
      justifyContent:"space-around",
      [theme.breakpoints.down("sm")]: {
        // display: "flex",
        flexDirection: "column",
      },
    },
  });


export default styles;
