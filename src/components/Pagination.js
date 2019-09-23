import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { changeCurrentPage } from "../Redux/actions";

class Paginationn extends Component {
  handlePageChange = index => {
    console.log(index);
    this.props.changeCurrentPage(index);
  };

  render() {
    let pagination = [];
    let nrPages = this.props.pages;
    let start = this.props.currentPage > 3 ? this.props.currentPage - 3 : 0;
    let end = this.props.currentPage < nrPages - 2 ? start + 5 : nrPages;
    for (let i = start; i < end; i++) {
      pagination.push(
        <PaginationItem
          active={this.props.currentPage === i + 1 ? true : false}
          key={i}
        >
          <PaginationLink onClick={() => this.handlePageChange(i + 1)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return (
      <Pagination aria-label="Page navigation example">
        {this.props.currentPage > 1 && (
          <PaginationItem>
            <PaginationLink previous href="#" />
          </PaginationItem>
        )}
        {pagination}
        {this.props.currentPage < nrPages && (
          <PaginationItem>
            <PaginationLink next href="#" />
          </PaginationItem>
        )}
      </Pagination>
    );
  }
}

export default connect(
  null,
  { changeCurrentPage: changeCurrentPage }
)(Paginationn);
