// استيراد الوظائف التي تحتاج إليها من SDK الخاصة بـ Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // لاستعمال المصادقة
import { getFirestore } from "firebase/firestore";  // لاستعمال Firestore
import { getStorage } from "firebase/storage";  // لاستعمال Firebase Storage إذا كان مطلوبًا

// تكوين Firebase لتطبيقك
const firebaseConfig = {
    apiKey: "AIzaSyAtImiW_CiyzDqypdI4Ve8KIOqxC9TGRQE",
    authDomain: "taleem-6c9b2.firebaseapp.com",
    projectId: "taleem-6c9b2",
    storageBucket: "taleem-6c9b2.firebasestorage.app",
    messagingSenderId: "746506526783",
    appId: "1:746506526783:web:2f2c24a0661f3c2bbc588a"
};

// تهيئة Firebase باستخدام التكوين
const app = initializeApp(firebaseConfig);

// تهيئة Firebase Authentication
const auth = getAuth(app);

// تهيئة Firestore
const db = getFirestore(app);

// تهيئة Firebase Storage (إذا كان مطلوبًا في مشروعك)
const storage = getStorage(app);

// تصدير الوحدات حتى يمكنك استخدامها في الملفات الأخرى
export { auth, db, storage };
