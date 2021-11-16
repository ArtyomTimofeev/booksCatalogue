import { Grid, Typography } from '@mui/material';
import React from 'react';
import BookItem from './BookCard';

const GroupOfBooks = ({ groupOfBooks, groupingType }) => {
  return (
    <div>
      <Typography gutterBottom variant="h4">
        {groupOfBooks[0][groupingType] || 'Other books'}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {groupOfBooks.map((book) => (
          <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
            <BookItem key={book.id} book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GroupOfBooks;
