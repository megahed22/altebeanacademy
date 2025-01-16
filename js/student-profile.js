import { auth, db } from './firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';

const studentProfile = document.querySelector('.student-profile');

// التحقق من حالة تسجيل الدخول
auth.onAuthStateChanged((user) => {
  if (user && user.displayName === 'student') {
    // استرجاع بيانات الطالب من Firestore
    getDoc(doc(db, 'users', user.uid))
      .then((docSnap) => {
        if (docSnap.exists()) {
          const studentData = docSnap.data();
          studentProfile.innerHTML = `
            <h2>بروفايل الطالب</h2>
            <p>الاسم: ${studentData.name}</p>
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
