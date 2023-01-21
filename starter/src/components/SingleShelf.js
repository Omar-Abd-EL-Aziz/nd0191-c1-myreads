import React from "react";
import BookFromApi from "./BookFromApi";

const SingleShelf = ({ title, books, shelfChanger }) => {
  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => {
              return (
                <li key={Math.random().toString()}>
                  <BookFromApi book={book} shelfChanger={shelfChanger} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default SingleShelf;
