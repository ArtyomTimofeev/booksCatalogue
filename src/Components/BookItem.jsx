import React from 'react';

import {
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Grid,
} from '@mui/material';

const BookItem = ({ book }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
      <CardActionArea>
        <Card sx={{ maxHeight: 375, minHeight: 375 }}>
          <CardMedia
            component="img"
            height="160"
            image="https://woman-gu.ru/wp-content/uploads/2020/03/glow.jpg"
          />
          <CardContent>
            <Typography gutterBottom component="div">
              {book.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Author: </b> {book.author || '—'}
              <br />
              <b>Year: </b> {book.year || '—'}
              <br />
              <b>Rating: </b> {book.rating || '—'}
              <br />
              <b>ISBN: </b> {book.ISBN || '—'}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
export default BookItem;
