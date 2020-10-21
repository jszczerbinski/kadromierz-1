import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CustomTextField from "../CustomTextField/index";
import Checkbox from "@material-ui/core/Checkbox";

const CustomAutocomplete = (props) => {
  const { selectedEmployees, ...otherProps } = props;
  const renderOptions = (option, { selected }) => (
    <React.Fragment>
      <Checkbox checked={selected} />
      {option.name}
    </React.Fragment>
  );
  const renderOptionsEmployees = (option, { selected }) => {
    const selectEmployeeIndex = selectedEmployees.findIndex(
      (employee) => employee.name === "Wszyscy"
    );
    if (selectEmployeeIndex > -1) {
      selected = true;
    }
    return (
      <React.Fragment>
        <Checkbox checked={selected} />
        {option.name}
      </React.Fragment>
    );
  };
  const optionLabel = (option) => option.name;
  const renderInputs = (params) => (
    <CustomTextField
      {...params}
      variant="standard"
      label={otherProps.label}
      placeholder="Search"
    />
  );

  return (
    <Autocomplete
      required
      className={otherProps.className}
      multiple
      variant="outlined"
      limitTags={2}
      size="small"
      onChange={otherProps.onChange}
      options={otherProps.options}
      renderOption={
        otherProps.id !== "selectEmployees"
          ? renderOptions
          : renderOptionsEmployees
      }
      getOptionLabel={optionLabel}
      renderInput={renderInputs}
      {...otherProps}
    />
  );
};

export default CustomAutocomplete;
