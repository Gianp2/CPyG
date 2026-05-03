import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4UYnCOT2d11ibIZV6yUXiI-zWsxh5xbE",
  authDomain: "cpyg-fe972.firebaseapp.com",
  projectId: "cpyg-fe972",
  storageBucket: "cpyg-fe972.firebasestorage.app",
  messagingSenderId: "855969618633",
  appId: "1:855969618633:web:dc2088d740bbfab6c08b18",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios optimizados
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };