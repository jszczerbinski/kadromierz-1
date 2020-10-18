import React, { useState, useReducer } from "react";
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
import { employees } from "../../assets/employees.json";
import { contracts } from "../../assets/contracts.json";
import { roles } from "../../assets/roles.json";
import { locations } from "../../assets/locations.json";

const initialState = {
  startDate: "2017-05-03",
  endDate: "2017-05-03",
  selectedRoles: [],
  selectedContracts: [],
  selectedLocations: [],
  filterEmployees: employees,
  selectedEmployees: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "selectedRoles":
      return {
        ...state,
        selectedRoles: action.payload,
      };
    case "selectedContracts":
      return { ...state, selectedContracts: action.payload };
    case "selectedLocations":
      return { ...state, selectedLocations: action.payload };
    case "filterEmployees":
      return { ...state, filterEmployees: action.payload };
    case "selectedEmployees":
      const selectAll = action.payload.find((x) => x.name === "All");
      if (selectAll !== undefined) {
        action.payload = state.filterEmployees;
      }
      return { ...state, selectedEmployees: action.payload };
    case "setStartDate":
      return { ...state, startDate: action.payload };
    case "setEndDate":
      return { ...state, endDate: action.payload };
    default:
      throw new Error();
  }
}

const useStyles = makeStyles((theme) =>
  createStyles({
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
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
      },
    },
  })
);

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [openEm, setOpenEm] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const classes = useStyles();
  const handleCloseModal = () => {
    setOpen(false);
  };
 // const loading = openEm;

  // useEffect(() => {
  //   let active = true;
  //   if (!loading) {
  //     return undefined;
  //   }

  //   const { selectedContracts, selectedRoles, selectedLocations } = state;
  // //  console.log("ro", selectedRoles);

  //   const filters = [
  //     ...selectedContracts,
  //     ...selectedLocations,
  //     ...selectedRoles,
  //   ];
  // //  console.log(filters);
  //   const selectedPeople = employees.filter((em) => {
  //     console.log(em.role)
  //     const combinedEmployeeData = [...em.role, ...em.contract, ...em.location];

  //     if (filters.every((v) => combinedEmployeeData.includes(v))) {
  //       return em;
  //     }
  //   });

  //   if (active) {
  //     dispatch({
  //       type: "filterEmployees",
  //       payload: selectedPeople,
  //     });
  //   }

  //   return () => {
  //     active = false;
  //   };
  // }, [loading]);

  const handleLoadingEmployees = () => {
    const { selectedContracts, selectedRoles, selectedLocations } = state;

    const filters = [
      ...selectedContracts,
      ...selectedLocations,
      ...selectedRoles,
    ];

    const selectedPeople = employees.filter((em) => {
      const combinedEmployeeData = [...em.role, ...em.contract, ...em.location];
      return filters.every((v) => combinedEmployeeData.includes(v));
    });

    // if (active) {
    dispatch({
      type: "filterEmployees",
      payload: selectedPeople,
    });
    // }

    // return () => {
    //   active = false;
    //  };
  };
  const handleSubmitForm = () => {
    setOpenEm(true);
    const employeesWithoutAll = state.selectedEmployees.filter(
      (em) => em.id !== 0
    );
    employeesWithoutAll.map((employee) => {
      const emRole = roles.find((filterRole) => filterRole.id === employee.role);
      employee.role = emRole;
      const emContract = contracts.find(
        (filterContract) => filterContract.id === employee.contract
      );
      employee.contract = emContract;
      const emLocations = employee.location.map((loc) =>
        locations.find((filterLocation) => filterLocation.id === loc)
      );
      employee.location = emLocations;
    });

    console.log("Selected employees", employeesWithoutAll);
    console.log("Start date", state.startDate);
    console.log("End date", state.endDate);

    handleCloseModal(true);
  };
  return (
    <>
      <Navbar
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Wybierz pracowników</DialogTitle>
        <DialogContent>
          <div className={classes.dataControls}>
            <TextField
              id="date"
              label="Select start date"
              type="date"
              defaultValue="2017-05-03"
              onChange={(e, value) =>
                dispatch({
                  type: "setStartDate",
                  payload: e.target.value,
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="Select end date"
              type="date"
              defaultValue={state.startDate}
              InputProps={{ inputProps: { min: state.startDate } }}
              onChange={(e, value) =>
                dispatch({
                  type: "setEndDate",
                  payload: e.target.value,
                })
              }
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Autocomplete
            className={classes.formControl}
            multiple
            variant="outlined"
            limitTags={2}
            size="small"
            onChange={(event, value) =>
              dispatch({
                type: "selectedRoles",
                payload: value.map((val) => val.id),
              })
            }
            options={roles}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox checked={selected} />
                {option.name}
              </React.Fragment>
            )}
            getOptionLabel={(option) => option.name}
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
              dispatch({
                type: "selectedLocations",
                payload: value.map((val) => val.id),
              })
            }
            size="small"
            options={locations}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox checked={selected} />
                {option.name}
              </React.Fragment>
            )}
            getOptionLabel={(option) => option.name}
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
            disableCloseOnSelect
            size="small"
            onOpen={ handleLoadingEmployees}
            onChange={(event, value) => {
              dispatch({
                type: "selectedEmployees",
                payload: value,
              });
            }}
            onClose={() => {
              setOpenEm(false);
            }}
            noOptionsText="Nie znaleziono pracowników"
            options={state.filterEmployees}
            renderOption={(option, { selected }) => {
              if (state.filterEmployees.length === 1) {
                dispatch({
                  type: "filterEmployees",
                  payload: [],
                });
              }
              const selectFilmIndex = state.selectedEmployees.findIndex(
                (film) => film.name === "All"
              );
              if (selectFilmIndex > -1) {
                selected = true;
              }
              return (
                <React.Fragment>
                  <Checkbox
                    checked={selected}
                  />
                  {option.name}
                </React.Fragment>
              );
            }}
            getOptionLabel={(option) => option.name}
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
            options={contracts}
            onChange={(event, value) =>
              dispatch({
                type: "selectedContracts",
                payload: value.map((val) => val.id),
              })
            }
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox checked={selected} />
                {option.name}
              </React.Fragment>
            )}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Warunki zatrudnienia"
                placeholder="Search"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitForm}
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Zatwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(HomePage);
