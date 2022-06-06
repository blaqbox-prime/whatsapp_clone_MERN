// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAkwDOH7bx_ZpOqVAy-AFr7vUqTFEfNrSw",
  authDomain: "whatsapp-clone-445.firebaseapp.com",
  projectId: "whatsapp-clone-445",
  storageBucket: "whatsapp-clone-445.appspot.com",
  messagingSenderId: "667555536286",
  appId: "1:667555536286:web:0dc9abec17462cb3d38a8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
