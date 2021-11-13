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

const BookItem = ({ book }) => {
  const { setBooks } = useContext(Context);

  const deleteCard = async (id) => {
    await API.deleteBook(id);
    API.getBooks().then((response) => {
      setBooks(response);
    });
  };

  return (
    <Card>
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
          <br />
          <b>Year: </b> {book.year || '—'}
          <br />
          <b>Rating: </b> {book.rating || 0}
          <br />
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
export default BookItem;
