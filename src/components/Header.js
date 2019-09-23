import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
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
      color: "black"
    };
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <Link style={style} to="/">
              Home
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <Link style={style} to="/allEmployees">
                    All employees
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link style={style} to="/deletedEmployees">
                    Deleted employees
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
