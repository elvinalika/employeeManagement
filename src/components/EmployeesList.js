import React, { Component } from "react";
import {
  ListGroupItem,
  ListGroup,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Spinner
} from "reactstrap";
import { slice } from "lodash";
import { deleteEmployeeRequest, editEmployeeRequest } from "../Redux/actions";
import { connect } from "react-redux";

class EmployeesList extends Component {
  state = {
    modal: false,
    clicked: true,
    deletedEmp: [],
    deleteIndex: -1,
    employee_name: "",
    employee_age: 0,
    employee_salary: 0,
    id: 0
  };

  componentDidMount() {
    let deleted = JSON.parse(localStorage.getItem("deleted"));
    this.setState({
      ...this.state,
      deletedEmp: deleted
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      ...this.state,
      modal: !prevState.modal
    }));
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });
  };

  editButtonHandler = el => {
    if (!this.state.modal) {
      this.setState({
        ...this.state,
        employee_name: el.employee_name,
        employee_salary: el.employee_salary,
        employee_age: el.employee_age,
        id: el.id,
        modal: true
      });
    }
  };

  deleteEmployee = (el, index) => {
    const arr = this.state.deletedEmp ? [...this.state.deletedEmp] : [];
    arr.push(el.employee_name);
    this.setState(
      {
        ...this.state,
        deletedEmp: arr,
        deleteIndex: index
      },
      () => {
        localStorage.setItem("deleted", JSON.stringify(arr));
        this.props.deleteEmployeeRequest(el);
      }
    );
  };

  editEmployee = () => {
    let el = {
      id: this.state.id,
      employee_name: this.state.employee_name,
      employee_salary: this.state.employee_salary,
      employee_age: this.state.employee_age
    };
    this.props.editEmployeeRequest(el);
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    const { employees, currentPage } = this.props;
    let slicedEmployees = this.props.employees
      ? slice(employees, (currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
      : [];
    return (
      <ListGroup style={{ textAlign: "center" }}>
        {slicedEmployees &&
          slicedEmployees.map((el, index) => {
            return (
              <ListGroupItem action key={index}>
                <Row>
                  <Col xs="12" md="6">
                    <span id={"Tooltip" + el.id}>{el.employee_name}</span>
                    <UncontrolledTooltip
                      placement="right"
                      target={"Tooltip" + el.id}
                    >
                      Age: {el.employee_age}
                      <br />
                      Salary: {el.employee_salary}
                    </UncontrolledTooltip>
                  </Col>
                  <Col xs="12" md="3">
                    <Button
                      outline
                      color="info"
                      size="sm"
                      onClick={() => this.editButtonHandler(el)}
                    >
                      Edit
                    </Button>
                    <Modal
                      backdrop={false}
                      isOpen={this.state.modal}
                      toggle={this.toggle}
                    >
                      <ModalHeader toggle={this.toggle}>
                        Edit Employee 
                      </ModalHeader>
                      <ModalBody>
                        <br />
                        <Input
                          type="text"
                          defaultValue={this.state.employee_name}
                          id="employee_name"
                          onChange={this.handleChange}
                        />
                        <br />
                        <Input
                          type="number"
                          defaultValue={this.state.employee_salary}
                          id="employee_salary"
                          onChange={this.handleChange}
                        />
                        <br />
                        <Input
                          type="number"
                          defaultValue={this.state.employee_age}
                          id="employee_age"
                          onChange={this.handleChange}
                        />
                        <br />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.editEmployee}>
                          Save
                        </Button>
                        <Button color="secondary" onClick={this.toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                  <Col xs="12" md="3">
                    <Button
                      outline
                      color="danger"
                      size="sm"
                      onClick={() => this.deleteEmployee(el, index)}
                    >
                      {this.props.loadingDelete &&
                        this.state.deleteIndex === index && (
                          <Spinner size="sm" color="danger" />
                        )}
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            );
          })}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingDelete: state.deleteButtonLoading
  };
};

export default connect(
  mapStateToProps,
  {
    deleteEmployeeRequest: deleteEmployeeRequest,
    editEmployeeRequest: editEmployeeRequest
  }
)(EmployeesList);
