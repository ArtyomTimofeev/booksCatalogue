import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore/lite';
import Book from './Components/BookItem';

const App = () => {
  const [books, setBooks] = useState([]);
  const booksCol = collection(db, 'books');
  useEffect(() => {
    const getBooks = async () => {
      const booksSnapshot = await getDocs(booksCol);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksList);
    };
    getBooks();
  }, []);
  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <Book book={book} />
        </div>
      ))}
    </div>
  );
};

export default App;
