import React, { useState, useEffect, useReducer } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Navbar from "../../components/Navbar";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { employees, contract, role, location } from "../../assets/data.json";

const initialState = {
  selectedRoles: [],
  selectedContracts: [],
  selectedLocations: [],
  selectedEmployees: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "selectedRoles":
      return { ...state, selectedRoles: action.payload };
    case "selectedContracts":
      return { ...state, selectedContracts: action.payload };
    case "selectedLocations":
      return { ...state, selectedLocations: action.payload };
    case "selectedEmployees":
      return { ...state, selectedEmployees: action.payload };
    default:
      throw new Error();
  }
}
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      marginBottom: theme.spacing(3),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 300,
      maxWidth: 500,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    modal: {
      maxWidth: "90vw",
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const HomePage = () => {
  const [open, setOpen] = useState(false);
  // const [personRole, setPersonRole] = useState([]);
  //const [selectedContracts, setSelectedContracts] = useState([]);
  // const [selectedRoles, setSelectedRoles] = useState([]);
  // const [selectedLocations, setSelectedLocations] = useState([]);
  //  const [people, setPeople] = useState([]);
  const [openEm, setOpenEm] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const classes = useStyles();
  const handleCloseModal = () => {
    setOpen(false);
  };
  const loading = openEm && state.selectedEmployees.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      // const response = await fetch(
      //   "https://country.register.gov.uk/records.json?page-size=5000"
      // );
      // await sleep(1e3); // For demo purposes.
      //  const countries = await response.json();
      const { selectedContracts, selectedRoles, selectedLocations } = state;
      console.log(selectedContracts);
      console.log(employees);
      let users = [];
      const x = employees.filter((em) => {
        console.log(em.location);
        console.log(selectedLocations);
        console.log(
          selectedLocations.some((v) => em.location.indexOf(v) !== -1)
        );
        if (
          selectedContracts.includes(em.contract) &&
          selectedRoles.includes(em.role) &&
          selectedLocations.some((v) => em.location.indexOf(v) !== -1)
        )
          return em;
      });
      console.log(x);

      if (active) {
        //   console.log(countries);
        dispatch({
          type: "selectedEmployees",
          payload: x,
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <>
      <Navbar
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
      <Dialog
        //maxWidth="lg"

        //  className={classes.modal}
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Wybierz pracowników</DialogTitle>
        <DialogContent>
          {/* <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              // MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Autocomplete
            className={classes.formControl}
            multiple
            variant="outlined"
            limitTags={2}
            size="small"
            onChange={(event, value) =>
              dispatch({ type: "selectedRoles", payload: value })
            }
            // id="multiple-limit-tags"
            options={role}
            // renderTags={(value) => {
            //   return value;
            // }}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  //  icon={icon}
                  //   checkedIcon={checkedIcon}
                  //  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </React.Fragment>
            )}
            getOptionLabel={(option) => option}
            // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Stanowiska"
                placeholder="Search"
              />
            )}
          />
          <Autocomplete
            className={classes.formControl}
            multiple
            variant="outlined"
            limitTags={2}
            onChange={(event, value) =>
              dispatch({ type: "selectedLocations", payload: value })
            }
            size="small"
            // id="multiple-limit-tags"
            options={location}
            // renderTags={(value) => {
            //   return value;
            // }}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  //  icon={icon}
                  //   checkedIcon={checkedIcon}
                  //  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </React.Fragment>
            )}
            getOptionLabel={(option) => option}
            // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Lokalizacje"
                placeholder="Search"
              />
            )}
          />
          <Autocomplete
            className={classes.formControl}
            multiple
            variant="outlined"
            limitTags={2}
            size="small"
            onOpen={() => {
              setOpenEm(true);
              dispatch({ type: "selectedEmployees", payload: [] });
            }}
            onClose={() => {
              setOpenEm(false);
            }}
            // id="multiple-limit-tags"
            options={state.selectedEmployees}
            loading={loading}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  //  icon={icon}
                  //   checkedIcon={checkedIcon}
                  //  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </React.Fragment>
            )}
            getOptionLabel={(option) => option.name}
            // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Pracownicy"
                placeholder="Search"
              />
            )}
          />
          <Autocomplete
            className={classes.formControl}
            multiple
            variant="outlined"
            limitTags={2}
            size="small"
            // id="multiple-limit-tags"
            options={contract}
            onChange={(event, value) =>
              dispatch({ type: "selectedContracts", payload: value })
            }
            // renderTags={(value) => {
            //   return value;
            // }}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  //  icon={icon}
                  //   checkedIcon={checkedIcon}
                  //  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </React.Fragment>
            )}
            getOptionLabel={(option) => option}
            // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Warunki zatrudnienia"
                placeholder="Search"
              />
            )}
          />
          <TextField
            id="date"
            label="Select date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
          >
            Zatwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(HomePage);
