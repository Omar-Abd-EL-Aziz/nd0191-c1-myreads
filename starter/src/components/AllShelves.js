import React from "react";
import SingleShelf from "./SingleShelf";
const AllShelves = ({ books, shelfChanger }) => {
  const current = books.filter((book) => book.shelf === "currentlyReading");
  const want = books.filter((book) => book.shelf === "wantToRead");
  const none = books.filter((book) => book.shelf === "read");

  return (
    <>
      <SingleShelf
        title={"Currently Reading"}
        books={current}
        shelfChanger={shelfChanger}
      />
      <SingleShelf
        title={"Want To Read"}
        books={want}
        shelfChanger={shelfChanger}
      />
      <SingleShelf title={"Read"} books={none} shelfChanger={shelfChanger} />
    </>
  );
};

export default AllShelves;
