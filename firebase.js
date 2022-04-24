// Import the functions you need from the SDKs you need
// import {initializeApp}  from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// import firebase from 'firebase/compat/app';
// import "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries
// import * as firebase from "firebase";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
// XXX 
// - make sure the following config copied from your firebase google project.
// XXX

const firebaseConfig = {
    apiKey: "AIzaSyAH0MxAlt48mJsI6ZdZJqzOkC2rUhrZmLo",
    authDomain: "foodify-auth.firebaseapp.com",
    projectId: "foodify-auth",
    storageBucket: "foodify-auth.appspot.com",
    messagingSenderId: "988705571302",
    appId: "1:988705571302:web:fe62c5287272bf9bc7d627"
  };  

  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = firebase.auth();
export { auth };
