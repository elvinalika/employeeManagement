import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import routes from "./Routes/routes";
import { connect } from "react-redux";
import { getEmployeesRequest } from "./Redux/actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchEmployees();
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        {routes.map(el => (
          <Route
            key={el.path}
            exact
            path={el.path}
            component={el.component}
          ></Route>
        ))}
      </div>
    );
  }
}

export default connect(
  null,
  {
    fetchEmployees: getEmployeesRequest
  }
)(App);
