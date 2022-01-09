import Pagination from "react-bootstrap/Pagination";
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export default function BookPagination(props) {
  const {
    // booksCount,
    // pageSize,
    onPageChangeFirst,
    onPageChangePrev,
    onPageChange,
    onPageChangeNext,
    onPageChangeLast,
    currentPage,
  } = props;
  const pagesCount = 4;
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount === 1) {
    return null;
  } else {
    return (
      <div>
        <Pagination>
          <Pagination.First onClick={() => onPageChangeFirst(currentPage)} />
          <Pagination.Prev onClick={() => onPageChangePrev(currentPage)} />

          {pages.map((page) => (
            <Pagination.Item
              key={page}
              onClick={() => onPageChange(page)}
              active={page === currentPage}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => onPageChangeNext(currentPage)} />
          <Pagination.Last onClick={() => onPageChangeLast(currentPage)} />
        </Pagination>
      </div>
    );
  }
}

BookPagination.propTypes = {
  // booksCount: PropTypes.number.isRequired,
  // pageSize: PropTypes.number.isRequired,
  onPageChangeFirst: PropTypes.func.isRequired,
  onPageChangePrev: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageChangeNext: PropTypes.func.isRequired,
  onPageChangeLast: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
