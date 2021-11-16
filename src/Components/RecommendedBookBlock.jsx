import { Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import _ from 'underscore';

const RecommendedBookBlock = ({ allBooks }) => {
  const [bookWithMaxRating, setBookWithMaxRating] = useState([]);

  useEffect(() => {
    let currentYear = new Date().getFullYear();
    const booksWithRating = allBooks.filter(
      (book) => book.year <= currentYear - 3 && book.rating
    );
    if (booksWithRating.length > 0) {
      const maxRating = Math.max.apply(
        null,
        booksWithRating.map((item) => item.rating)
      );
      const booksWithMaxRating = _.where(booksWithRating, {
        rating: maxRating,
      });
      const bookWithMaxRating =
        booksWithMaxRating[
          Math.floor(Math.random() * booksWithMaxRating.length)
        ];
      setBookWithMaxRating(bookWithMaxRating);
    }
  }, [allBooks]);

  return (
    <section>
      <Typography gutterBottom variant="h4">
        Recommended Book
      </Typography>
      <Grid container columnSpacing={2} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <BookCard book={bookWithMaxRating} />
        </Grid>
      </Grid>
    </section>
  );
};
export default RecommendedBookBlock;
