import { db } from './firebase-config.js';
import { setDoc, doc } from 'firebase/firestore';

const sosForm = document.getElementById('sos-form');

sosForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userId = auth.currentUser.uid; // الحصول على معرف المستخدم الحالي
    const issue = document.getElementById('issue').value;
    const timeStamp = new Date();

    const sosRequest = {
        user_id: userId,
        issue: issue,
        date: timeStamp,
        status: 'pending' // الحالة المبدئية هي "قيد المعالجة"
    };

    // إضافة طلب الدعم الفني إلى Firestore
    setDoc(doc(db, 'sos_requests', userId + '_' + timeStamp.getTime()), sosRequest)
        .then(() => {
            console.log('تم إرسال طلب الدعم الفني بنجاح');
            window.location.href = 'sos-success.html'; // التوجيه إلى صفحة النجاح
        })
        .catch((error) => {
            console.error('حدث خطأ أثناء إرسال الطلب:', error);
        });
});
