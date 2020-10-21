import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Navbar from "../../components/Navbar/index.jsx";
import { makeStyles } from "@material-ui/core/styles";
import { contracts } from "../../assets/contracts.json";
import { roles } from "../../assets/roles.json";
import { locations } from "../../assets/locations.json";
import CustomTextField from "../../components/CustomTextField/index.jsx";
import styles from "../../styles/homepage";
import CustomAutocomplete from "../../components/CustomAutocomplete/index.jsx";

const useStyles = makeStyles(styles);

const HomePage = ({
  setDate,
  setSelectedContracts,
  setSelectedLocations,
  setSelectedRoles,
  setSelectedEmployees,
  handleLoadingEmployees,
  handleSubmitForm,
  state,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const classes = useStyles();
  const handleCloseModal = () => {
    setOpen(false);
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
            <CustomTextField
              id="date_start"
              label="Select start date"
              name="startDate"
              type="date"
              defaultValue="2017-05-03"
              onChange={setDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomTextField
              id="date_end"
              label="Select end date"
              name="endDate"
              type="date"
              className={classes.textField}
              onChange={setDate}
              defaultValue={state.startDate}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: { min: state.startDate },
              }}
            />
          </div>
          <CustomAutocomplete
            id="selectRoles"
            onChange={setSelectedRoles}
            options={roles}
            className={classes.formControl}
            label={"Stanowiska"}
          />
          <CustomAutocomplete
            id="selectLocations"
            onChange={setSelectedLocations}
            options={locations}
            className={classes.formControl}
            label={"Lokalizacje"}
          />
          <CustomAutocomplete
            id="selectEmployees"
            onOpen={handleLoadingEmployees}
            onChange={setSelectedEmployees}
            options={state.filterEmployees}
            className={classes.formControl}
            selectedEmployees={state.selectedEmployees}
            disableCloseOnSelect
            noOptionsText="Nie znaleziono pracowników"
            label={"Pracownicy"}
          />
          <CustomAutocomplete
            id="selectContracts"
            onChange={setSelectedContracts}
            options={contracts}
            className={classes.formControl}
            label={"Warunki zatrudnienia"}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitForm}
            variant="contained"
            color="primary"
            type="submit"
            className={classes.buttonStyle}
          >
            Zatwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HomePage;
