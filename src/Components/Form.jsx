import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import API from '../api';

const Form = ({ openForm, setOpenForm, setBooks }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required().max(100),
    author: yup.string().required(),
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

  const handleClose = (touched, errors) => {
    setOpenForm(false);
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          author: '',
          year: '',
          rating: '',
          ISBN: '',
          imgUrl: '',
        }}
        validateOnBlur
        onSubmit={async (values) => {
          await API.createBook(values);
          API.getBooks().then((response) => {
            setBooks(response);
          });
          handleClose();
          for (var value in values) {
            values[value] = '';
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <Dialog open={openForm} onClose={handleClose}>
            <DialogTitle>Adding a book to catalogue</DialogTitle>
            <DialogContent>
              <DialogContentText>
                If you want to add a book, please enter these fields.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Book title"
                type="text"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name={'name'}
                error={Boolean(touched.name && errors.name)}
                helperText={errors.name}
              />
              <TextField
                margin="dense"
                id="author"
                label="List of authors"
                type="text"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.author}
                name={'author'}
                error={Boolean(touched.author && errors.author)}
                helperText={errors.author}
              />
              <TextField
                margin="dense"
                id="year"
                label="Publication year"
                type="number"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.year}
                name={'year'}
                error={Boolean(touched.year && errors.year)}
                helperText={errors.year}
              />
              <TextField
                margin="dense"
                id="rating"
                label="Rating"
                type="number"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rating}
                name={'rating'}
                error={Boolean(touched.rating && errors.rating)}
                helperText={errors.rating}
              />
              <TextField
                margin="dense"
                id="ISBN"
                label="ISBN"
                type="text"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ISBN}
                name={'ISBN'}
                error={Boolean(touched.ISBN && errors.ISBN)}
                helperText={errors.ISBN}
              />
              <TextField
                margin="dense"
                id="imgUrl"
                label="Image URL"
                type="text"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.imgUrl}
                name={'imgUrl'}
                error={Boolean(touched.imgUrl && errors.imgUrl)}
                helperText={errors.imgUrl}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose(errors, touched)}>
                Cancel
              </Button>
              <Button
                disabled={!isValid || !dirty}
                type="submit"
                color="secondary"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    </div>
  );
};

export default Form;
