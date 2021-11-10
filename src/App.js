import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Context from './context';
import API from './api';

const App = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    API.getBooks().then((response) => setBooks(response));
  }, []);

  return (
    <div style={{ backgroundColor: 'rgb(232 232 232)' }}>
      <Context.Provider value={{ setBooks }}>
        <Header />
        <Content books={books} />
      </Context.Provider>
    </div>
  );
};

export default App;
