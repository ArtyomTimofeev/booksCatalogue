import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BooksOfYearCol from './BooksOfYearCol';
import RecommendedBookBlock from './RecommendedBookBlock';
import _ from 'underscore';

const Content = ({ books }) => {
  const [sortByYearsBooks, setSortByYearsBooks] = useState([]);

  useEffect(() => {
    let sortByYearsBooksArr = [];
    let year = null;
    for (let i = 0; i < books.length; i++) {
      if (year !== books[i].year) {
        let booksOfYearArr = _.where(books, { year: books[i].year });
        sortByYearsBooksArr[i] = booksOfYearArr;
        year = books[i].year;
      }
    }
    setSortByYearsBooks(sortByYearsBooksArr);
  }, [books]);

  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 4 }}>
      <RecommendedBookBlock books={books} />
      {sortByYearsBooks.map((booksOfYear, index) => {
        booksOfYear.sort((a, b) => (a.name > b.name ? 1 : -1));
        return (
          <div key={index}>
            <Typography gutterBottom variant="h4">
              {booksOfYear[0].year || 'Without year'}
            </Typography>
            <BooksOfYearCol booksOfYear={booksOfYear} />
          </div>
        );
      })}
    </Container>
  );
};

export default Content;
