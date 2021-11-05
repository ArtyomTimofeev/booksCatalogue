import { Container, Grid } from '@mui/material';
import React from 'react';
import BookItem from '../BookItem/BookItem';
import RecommendedBookBlock from '../RecommendedBookBlock/RecommendedBookBlock';

const Content = ({ books }) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </Grid>
      <RecommendedBookBlock />
    </Container>
  );
};

export default Content;
