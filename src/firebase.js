import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyB_jI2sT8fmsxyJlqAeHhHlel2fWNsDTJ8",
  authDomain: "album-a60a6.firebaseapp.com",
  databaseURL: "https://album-a60a6.firebaseio.com",
  projectId: "album-a60a6",
  storageBucket: "album-a60a6.appspot.com",
  messagingSenderId: "585207541873",
  appId: "1:585207541873:web:e34cf7451d4e8e83f6ebd0",
  measurementId: "G-QX9P17VXCX"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();

export function snapshotToArray(snapshot) {
  const updated_array = snapshot.docs.map(a => {
    const object = {
      id: a.id,
      title: a.data().title,
      image: a.data().image
    };
    return object;
  });
  return updated_array;
}
