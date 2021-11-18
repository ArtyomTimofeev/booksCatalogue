import React from 'react';
import {
  Dialog,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import API from '../api';

const Form = ({ openForm, setOpenForm, setAllBooks }) => {
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
      name: '',
      author: '',
      year: '',
      rating: '',
      ISBN: '',
      imgUrl: '',
    },
    validationSchema,
    onSubmit: async () => {
      await API.createBook(formik.values);
      API.getBooks().then((response) => {
        setAllBooks(response);
      });
      handleClose();
    },
  });

  const handleClose = () => {
    setOpenForm(false);
    formik.resetForm();
  };

  return (
    <Dialog open={openForm} onClose={handleClose}>
      <DialogTitle>Adding a book to catalogue</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you want to add a book, please fill these fields.
        </DialogContentText>
        <TextField
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
        <TextField
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
        <TextField
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
        <TextField
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
        <TextField
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
        <TextField
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="secondary" onClick={formik.handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Form;
