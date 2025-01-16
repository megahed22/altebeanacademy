import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'firebase/auth';

// التحقق من حالة تسجيل الدخول وتوجيه المستخدم
onAuthStateChanged(auth, (user) => {
    if (user) {
        const role = user.displayName; // استخدم displayName لتحديد الدور
        if (role === 'teacher') {
            window.location.href = 'teacher-dashboard.html'; // التوجيه إلى لوحة المعلم
        } else if (role === 'student') {
            window.location.href = 'student-dashboard.html'; // التوجيه إلى لوحة الطالب
        }
    } else {
        window.location.href = 'login.html'; // إذا لم يكن المستخدم مسجلاً للدخول
    }
});
