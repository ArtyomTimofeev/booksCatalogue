import { Grid } from '@mui/material';
import React from 'react';
import BookItem from './BookItem';

const BooksOfYearCol = ({ booksOfYear }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 6 }}>
      {booksOfYear.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </Grid>
  );
};

export default BooksOfYearCol;
