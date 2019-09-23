import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Logo from "../assets/images/logo.jpg";
import { getEmployeesRequest } from "../Redux/actions";

class Home extends Component {
  componentDidMount() {
    this.props.fetchEmployees();
  }

  render() {
    const style = {
      width: "100%",
      display: "block",
      padding: "90px 0"
    };
    return (
      <Container>
        <Row>
          <Col xs="12" sm="6">
            <img src={Logo} alt="Logo" style={style} />
          </Col>
          <Col xs="12" sm="6">
            <div
              style={{ display: "block", padding: "40% 0", margin: "auto" }}
            >
              Number of employees: <em> {this.props.nrOfEmp}</em> <br />
              Number of deleted employees: <em> {this.props.nrOfDelEmp}</em>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    nrOfEmp: state.nrOfEmp,
    nrOfDelEmp: state.nrOfDelEmp
  };
};

export default connect(
  mapStateToProps,
  {
    fetchEmployees: getEmployeesRequest
  }
)(Home);
