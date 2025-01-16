import { auth, db } from './firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';

const studentDashboard = document.querySelector('.student-dashboard');

// التحقق من حالة تسجيل الدخول
auth.onAuthStateChanged((user) => {
    if (user) {
        // استرجاع بيانات المستخدم من Firestore للتحقق من الدور
        getDoc(doc(db, 'users', user.uid))
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const role = userData.role; // استرجاع الدور من البيانات

                    if (role === 'student') {
                        // استعراض بيانات الطالب
                        studentDashboard.innerHTML = `
                            <h2>مرحبًا بك، ${userData.name}</h2>
                            <p>الصف الدراسي: ${userData.grade || 'غير محدد'}</p>
                            <p>العدد الإجمالي للجلسات: ${userData.sessionsCount || 0}</p>
                        `;
                    } else {
                        // في حال كان المستخدم ليس طالبًا
                        window.location.href = 'login.html'; // توجيه إلى صفحة تسجيل الدخول
                    }
                } else {
                    console.log('لا توجد بيانات للمستخدم');
                }
            })
            .catch((error) => {
                console.error('حدث خطأ أثناء استرجاع بيانات الطالب:', error);
            });
    } else {
        // إذا لم يكن المستخدم مسجل الدخول
        window.location.href = 'login.html'; // توجيه إلى صفحة تسجيل الدخول
    }
});
