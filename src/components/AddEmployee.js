import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addEmployeeRequest } from "../Redux/actions";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      employee_name: "",
      employee_salary: "",
      employee_age: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleAddButton = () => {
    let el = {
      employee_name: this.state.employee_name,
      employee_salary: this.state.employee_salary,
      employee_age: this.state.employee_age
    };
    if (
      el.employee_age !== "" &&
      el.employee_name !== "" &&
      el.employee_salary !== ""
    ) {
      this.props.addEmployee(el);
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
  };

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          Add Employee
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Employee</ModalHeader>
          <ModalBody>
            <br />
            <Input
              type="text"
              placeholder="Name Lastname"
              id="employee_name"
              onChange={this.handleChange}
            />
            <br />
            <Input
              type="number"
              placeholder="Salary"
              id="employee_salary"
              onChange={this.handleChange}
            />
            <br />
            <Input
              type="number"
              placeholder="Age"
              id="employee_age"
              onChange={this.handleChange}
            />
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleAddButton}>
              Save
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  {
    addEmployee: addEmployeeRequest
  }
)(AddEmployee);
