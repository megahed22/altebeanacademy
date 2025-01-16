import { auth, db } from './firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';

const teacherDashboard = document.querySelector('.teacher-dashboard');

// التحقق من حالة تسجيل الدخول
auth.onAuthStateChanged((user) => {
    if (user && user.displayName === 'teacher') {
        // استرجاع بيانات المعلم من Firestore
        getDoc(doc(db, 'users', user.uid))
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const teacherData = docSnap.data();
                    teacherDashboard.innerHTML = `
            <h2>مرحبًا بك، ${teacherData.name}</h2>
            <p>التخصص: ${teacherData.specialization || 'غير محدد'}</p>
            <p>عدد الجلسات: ${teacherData.sessionsCount || 0}</p>
            <p>الإيرادات: ${teacherData.earnings || 0}</p>
          `;
                } else {
                    console.log('لا توجد بيانات للمعلم');
                }
            })
            .catch((error) => {
                console.error('حدث خطأ أثناء استرجاع بيانات المعلم:', error);
            });
    } else {
        window.location.href = 'login.html'; // إذا كان المستخدم غير مسجل الدخول أو ليس معلمًا
    }
});
