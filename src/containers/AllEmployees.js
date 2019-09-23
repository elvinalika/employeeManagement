import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Pagination from "../components/Pagination";
import EmployeesList from "../components/EmployeesList";
import AddEmployee from "../components/AddEmployee";
import { changeCurrentPage } from "../Redux/actions";

class AllEmployees extends Component {
  state = {
    searchedName: "",
    searchResult: [],
    totalPages: 0,
    currentPage: 1
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.employees !== prevProps.employees &&
      this.state.searchedName !== ""
    ) {
      const emp = this.props.employees.filter(el =>
        el.employee_name.includes(this.state.searchedName)
      );
      this.setState({
        ...this.state,
        searchResult: emp
      });
    }
  }

  handleSearch = event => {
    const name = event.target.value;
    const emp = this.props.employees.filter(el =>
      el.employee_name.includes(name)
    );
    this.setState({
      ...this.state,
      searchedName: name,
      searchResult: emp
    });
    if (event.target.value !== "") {
      this.props.changeCurrentPage(1);
    }
  };

  render() {
    return (
      <Container fluid>
        <br />
        <Row>
          <Col xs="6" sm={{ size: 4, offset: 2 }}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Search</InputGroupText>
              </InputGroupAddon>
              <Input onChange={this.handleSearch} />
            </InputGroup>
          </Col>
          <Col xs="6" sm="4">
            <AddEmployee></AddEmployee>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs="12" sm={{ size: 8, offset: 2 }}>
            <EmployeesList
              employees={
                this.state.searchedName === ""
                  ? this.props.employees
                  : this.state.searchResult
              }
              currentPage={this.props.currentPage}
            ></EmployeesList>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs="12" sm={{ size: 3, offset: 5 }}>
            <Pagination
              currentPage={this.props.currentPage}
              pages={
                this.state.searchedName === ""
                  ? this.props.pages
                    ? this.props.pages.length
                    : 0
                  : Math.ceil(this.state.searchResult.length / 10)
              }
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.allEmployees,
    pages: state.totalPages,
    currentPage: state.currentPage
  };
};

export default connect(
  mapStateToProps,
  {
    changeCurrentPage: changeCurrentPage
  }
)(AllEmployees);
