// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtImiW_CiyzDqypdI4Ve8KIOqxC9TGRQE",
    authDomain: "taleem-6c9b2.firebaseapp.com",
    projectId: "taleem-6c9b2",
    storageBucket: "taleem-6c9b2.firebasestorage.app",
    messagingSenderId: "746506526783",
    appId: "1:746506526783:web:2f2c24a0661f3c2bbc588a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);