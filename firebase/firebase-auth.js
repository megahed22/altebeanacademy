// firebase-auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from './firebase-init.js';

const auth = getAuth(app);

// إنشاء حساب جديد
export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// تسجيل الدخول
export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// تسجيل الخروج
export const logoutUser = () => {
    return signOut(auth);
};

export { auth };
