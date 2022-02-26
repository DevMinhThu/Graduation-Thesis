// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBvwFoFxmi_Z1w61loiNRHzeQCjsedy8PE',
    authDomain: 'graduation-thesis-6083b.firebaseapp.com',
    projectId: 'graduation-thesis-6083b',
    storageBucket: 'graduation-thesis-6083b.appspot.com',
    messagingSenderId: '821277137565',
    appId: '1:821277137565:web:7d79b773b169b30b961274',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
