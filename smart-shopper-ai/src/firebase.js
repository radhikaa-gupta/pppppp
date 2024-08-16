// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAD4pZnmXuqk2aIeuTO4BnCWOITBYQpAtM",
  authDomain: "smart-shopper-ai.firebaseapp.com",
  projectId: "smart-shopper-ai",
  storageBucket: "smart-shopper-ai.appspot.com",
  messagingSenderId: "57080986572",
  appId: "1:57080986572:web:66312d1e89159268573b69",
  measurementId: "G-ZYVTMGQ4YZ",
  databaseURL: "https://smart-shopper-ai-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
