// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "video-a0c78.firebaseapp.com",
  projectId: "video-a0c78",
  storageBucket: "video-a0c78.appspot.com",
  messagingSenderId: "668697127894",
  appId: "1:668697127894:web:fd956102804ea7182b5277",
  measurementId: "G-5KDB6J1VK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth()
export const provider=new GoogleAuthProvider()
export default app;