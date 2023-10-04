// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// -------------------- Project Mind -----------------------
// const firebaseApp = firebase.initializeApp( {
//   apiKey: "AIzaSyAbeEiLSz597a7rHRm1j99QijyGshvW7FA",
//   authDomain: "projectmind-50773.firebaseapp.com",
//   projectId: "projectmind-50773",
//   storageBucket: "projectmind-50773.appspot.com",
//   messagingSenderId: "1066467749405",
//   appId: "1:1066467749405:web:e2d933a8cf5b0d3b89e0f4",
//   measurementId: "G-VFW1D8MMDB",
//   // storageBucket: 'gs://projectmind-50773.appspot.com',
// });

// -------------------- Project Test -----------------------
const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyCzixzR_dMCFV5Ii2jX9OZuWL5OCCRxRRk",
  authDomain: "project-mind-d6281.firebaseapp.com",
  projectId: "project-mind-d6281",
  storageBucket: "project-mind-d6281.appspot.com",
  messagingSenderId: "972075532522",
  appId: "1:972075532522:web:3af516014b116afdae9793",
  measurementId: "G-EQL9T8H18P"
});

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = getStorage(firebaseApp);
export { db, auth, storage }