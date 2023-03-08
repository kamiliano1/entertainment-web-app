import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESUREMENT_ID,
};
// Initialize Firebase for server site rendering
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); //Gdy nie ma aplikacji
// getApps.length zainicuj App ale gdy jest to po prostu ja odpal
const firestore = getFirestore(app); // dostep do firestore database
const auth = getAuth(app); // auth dla naszej app
const storage = getStorage(app);
// const app = initializeApp(firebaseConfig);

export { app, firestore, auth, storage };
