// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: 'AIzaSyBs6x7ysGCI6ecDMFK-7bVv6DG7n2clS7w',
    authDomain: 'graduation-thesis-ced27.firebaseapp.com',
    projectId: 'graduation-thesis-ced27',
    storageBucket: 'graduation-thesis-ced27.appspot.com',
    messagingSenderId: '277398051581',
    appId: '1:277398051581:web:ca4306c9e0ba188aa5fc94',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const DataBase = getFirestore(app);
