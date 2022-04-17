import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAhmIf3tw1qh49bXiGJYCrwdaw-lKMJj0w",
  authDomain: "idesign-1c137.firebaseapp.com",
  projectId: "idesign-1c137",
  storageBucket: "idesign-1c137.appspot.com",
  messagingSenderId: "102060250508",
  appId: "1:102060250508:web:ac531f549e6ca8d06932a9",
  measurementId: "G-X6WTKZD8C2",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
const analytics = getAnalytics();
logEvent(analytics, "webapp_initialized");

export const signInWithGoogle = async () => signInWithPopup(auth, provider);
