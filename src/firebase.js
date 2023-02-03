// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxdZfk6u6LCcjcBiKRG_JCd5Qma3g3yt8",
  authDomain: "daily-tarot-7f8a8.firebaseapp.com",
  databaseURL: "https://daily-tarot-7f8a8-default-rtdb.firebaseio.com",
  projectId: "daily-tarot-7f8a8",
  storageBucket: "daily-tarot-7f8a8.appspot.com",
  messagingSenderId: "980861558412",
  appId: "1:980861558412:web:71672eca0515e1754e65a9"
};

// Initialize Firebase
// *HAVE TO CHANGE app to firebase SO THE REST OF THE CODE WORKS
const firebase = initializeApp(firebaseConfig);

export default firebase;