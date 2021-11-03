import React from 'react';

const BookItem = ({ book }) => {
  return (
    <div>
      <div>Name: {book.name}</div>
      <div>Name: {book.autor}</div>
      <div>Name: {book.year}</div>
      <div>Name: {book.rating}</div>
      <div>Name: {book.ISBN}</div>
    </div>
  );
};

export default BookItem;
