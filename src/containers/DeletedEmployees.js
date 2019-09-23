import React from "react";
import { Table, Container, Row, Col } from "reactstrap";

const DeletedEmployees = () => {
  let delEmp = JSON.parse(localStorage.getItem("deleted"));
  return (
    <Container style={{ padding: "30px 0" }}>
      <Row>
        <Col xs="12" sm={{ size: 8, offset: 2 }}>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee</th>
              </tr>
            </thead>
            <tbody>
              {delEmp &&
                delEmp.map((el, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{el}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default DeletedEmployees;
