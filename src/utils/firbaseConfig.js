import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDotF8T3FzSKOBEDUruFfVZNfCZIyYy4nU",
  authDomain: "sociallogin-f1ac3.firebaseapp.com",
  projectId: "sociallogin-f1ac3",
  storageBucket: "sociallogin-f1ac3.appspot.com",
  messagingSenderId: "892632045843",
  appId: "1:892632045843:web:b3505122689157db4162e6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const googleLogIn = new GoogleAuthProvider();
const facebookLogIn = new FacebookAuthProvider();
//const phoneLogIn = new signInWithPhoneNumber();
const phoneLogIn = "";

export { auth, googleLogIn, facebookLogIn, phoneLogIn };
