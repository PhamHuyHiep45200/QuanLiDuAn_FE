// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEtMRB0dY3Gol0LfnJbtDlxewqSNHPk4Y",
  authDomain: "quanlicongviec-82228.firebaseapp.com",
  projectId: "quanlicongviec-82228",
  storageBucket: "quanlicongviec-82228.appspot.com",
  messagingSenderId: "425810065506",
  appId: "1:425810065506:web:47151e631d8cf579d8793b",
  measurementId: "G-M181VBY47W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
