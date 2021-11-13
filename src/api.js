import { db } from './firebase-config';
import {
  collection,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore/lite';
import { query } from 'firebase/database';

const API = {
  async getBooks() {
    const queryForBooks = query(
      collection(db, 'books'),
      orderBy('year', 'desc')
    );
    const booksSnapshot = await getDocs(queryForBooks);
    const booksList = booksSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return booksList;
  },
  async deleteBook(id) {
    const bookDoc = doc(db, 'books', id);
    await deleteDoc(bookDoc);
  },
  async createBook(values) {
    if (values.year === '') values.year = 0;
    if (values.rating === '') values.rating = 0;
    await addDoc(collection(db, 'books'), values);
  },
};
export default API;
