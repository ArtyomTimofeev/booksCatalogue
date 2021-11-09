import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BookItem from './BookItem';
import _ from 'underscore';
import { Grid } from '@mui/material';

const RecommendedBookBlock = ({ books }) => {
  const [bookWithMaxRating, setBookWithMaxRating] = useState([]);
  useEffect(() => {
    let currentYear = new Date().getFullYear();
    const booksWithRating = books.filter(
      (book) => book.year <= currentYear - 3 && book.rating
    );
    if (booksWithRating.length > 0) {
      const maxRating = Math.max.apply(
        null,
        booksWithRating.map((item) => item.rating)
      );
      const booksWithMaxRating = _.where(booksWithRating, {
        rating: `${maxRating}`,
      });
      const bookWithMaxRating =
        booksWithMaxRating[
          Math.floor(Math.random() * booksWithMaxRating.length)
        ];
      setBookWithMaxRating(bookWithMaxRating);
    }
  }, [books]);
  return (
    <>
      <Typography gutterBottom variant="h4">
        Recommended Book
      </Typography>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <BookItem book={bookWithMaxRating} />
        </Grid>
      </Grid>
    </>
  );
};
export default RecommendedBookBlock;
