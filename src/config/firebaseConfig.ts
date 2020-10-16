// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { showToast } from "../components/Toast";

const config = {
  apiKey: "AIzaSyCLF8Qev0TegWjyHW2mMo7jXfk9xvzmrPA",
  authDomain: "kuisoner-f1b38.firebaseapp.com",
  databaseURL: "https://kuisoner-f1b38.firebaseio.com",
  projectId: "kuisoner-f1b38",
  storageBucket: "kuisoner-f1b38.appspot.com",
  messagingSenderId: "488530775572",
  appId: "1:488530775572:web:ae80a22e3477abb97fe101",
};

firebase.initializeApp(config);

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
}

export async function loginUser(username: string, password: string) {
  const email = `${username}@gmail.com`;
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return res;
  } catch (error) {
    showToast(error.message, 3000);
    return false;
  }
}

export async function registerUser(username: string, password: string) {
  const email = `${username}@gmail.com`;
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log("res", res);
    return true;
  } catch (error) {
    showToast(error.message, 3000);
    return false;
  }
}

export function logoutUser() {
  return firebase.auth().signOut();
}
