import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCdIIk8J1UY3OArt4scuMj_6U2ksBsGhAc',
  authDomain: 'bookscatalogueapp.firebaseapp.com',
  projectId: 'bookscatalogueapp',
  storageBucket: 'bookscatalogueapp.appspot.com',
  messagingSenderId: '478529836031',
  appId: '1:478529836031:web:67f77910c89fbb944c0dca',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
