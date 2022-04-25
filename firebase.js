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

// Kelly's Setting 
// const firebaseConfig = {
//     apiKey: "AIzaSyAH0MxAlt48mJsI6ZdZJqzOkC2rUhrZmLo",
//     authDomain: "foodify-auth.firebaseapp.com",
//     projectId: "foodify-auth",
//     storageBucket: "foodify-auth.appspot.com",
//     messagingSenderId: "988705571302",
////      appId: "1:988705571302:web:fe62c5287272bf9bc7d627"
//   };  

// Daddy's firebase auth project info
const firebaseConfig = {
  apiKey: "AIzaSyCbPwFumgg5-t6WqhA5x7WRMpXH2Wbj-9U",
  authDomain: "fireproject-beb1f.firebaseapp.com",
  projectId: "fireproject-beb1f",
  storageBucket: "fireproject-beb1f.appspot.com",
  messagingSenderId: "23891835850",
  appId: "1:23891835850:web:5b37d7901dd16f5bb92d33"
};

  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = firebase.auth();
export { auth };
export const firestore = firebase.firestore();

export const createUserDocument = async (user, firstName, lastName) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapsnot.exists) {
      const {fname} = firstName;
      const {lname} = lastName;
   
      try {
          userRef.set({
            fname,
            lname,
            createdAt:new Date(),
          });
      } catch (error) {
          console.log('Error in creating user', error);
      }
   }
};

