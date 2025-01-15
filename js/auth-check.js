import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // إذا لم يكن المستخدم مسجلاً، يتم توجيهه إلى صفحة تسجيل الدخول
        window.location.href = "login.html";
    } else {
        // إذا كان المستخدم مسجلاً، تحميل بياناته
        loadUserData(user.uid);
    }
});

async function loadUserData(userId) {
    // جلب بيانات المستخدم من Firestore
    const userRef = doc(db, "students", userId);  // أو "teachers" بناءً على نوع المستخدم
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        const userData = userDoc.data();
        // قم بملء الصفحة بالبيانات التي تم جلبها
        document.getElementById("user-name").textContent = userData.name;
        // استكمال باقي البيانات
    }
}
