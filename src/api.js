import { db } from './firebase-config';
import { collection, getDocs, orderBy } from 'firebase/firestore/lite';
import { query } from 'firebase/database';
import { doc, deleteDoc } from 'firebase/firestore/lite';

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
  async deleteCard(id) {
    const bookDoc = doc(db, 'books', id);
    await deleteDoc(bookDoc);
  },
};
export default API;
