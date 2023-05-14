import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig={
    apiKey: "AIzaSyDEbHB78X5vS0BidBgETfiNf4At52Rxw2g",
  authDomain: "wallet-961ed.firebaseapp.com",
  projectId: "wallet-961ed",
  storageBucket: "wallet-961ed.appspot.com",
  messagingSenderId: "759050809525",
  appId: "1:759050809525:web:2ffd01723399b250b68efc",
  measurementId: "G-N14PBXYHZB"
};

if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}