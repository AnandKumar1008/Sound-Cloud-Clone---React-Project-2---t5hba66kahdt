// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP-yCSt1bnND9kN2cmfK2zaYNnn_ZzaiQ",
  authDomain: "soundcloudclone-85e36.firebaseapp.com",
  projectId: "soundcloudclone-85e36",
  storageBucket: "soundcloudclone-85e36.appspot.com",
  messagingSenderId: "190580761882",
  appId: "1:190580761882:web:de78daa35d95764f25b8a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const db = getFirestore(app);
export { auth, provider };
