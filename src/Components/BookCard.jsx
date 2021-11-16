import React, { useContext } from 'react';
import {
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardActions,
  Button,
} from '@mui/material';
import Context from '../context';
import API from '../api';
import BookImg from '../assets/images/book.png';

const BookCard = ({ book }) => {
  const { setAllBooks } = useContext(Context);

  const deleteCard = async (id) => {
    await API.deleteBook(id);
    API.getBooks().then((response) => {
      setAllBooks(response);
    });
  };

  return (
    <Card>
      <CardMedia
        sx={{ objectFit: 'contain', pt: 1, pb: 1 }}
        component="img"
        height="140"
        image={book.imgUrl || BookImg}
      />
      <CardContent
        sx={{
          background: '#fedbff',
          height: 140,
          padding: 1,
          overflow: 'auto',
        }}
      >
        <Typography gutterBottom component="div">
          <b>{book.name}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Author: </b> {book.author || '—'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Year: </b> {book.year || '—'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Rating: </b> {book.rating || 0}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>ISBN: </b> {book.ISBN || '—'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          onClick={() => deleteCard(book.id)}
          sx={{ flexGrow: 1 }}
          size="small"
          color="error"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
export default BookCard;
