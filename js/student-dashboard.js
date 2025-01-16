import { auth, db } from './firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';

const studentDashboard = document.querySelector('.student-dashboard');

// التحقق من حالة تسجيل الدخول
auth.onAuthStateChanged((user) => {
    if (user && user.displayName === 'student') {
        // استرجاع بيانات الطالب من Firestore
        getDoc(doc(db, 'users', user.uid))
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const studentData = docSnap.data();
                    studentDashboard.innerHTML = `
            <h2>مرحبًا بك، ${studentData.name}</h2>
            <p>عدد الجلسات: ${studentData.sessionsCount || 0}</p>
            <p>التخصص: ${studentData.specialization || 'غير محدد'}</p>
            <p>الإيرادات: ${studentData.earnings || 0}</p>
          `;
                } else {
                    console.log('لا توجد بيانات للطالب');
                }
            })
            .catch((error) => {
                console.error('حدث خطأ أثناء استرجاع بيانات الطالب:', error);
            });
    } else {
        window.location.href = 'login.html'; // إذا كان المستخدم غير مسجل الدخول أو ليس طالبًا
    }
});
