import React from "react";
import axios from "axios";
import "../styles/Search.css";
import { useState, useEffect } from "react";
import { SetURL } from "./SetURL";
import Footer from "./Footer";
import Navigation from "./Navigation";
import DisplayBooks from "./DisplayBooks";
import Suggestions from "./Suggestions";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as filters from "../constants/constants";

export default function Search() {
  const initSearch = {
    keywords: "",
    title: "",
    authors: "",
    publisher: "",
    isbn: "",
    category: filters.GENRES[0].value,
    availability: filters.AVAILABILITY[0].value,
    content: "",
    language: "",
    download: "",
  };

  const [search, setSearch] = useState(initSearch);
  const [books, setBooks] = useState({});
  const [submit, setSubmit] = useState(false);

  let navigate = useNavigate();
  const url = useLocation();
  const urlSearch = url.search;

  const { keywords } = search;
  const {
    TITLE,
    AUTHORS,
    PUBLISHER,
    ISBN,
    GENRES,
    DOWNLOAD,
    CONTENT,
    AVAILABILITY,
    LANGUAGE,
  } = filters;
  const fillFilters = [TITLE, AUTHORS, PUBLISHER, ISBN];

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "download" && !e.target.checked) {
      value = "";
    }

    setSearch((prevSearch) => {
      return {
        ...prevSearch,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let params = {};
    params.inKeywords = search.keywords;
    params.inTitle = search.title;
    params.inAuthor = search.authors;
    params.inPublisher = search.publisher;
    params.inSubject = search.category;
    params.inISBN = search.isbn;
    params.inFilter = search.availability;
    params.inPrintType = search.content;
    params.inLangRestrict = search.language;
    params.inDownload = search.download;

    const { URL, query } = SetURL(params);
    const { data: books } = await axios.get(URL);
    setBooks(books);
    navigate(query);
    setSubmit(true);
  };

  const handleChangeSubmit = async (e) => {
    handleChange(e);
    handleSubmit(e);
  };

  useEffect(() => {
    const URLParams = getSearchParams(urlSearch);

    if (Object.values(URLParams).every((x) => x === null)) {
      return;
    }
    const fetchAPI = () => {
      let params = {};
      params.inKeywords = URLParams.keyword ? URLParams.keyword[1] : "";
      params.inTitle = URLParams.title ? URLParams.title[1] : "";
      params.inAuthor = URLParams.author ? URLParams.author[1] : "";
      params.inPublisher = URLParams.publisher ? URLParams.publisher[1] : "";
      params.inSubject = URLParams.subject ? URLParams.subject[1] : "";
      params.inISBN = URLParams.isbn ? URLParams.isbn[1] : "";
      params.inFilter = URLParams.filter ? URLParams.filter[1] : "";
      params.inPrintType = URLParams.print ? URLParams.print[1] : "";
      params.inLangRestrict = URLParams.language ? URLParams.language[1] : "";
      params.inDownload = URLParams.download ? URLParams.download[1] : "";

      const { URL, query } = SetURL(params);
      return { URL, query };
    };
    const url = fetchAPI();

    const navigation = async ({ URL, query }) => {
      try {
        const { data: books } = await axios.get(URL);
        setBooks(books);
        navigate(query);
        setSubmit(true);
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      }
    };
    navigation(url);
  }, [urlSearch, navigate]);

  const handleReset = (e) => {
    setSearch(initSearch);
  };

  function getSearchParams(URL) {
    const keyword = /(?:q=)(.*?)(?:\+|&)/;
    const intitle = /(?:intitle%3A)(.*?)(?:\+|&)/;
    const inauthor = /(?:inauthor%3A)(.*?)(?:\+|&)/;
    const inpublisher = /(?:inpublisher%3A)(.*?)(?:\+|&)/;
    const subject = /(?:subject%3A)(.*?)(?:\+|&)/;
    const isbn = /(?:isbn%3A)(.*?)(?:\+|&)/;
    const filter = /(?:filter=)(.*?)(?:\+|&)/;
    const printType = /(?:printType=)(.*?)(?:\+|&)/;
    const langRestrict = /(?:langRestrict=)(.*?)(?:\+|&)/;
    const download = /(?:download=)(.*?)(?:\+|&)/;

    const matchKeyword = keyword.exec(URL);
    const matchTitle = intitle.exec(URL);
    const matchAuthor = inauthor.exec(URL);
    const matchPublisher = inpublisher.exec(URL);
    const matchSubject = subject.exec(URL);
    const matchISBN = isbn.exec(URL);
    const matchFilter = filter.exec(URL);
    const matchPrintType = printType.exec(URL);
    const matchLanguage = langRestrict.exec(URL);
    const matchDownload = download.exec(URL);

    return {
      keyword: matchKeyword,
      title: matchTitle,
      author: matchAuthor,
      publisher: matchPublisher,
      subject: matchSubject,
      isbn: matchISBN,
      filter: matchFilter,
      print: matchPrintType,
      language: matchLanguage,
      download: matchDownload,
    };
  }

  // test getSearchParams
  // getSearchParams(
  //   "?q=harry+intitle%3Aharry+inauthor%3Ajk+inpublisher%3Apo+subject%3Aart+isbn%3A2345&maxResults=40&printType=books&langRestrict=en&filter=partial&download=epub&startIndex=0"
  // );

  return (
    <div>
      <Navigation></Navigation>
      <Container className="body">
        <Row>
          <Col sm={4}>
            <Form.Label className="formlabel">Filter By</Form.Label>
            <div className="formbox">
              <Form onSubmit={handleChangeSubmit} autoComplete="off">
                {fillFilters.map((f, i) => (
                  <Row key={i}>
                    <Form.Group as={Col} className="form-section">
                      <Form.Label className="formlabel">{f.name}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={f.name}
                        name={f.value}
                        id={f.value}
                        value={search[f.value]}
                        onChange={handleChangeSubmit}
                      />
                    </Form.Group>
                  </Row>
                ))}

                <Row>
                  <Form.Group as={Col} className="form-section">
                    <Form.Label className="formlabel">Book Category</Form.Label>
                    <Form.Select
                      value={search.category}
                      name="category"
                      onChange={handleChangeSubmit}
                    >
                      {GENRES.map((f) => (
                        <option key={f.id} value={f.value}>
                          {f.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group
                    as={Col}
                    className="form-section formsection-last"
                  >
                    <Form.Label className="formlabel">
                      Volume Type & Availability
                    </Form.Label>
                    <Form.Select
                      value={search.availability}
                      name="availability"
                      onChange={handleChangeSubmit}
                    >
                      {AVAILABILITY.map((f) => (
                        <option key={f.id} value={f.value}>
                          {f.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} className="form-section-radio">
                    <Form.Label className="formlabel">
                      Download Format
                    </Form.Label>
                    {DOWNLOAD.map((f) => (
                      <Form.Check
                        inline
                        key={f.id}
                        label={f.name}
                        type="checkbox"
                        value={f.value}
                        name="download"
                        onChange={handleChangeSubmit}
                      />
                    ))}
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} className="form-section-radio">
                    <Form.Label className="formlabel">Language </Form.Label>
                    {LANGUAGE.map((f) => (
                      <Form.Check
                        inline
                        type="radio"
                        key={f.id}
                        label={f.name}
                        value={f.value}
                        name="language"
                        onChange={handleChangeSubmit}
                      />
                    ))}
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group
                    as={Col}
                    className="form-section-radio formsection-last"
                  >
                    <Form.Label className="formlabel">Content Type</Form.Label>
                    {CONTENT.map((f) => (
                      <Form.Check
                        inline
                        type="radio"
                        key={f.id}
                        label={f.name}
                        value={f.value}
                        name="content"
                        onChange={handleChangeSubmit}
                      />
                    ))}
                  </Form.Group>

                  <Form.Group className="reset-btn">
                    <Button
                      as="input"
                      type="reset"
                      value="Reset"
                      variant="outline-dark"
                      onClick={handleReset}
                    />
                  </Form.Group>
                </Row>
              </Form>
            </div>
          </Col>

          <Col sm={8}>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Group>
                <Form.Label className="formlabel">Search BookZ</Form.Label>
              </Form.Group>

              <Form.Group>
                <FloatingLabel label="Enter keywords">
                  <Form.Control
                    required
                    type="search"
                    placeholder="Enter keywords"
                    name="keywords"
                    id="keywords"
                    value={keywords}
                    onChange={handleChange}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>

              <Suggestions submit={submit} />

              <Form.Group className="display">
                {submit && <DisplayBooks books={books} />}
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
