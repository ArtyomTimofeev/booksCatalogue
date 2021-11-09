import { Grid } from '@mui/material';
import React from 'react';
import BookItem from './BookItem';

const BooksOfYearCol = ({ booksOfYear }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 6 }}>
      {booksOfYear.map((book) => (
        <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
          <BookItem key={book.id} book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BooksOfYearCol;
