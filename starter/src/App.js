import "./App.css";
import { useState, useEffect } from "react";
import * as BooksApi from "./BooksAPI";
import BookFromApi from "./components/BookFromApi";
import Header from "./components/Header";
import AllShelves from "./components/AllShelves";

import { Link, Route, Routes } from "react-router-dom";

function App() {
  const [userSearch, setUserSearch] = useState("");
  const [lookForBook, setLookForBook] = useState([]);
  const [books, setBooks] = useState([]);
  const [flip, setFlip] = useState(false);

  const userSearchHandler = (e) => {
    setUserSearch(e.target.value);
  };

  useEffect(() => {
    let entered = true;
    if (userSearch) {
      BooksApi.search(userSearch).then((results) => {
        if (results.error) {
          console.log(results);
        } else {
          if (entered) {
            setLookForBook(results);
            console.log(results);
          }
        }
      });
    }
    return () => {
      entered = false;
      setLookForBook([]);
    };
  }, [userSearch]);

  useEffect(() => {
    BooksApi.getAll().then((books) => setBooks(books));
  }, []);

  const shelfChanger = (book, newShelf) => {
    const updateOld = books.map((b) => {
      if (book.id === b.id) {
        b.shelf = newShelf;
      }

      return b;
    });
    setBooks(updateOld);
    BooksApi.update(book, newShelf);
  };

  const library = lookForBook.map((book) => {
    books.map((b) => {
      if (b.id === book.id) {
        book.shelf = b.shelf;
      }
      return b;
    });
    return book;
  });

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/search"
          element={
            <div className="search-books">
              <div className="search-books-bar">
                <Link to={"/"} className="close-search" onClick={!flip}>
                  Close
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    onChange={userSearchHandler}
                    value={userSearch}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  <h1 className="search-title">Look For Book ! </h1>
                  {library.map((book) => {
                    return (
                      <li key={Math.random().toString()}>
                        <BookFromApi book={book} shelfChanger={shelfChanger} />
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/"
          element={
            <div className="list-books">
              <Header />
              <div className="list-books-content">
                <div>
                  <AllShelves books={books} shelfChanger={shelfChanger} />
                </div>
              </div>
              <div className="open-search">
                <Link to={"/search"}>Add a book</Link>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
