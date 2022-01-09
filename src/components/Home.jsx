import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../styles/Home.css";
import Button from "react-bootstrap/Button";
import * as filters from "../constants/constants";

export default function Home() {
  const { GENRES } = filters;

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      />

      <Navigation></Navigation>

      <div className="hero">
        <div className="hero-text">
          <p className="hero-title">
            A better way to find your favorite books.
          </p>
          <p className="hero-description">
            BookZ is the most powerful search engine for Google Books library.
            BookZ works just like web search. Try a search on BookZ. When we
            find a book with content that contains a match for your search
            terms, we'll link to it in your search results.
          </p>
          <Button href="/search" variant="light">
            Get Started
          </Button>{" "}
        </div>
      </div>

      <div className="category">
        <div className="cate-text">
          <p className="cate-title">Browse by Genre</p>
          <div className="cate-btn">
            {GENRES.slice(1).map((genre, i) => (
              <Button
                key={i}
                href={genre.link}
                variant="dark"
                className="genre-btn"
                value={genre.value}
                // onClick={}
              >
                {genre.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
