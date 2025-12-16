// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6EmZ6OIXft2rA60fFShFmYlpJ_R-5_Ug",
  authDomain: "lockthard.firebaseapp.com",
  projectId: "lockthard",
  storageBucket: "lockthard.firebasestorage.app",
  messagingSenderId: "553851052655",
  appId: "1:553851052655:web:3af1f42335c400c50239a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
