import React from "react";
import { employees } from "../../assets/employees.json";
import { locations } from "../../assets/locations.json";
import { roles } from "../../assets/roles.json";
import { contracts } from "../../assets/contracts.json";
import HomePage from "../../views/HomePage";
import _ from "lodash";

class HomePageContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      startDate: "2017-05-03",
      endDate: "2017-05-03",
      selectedRoles: [],
      selectedContracts: [],
      selectedLocations: [],
      filterEmployees: _.cloneDeep(employees),
      selectedEmployees: [],
      allEmployees: _.cloneDeep(employees),
    };
  }

  setDate = (e) => this.setState({ [e.target.name]: e.target.value });

  setSelectedRoles = (e, values) => {
    this.setState({ selectedRoles: values.map((val) => val.id) });
  };

  setSelectedContracts = (e, values) => {
    this.setState({ selectedContracts: values.map((val) => val.id) });
  };

  setSelectedLocations = (e, values) => {
    this.setState({ selectedLocations: values.map((val) => val.id) });
  };

  setSelectedEmployees = (e, values) => {
    const selectAll = values.find((x) => x.name === "Wszyscy");
    if (selectAll !== undefined) {
      values = this.state.filterEmployees;
    }
    this.setState({ selectedEmployees: values });
  };

  setFilterEmployees = (e, values) =>
    this.setState({ filterEmployees: values });

  handleLoadingEmployees = () => {
    const { selectedContracts, selectedRoles, selectedLocations } = this.state;

    const filters = [
      ...selectedContracts,
      ...selectedLocations,
      ...selectedRoles,
    ];
    let selectedPeople = this.state.allEmployees.filter((em) => {
      const combinedEmployeeData = [...em.role, ...em.contract, ...em.location];
      return filters.every((v) => combinedEmployeeData.includes(v));
    });

    if (selectedPeople.length === 1) {
      selectedPeople = [];
    }
    this.setState({ filterEmployees: selectedPeople });
  };

  handleSubmitForm = () => {
    const employeesWithoutAll = this.state.selectedEmployees.filter(
      (em) => em.id !== 0
    );

    const cloneOfEmployees = _.cloneDeep(employeesWithoutAll);

    // eslint-disable-next-line
    cloneOfEmployees.map((employee) => {
      const emRole = roles.find(
        (filterRole) => filterRole.id === employee.role[0]
      );

      employee.role[0] = Object.assign({}, emRole);
      const emContract = contracts.find(
        (filterContract) => filterContract.id === employee.contract[0]
      );

      employee.contract[0] = Object.assign({}, emContract);
      const emLocations = employee.location.map((loc) =>
        locations.find((filterLocation) => filterLocation.id === loc)
      );
      employee.location = [...emLocations];
    });

    console.log("Selected employees", cloneOfEmployees);
    console.log("Start date", this.state.startDate);
    console.log("End date", this.state.endDate);
  };

  render() {
    return (
      <HomePage
        setDate={this.setDate}
        setSelectedContracts={this.setSelectedContracts}
        setSelectedLocations={this.setSelectedLocations}
        setSelectedRoles={this.setSelectedRoles}
        setFilterEmployees={this.setFilterEmployees}
        setSelectedEmployees={this.setSelectedEmployees}
        handleLoadingEmployees={this.handleLoadingEmployees}
        state={this.state}
        handleSubmitForm={this.handleSubmitForm}
      />
    );
  }
}

export default HomePageContainer;
