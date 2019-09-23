import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const style = {
      color: "black",
      margin: "5px"
    };
    return (
      <div>
        <Navbar color="light" light expand="md">
            <Link style={style} to="/">
              Home
            </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                  <Link style={style} to="/allEmployees">
                    All employees
                  </Link>
              </NavItem>
              <NavItem>
                  <Link style={style} to="/deletedEmployees">
                    Deleted employees
                  </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
