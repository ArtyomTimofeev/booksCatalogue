import { Container, Typography } from '@mui/material';
import React from 'react';
import BooksOfYearCol from './BooksOfYearCol';
import RecommendedBookBlock from './RecommendedBookBlock';

const Content = ({ books, sortByYearsBooksArr }) => {
  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 4 }}>
      <RecommendedBookBlock books={books} />
      {sortByYearsBooksArr.map((booksOfYearArr) => {
        booksOfYearArr.sort((a, b) => (a.name > b.name ? 1 : -1));
        return (
          <div key={booksOfYearArr.index}>
            <Typography gutterBottom variant="h4">
              {booksOfYearArr[0].year || 'Without year'}
            </Typography>
            <BooksOfYearCol booksOfYear={booksOfYearArr} />
          </div>
        );
      })}
    </Container>
  );
};

export default Content;
