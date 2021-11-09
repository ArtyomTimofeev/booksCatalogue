import React from 'react';

import {
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardActionArea,
} from '@mui/material';

const BookItem = ({ book }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          sx={{ objectFit: 'contain', pt: 1, pb: 1 }}
          component="img"
          height="140"
          image={
            book.imgUrl ||
            'https://png.pngtree.com/element_our/20190602/ourlarge/pngtree-question-mark-book-pattern-illustration-image_1411141.jpg'
          }
        />
        <CardContent
          sx={{
            background: 'khaki',
            minHeight: 140,
            maxHeight: 140,
            padding: 1,
            overflow: 'auto',
          }}
        >
          <Typography gutterBottom component="div">
            <b>{book.name}</b>
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
      </CardActionArea>
    </Card>
  );
};
export default BookItem;
