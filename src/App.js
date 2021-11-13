import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Context from './context';
import API from './api';
import Form from './Components/Form';

const App = () => {
  const [books, setBooks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  useEffect(() => {
    API.getBooks().then((response) => setBooks(response));
  }, []);

  return (
    <div style={{ backgroundColor: 'rgb(232 232 232)' }}>
      <Context.Provider value={{ setBooks }}>
        <Header setOpenForm={setOpenForm} />
        <Content books={books} />
        <Form
          setBooks={setBooks}
          openForm={openForm}
          setOpenForm={setOpenForm}
        />
      </Context.Provider>
    </div>
  );
};

export default App;
