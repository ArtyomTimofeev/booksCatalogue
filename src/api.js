import { db } from './firebase-config';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore/lite';
import { query } from 'firebase/database';

const API = {
  async getBooks() {
    const queryForBooks = query(collection(db, 'books'));
    const booksSnapshot = await getDocs(queryForBooks);
    const booksList = booksSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return booksList;
  },

  async createBook(values) {
    if (values.rating === '') values.rating = 0;
    await addDoc(collection(db, 'books'), values);
  },

  async updateBook(values, id) {
    if (values.rating === '') values.rating = 0;
    const bookDoc = doc(db, 'books', id);
    const newFields = {
      name: values.name,
      author: values.author,
      year: values.year,
      rating: values.rating,
      ISBN: values.ISBN,
      imgUrl: values.imgUrl,
    };
    await updateDoc(bookDoc, newFields);
  },

  async deleteBook(id) {
    const bookDoc = doc(db, 'books', id);
    await deleteDoc(bookDoc);
  },
};

export default API;
