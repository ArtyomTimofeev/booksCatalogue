import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Form from './Components/Form';
import Context from './context';
import API from './api';

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    API.getBooks().then((response) => setAllBooks(response));
  }, []);

  return (
    <Context.Provider value={{ setAllBooks }}>
      <Header setOpenForm={setOpenForm} />
      <Content allBooks={allBooks} setAllBooks={setAllBooks} />
      <Form
        setAllBooks={setAllBooks}
        openForm={openForm}
        setOpenForm={setOpenForm}
      />
    </Context.Provider>
  );
};

export default App;
