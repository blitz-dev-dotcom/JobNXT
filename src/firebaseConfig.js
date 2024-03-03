
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDcCcCvahRtZU338jPwWPSxv3D7IAffZOs",
  authDomain: "jobnxt-ec54f.firebaseapp.com",
  projectId: "jobnxt-ec54f",
  storageBucket: "jobnxt-ec54f.appspot.com",
  messagingSenderId: "176360515720",
  appId: "1:176360515720:web:544fe8300dc39fb929973d",
  measurementId: "G-NQQCT0VJS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const database = getDatabase(app);