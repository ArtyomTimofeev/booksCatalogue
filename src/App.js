import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs, orderBy } from 'firebase/firestore/lite';
import Header from './Components/Header/Header';
import Content from './Components/Content/Content';
import { query } from 'firebase/database';

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

  return (
    <div style={{ backgroundColor: 'rgb(227 227 227)', height: '100vh' }}>
      <Header />
      <Content books={books} />
    </div>
  );
};

export default App;
