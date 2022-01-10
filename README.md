<h1>BookSearch</h1>

> BookSearch is a website to find your favorite books in Google Books library.


## Built with

- [React](https://github.com/facebook/react)
- [Google Books API](https://developers.google.com/books/docs/v1/getting_started)

## Features

- Browse by genre
- Advanced filters (author name, language, publisher)

## Getting Started

1. Clone the repo

```shell
git clone https://github.com/loctran15/BookSearch.git
```

2.  Change the current directory to the repo folder

```shell
cd [BookSearch]
```

3. Get `API_KEY` from [Google Books API](https://developers.google.com/books/docs/v1/getting_started)
4. Modify `API_KEY` in `[BookSearch]/src/components/SetURL.jsx`

```shell
const API_KEY = "YOUR_API_KEY";
```

5. Install npm packages

```shell
npm install
```

6. Run the app in the development mode.

```shell
npm start
```

## Try it out.

See Deployment with Heroku: [BookSearch](https://BookSearch-react.herokuapp.com/)

## License

MIT license. See `LICENSE` for more information.
