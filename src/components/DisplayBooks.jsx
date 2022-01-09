import React from "react";
import "../styles/DisplayBooks.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Row, Col, Container } from "react-bootstrap";
import BookPagination from "./BookPagination";
import Suggestions from "./Suggestions";
import { paginate } from "../utils/paginate";

export default function DisplayBooks(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const books = props.books;
  let genreSet = new Set();
  let booksCount = books.totalItems;
  const pageSize = 10;
  const minPageIndex = 1;
  const maxPageIndex = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageChangeFirst = () => {
    setCurrentPage(1);
  };

  const handlePageChangePrev = (page) => {
    if (page > minPageIndex) {
      setCurrentPage(page - 1);
    }
  };

  const handlePageChangeNext = (page) => {
    if (page < maxPageIndex) {
      setCurrentPage(page + 1);
    }
  };

  const handlePageChangeLast = () => {
    setCurrentPage(maxPageIndex);
  };

  if (booksCount === 0) {
    return (
      <div>
        <div className="nomatch">
          <h2>We could not find any matches based on your request.</h2>
        </div>

        <Suggestions submit={false} />
      </div>
    );
  }

  const booksPaginate = paginate(books.items, currentPage, pageSize);

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Abril Fatface"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Spartan"
        rel="stylesheet"
      />
      <h5>{booksCount} results</h5>
      {booksPaginate.map((book, i) => {
        // Get book categories in a single book
        book.volumeInfo.categories?.map((genre, i) =>
          genreSet.add(genre.split("/")[0], genre.split("/")[1])
        );

        return (
          <Container key={i} className="display">
            <Row className="book-box">
              <Col xl={3} className="book-col book-col-1">
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt="src" />
              </Col>

              <Col xl={6} className="book-col book-col-2">
                <h1>{book.volumeInfo.title}</h1>
                {book.volumeInfo.authors?.slice(0, 3).map((book, i) => (
                  <h2 key={i}>{book}</h2>
                ))}
                <div className="book-description">
                  <h4>{book.volumeInfo.description}</h4>
                </div>

                <div className="book-category">
                  {[...genreSet].map((genre, i) => (
                    <Button key={i} variant="dark">
                      {genre}
                    </Button>
                  ))}
                </div>

                <div className="book-link">
                  {
                    <Button disabled={true} variant="link">
                      Get book
                    </Button>
                  }
                </div>

                <div className="book-link">
                  {book.accessInfo.pdf.isAvailable && (
                    <Button
                      href={book.accessInfo.pdf.acsTokenLink}
                      variant="link"
                    >
                      pdf
                    </Button>
                  )}
                </div>

                <div className="book-link">
                  {book.accessInfo.epub.isAvailable && (
                    <Button
                      href={book.accessInfo.epub.acsTokenLink}
                      variant="link"
                    >
                      epub
                    </Button>
                  )}
                </div>

                <div className="book-link">
                  <Button href={book.accessInfo.webReaderLink} variant="link">
                    Google Play
                  </Button>
                </div>
              </Col>

              <Col xl={3} className="book-col book-col-3">
                <div className="book-row">
                  <h5>Publisher</h5>
                  <h6>
                    {book.volumeInfo.publisher
                      ? book.volumeInfo.publisher
                      : "N/A"}
                  </h6>
                </div>
                <hr />

                <div className="book-row">
                  <h5>Publish Date</h5>
                  <h6>
                    {book.volumeInfo.publishedDate
                      ? book.volumeInfo.publishedDate
                      : "N/A"}
                  </h6>
                </div>
                <hr />

                <div className="book-row">
                  <h5>Price</h5>
                  <h6>
                    {book.saleInfo.retailPrice
                      ? book.saleInfo.retailPrice.amount
                      : "N/A"}{" "}
                    <span>{book.saleInfo.retailPrice?.currencyCode} </span>
                  </h6>
                </div>
                <hr />

                <div className="book-row">
                  <h5>Language</h5>
                  <h6>
                    {book.volumeInfo.language
                      ? book.volumeInfo.language
                      : "N/A"}
                  </h6>
                </div>
                <hr />

                <div className="book-row">
                  <h5>Pages</h5>
                  <h6>
                    {book.volumeInfo.pageCount
                      ? book.volumeInfo.pageCount
                      : "N/A"}
                  </h6>
                </div>
                <hr />

                <div>
                  {book.volumeInfo.industryIdentifiers?.map((isbn, i) => (
                    <div key={i} className="book-row">
                      <h5>{isbn.type}</h5>
                      <h6>{isbn.identifier}</h6>
                    </div>
                  ))}
                </div>
                <hr />

                <div>
                  {[1, 2, 3, 4, 5].map((r, i) => {
                    return (
                      <svg
                        className="star"
                        key={i}
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill={
                          i < book.volumeInfo.averageRating ? "#FFC107" : "none"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.46964 3.89437L9.46929 3.89434L6.58303 3.62087L6.28261 3.5924L6.16827 3.31314L5.02737 0.526604C5.02733 0.526495 5.02728 0.526387 5.02724 0.526279C5.0217 0.513021 5.01446 0.505959 5.00959 0.502603C5.00488 0.499363 5.0019 0.499036 5.00004 0.499036C4.99819 0.499036 4.99529 0.499352 4.99069 0.502528C4.9859 0.505829 4.97856 0.512931 4.97293 0.526548C4.97291 0.526599 4.97289 0.526651 4.97287 0.526702L3.8318 3.31317L3.71745 3.59241L3.41705 3.62087L0.531174 3.89426C0.531138 3.89426 0.531101 3.89427 0.531064 3.89427C0.528568 3.89453 0.524758 3.89549 0.519608 3.89979C0.514215 3.90429 0.507123 3.91286 0.502608 3.92735C0.498117 3.94176 0.497954 3.95698 0.501592 3.97079C0.505212 3.98454 0.511656 3.99365 0.517558 3.99903L0.518491 3.99988L2.70017 5.99644L2.9119 6.19021L2.85089 6.47067L2.20767 9.42729C2.20766 9.42733 2.20765 9.42736 2.20764 9.4274C2.2002 9.462 2.2155 9.48705 2.22709 9.49583L9.46964 3.89437ZM9.46964 3.89437C9.47177 3.89457 9.47545 3.89537 9.48063 3.89969C9.48599 3.90417 9.4929 3.91258 9.49723 3.92656L9.97391 3.77888L9.49739 3.92709C9.50717 3.95854 9.49555 3.98711 9.48157 3.99988L9.48117 4.00024L7.29949 5.99641L7.08771 6.19018L7.14873 6.47067L7.792 9.42751C7.79201 9.42756 7.79203 9.42762 7.79204 9.42767C7.79929 9.4614 7.78438 9.48687 7.77199 9.49624L7.77195 9.49627C7.76888 9.4986 7.76659 9.49963 7.76522 9.50013C7.76378 9.50065 7.76266 9.50081 7.76183 9.50085C7.761 9.50089 7.76015 9.50081 7.75919 9.50056C7.7583 9.50033 7.75662 9.49977 7.75413 9.4982L7.75296 9.49747L5.26419 7.94476L5.00009 7.77999L4.73596 7.94471L2.24628 9.49743L2.24605 9.49757M9.46964 3.89437L2.24605 9.49757M2.24605 9.49757C2.24266 9.49969 2.24048 9.50043 2.2396 9.50068C2.23871 9.50094 2.23823 9.50096 2.23791 9.50096C2.23736 9.50096 2.23654 9.5009 2.23522 9.50045M2.24605 9.49757L2.23522 9.50045M2.23522 9.50045C2.23395 9.50003 2.23118 9.4989 2.22714 9.49587L2.23522 9.50045Z"
                          stroke="#FFC107"
                          strokeWidth="0.998073"
                        />
                      </svg>
                    );
                  })}
                </div>

                <div>
                  <p>
                    <span>{book.volumeInfo.ratingsCount || "0"}</span>{" "}
                    {book.volumeInfo.ratingsCount > 1 ? "reviews" : "review"}
                  </p>
                </div>
                <hr />

                <div className="book-details">
                  <Button href={book.volumeInfo.infoLink} variant="link">
                    More Details
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        );
      })}

      <Row className="pagination">
        <BookPagination
          // booksCount={booksCount}
          // pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageChangeFirst={handlePageChangeFirst}
          onPageChangePrev={handlePageChangePrev}
          onPageChangeNext={handlePageChangeNext}
          onPageChangeLast={handlePageChangeLast}
        />
      </Row>
    </div>
  );
}
