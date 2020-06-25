import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { itemCount, pageSize, onPageChange, currentPage } = this.props;
    const totalPages = Math.ceil(itemCount / pageSize);
    if (totalPages === 1) return null;
    const pages = _.range(1, totalPages + 1);
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <span
                className="page-link pointer-cursor"
                href="#"
                onClick={() => onPageChange(page)}
              >
                {page}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
