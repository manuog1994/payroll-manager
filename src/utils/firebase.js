import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBH4nUxjHsQfLuqjfq7SgAtxCM3KhxKfe0",
    authDomain: "payroll-managment.firebaseapp.com",
    projectId: "payroll-managment",
    storageBucket: "payroll-managment.appspot.com",
    messagingSenderId: "495380687989",
    appId: "1:495380687989:web:2caf2e16b2987bbaaa1c3c"
};

firebase.initializeApp(firebaseConfig);

//Utils

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

//Exports

export { auth, storage, db };