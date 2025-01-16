import { auth, db } from './firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';

const teacherDashboard = document.querySelector('.teacher-dashboard');

// التحقق من حالة تسجيل الدخول
auth.onAuthStateChanged((user) => {
    if (user) {
        // استرجاع بيانات المستخدم من Firestore للتحقق من الدور
        getDoc(doc(db, 'users', user.uid))
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const role = userData.role; // استرجاع الدور من البيانات

                    if (role === 'teacher') {
                        // استعراض بيانات المعلم
                        teacherDashboard.innerHTML = `
                            <h2>مرحبًا بك، ${userData.name}</h2>
                            <p>التخصص: ${userData.specialization || 'غير محدد'}</p>
                            <p>عدد الجلسات: ${userData.sessionsCount || 0}</p>
                            <p>الإيرادات: ${userData.earnings || 0}</p>
                        `;
                    } else {
                        // في حال كان المستخدم ليس معلمًا
                        window.location.href = 'login.html'; // توجيه إلى صفحة تسجيل الدخول
                    }
                } else {
                    console.log('لا توجد بيانات للمستخدم');
                }
            })
            .catch((error) => {
                console.error('حدث خطأ أثناء استرجاع بيانات المعلم:', error);
            });
    } else {
        // إذا لم يكن المستخدم مسجل الدخول
        window.location.href = 'login.html'; // توجيه إلى صفحة تسجيل الدخول
    }
});
