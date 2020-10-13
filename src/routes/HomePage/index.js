import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Navbar from "../../components/Navbar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  pracownicy,
  warunkiZatrudnienia,
  stanowisko,
  lokalizacja,
} from "../../assets/data.json";

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
  const [personName, setPersonName] = useState([]);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const classes = useStyles();
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const topFilms = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
  ];

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
            // id="multiple-limit-tags"
            options={stanowisko}
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
            size="small"
            // id="multiple-limit-tags"
            options={lokalizacja}
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
            // id="multiple-limit-tags"
            options={pracownicy}
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
            options={warunkiZatrudnienia}
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
            label="Birthday"
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
