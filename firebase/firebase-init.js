// firebase-init.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAtImiW_CiyzDqypdI4Ve8KIOqxC9TGRQE",
    authDomain: "taleem-6c9b2.firebaseapp.com",
    projectId: "taleem-6c9b2",
    storageBucket: "taleem-6c9b2.firebasestorage.app",
    messagingSenderId: "746506526783",
    appId: "1:746506526783:web:2f2c24a0661f3c2bbc588a"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تصدير التهيئة للاستخدام في باقي الملفات
export default app;
