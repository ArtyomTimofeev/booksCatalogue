import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs, orderBy } from 'firebase/firestore/lite';
import Header from './Components/Header';
import Content from './Components/Content';
import { query } from 'firebase/database';
import _ from 'underscore';

const App = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const queryForBooks = query(
        collection(db, 'books'),
        orderBy('year', 'desc')
      );
      const booksSnapshot = await getDocs(queryForBooks);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksList);
    };
    getBooks();
  }, []);

  let sortByYearsBooksArr = [];
  let year = null;
  for (let i = 0; i < books.length; i++) {
    if (year !== books[i].year) {
      let booksOfYearArr = _.where(books, { year: books[i].year });
      sortByYearsBooksArr[i] = booksOfYearArr;
      year = books[i].year;
    }
  }

  return (
    <div style={{ backgroundColor: 'rgb(227 227 227)' }}>
      <Header />
      <Content books={books} sortByYearsBooksArr={sortByYearsBooksArr} />
    </div>
  );
};

export default App;
