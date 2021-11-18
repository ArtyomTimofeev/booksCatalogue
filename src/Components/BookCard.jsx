import React, { useContext, useState } from 'react';
import {
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardActions,
  Button,
  TextField,
} from '@mui/material';
import Context from '../context';
import API from '../api';
import BookImg from '../assets/images/book.png';
import * as yup from 'yup';
import { useFormik } from 'formik';

const BookCard = ({ book, nonEditableBookCard }) => {
  const { setAllBooks } = useContext(Context);
  const [editMode, setEditMode] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required('required field').max(100),
    author: yup.string().required('required field'),
    year: yup.number().min(1800).max(new Date().getFullYear()).integer(),
    rating: yup.number().min(0).max(10).integer(),
    ISBN: yup
      .string()
      .matches(
        /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
        'ISBN is not valid'
      ),
    imgUrl: yup
      .string()
      .matches(
        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/,
        'URL is not valid'
      ),
  });
  const formik = useFormik({
    initialValues: {
      name: book.name,
      author: book.author,
      year: book.year,
      rating: book.rating,
      ISBN: book.ISBN,
      imgUrl: book.imgUrl,
    },
    validationSchema,
    onSubmit: async () => {
      setEditMode(false);
      const keys = Object.keys(formik.initialValues);
      if (
        keys.some((key) => formik.initialValues[key] !== formik.values[key])
      ) {
        await API.updateBook(formik.values, book.id);
        API.getBooks().then((response) => {
          setAllBooks(response);
        });
        keys.map((key) => (formik.initialValues[key] = formik.values[key]));
      }
    },
  });

  const turnOnEditMode = () => {
    setEditMode(true);
  };

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
        {!editMode ? (
          <Typography gutterBottom component="div">
            <b>{book.name}</b>
          </Typography>
        ) : (
          <TextField
            size="small"
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Book title"
            type="text"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            required
          />
        )}

        {!editMode ? (
          <Typography variant="body2" color="text.secondary">
            <b>Author: </b> {book.author || '—'}
          </Typography>
        ) : (
          <TextField
            size="small"
            margin="dense"
            id="author"
            name="author"
            label="List of authors"
            type="text"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.author}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
            required
          />
        )}

        {!editMode ? (
          <Typography variant="body2" color="text.secondary">
            <b>Year: </b> {book.year || '—'}
          </Typography>
        ) : (
          <TextField
            size="small"
            margin="dense"
            id="year"
            name="year"
            label="Publication year"
            type="number"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.year}
            error={Boolean(formik.errors.year)}
            helperText={formik.errors.year}
          />
        )}

        {!editMode ? (
          <Typography variant="body2" color="text.secondary">
            <b>Rating: </b> {book.rating || 0}
          </Typography>
        ) : (
          <TextField
            size="small"
            margin="dense"
            id="rating"
            name="rating"
            label="Rating"
            type="number"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
            error={Boolean(formik.errors.rating)}
            helperText={formik.errors.rating}
          />
        )}

        {!editMode ? (
          <Typography variant="body2" color="text.secondary">
            <b>ISBN: </b> {book.ISBN || '—'}
          </Typography>
        ) : (
          <TextField
            size="small"
            margin="dense"
            id="ISBN"
            name="ISBN"
            label="ISBN"
            type="text"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ISBN}
            error={Boolean(formik.errors.ISBN)}
            helperText={formik.errors.ISBN}
          />
        )}

        {editMode && (
          <TextField
            size="small"
            margin="dense"
            id="imgUrl"
            name="imgUrl"
            label="Image URL"
            type="text"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imgUrl}
            error={Boolean(formik.errors.imgUrl)}
            helperText={formik.errors.imgUrl}
          />
        )}
      </CardContent>
      <CardActions disableSpacing>
        {!editMode ? (
          <Button
            onClick={turnOnEditMode}
            sx={{ flexGrow: 1 }}
            size="small"
            color="secondary"
            disabled={Boolean(nonEditableBookCard)}
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={formik.handleSubmit}
            sx={{ flexGrow: 1 }}
            size="small"
            color="secondary"
          >
            Save
          </Button>
        )}
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
