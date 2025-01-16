import { db } from './firebase-config.js';
import { setDoc, doc } from 'firebase/firestore';

const zoomSessionForm = document.getElementById('zoom-session-form');

zoomSessionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const sessionTopic = document.getElementById('session-topic').value;
    const sessionDate = document.getElementById('session-date').value;
    const sessionTime = document.getElementById('session-time').value;
    const teacherId = auth.currentUser.uid; // معرف المعلم الحالي
    const sessionId = `zoom_${Date.now()}`;

    const zoomSessionData = {
        topic: sessionTopic,
        date: sessionDate,
        time: sessionTime,
        teacher_id: teacherId,
        session_id: sessionId,
        status: 'scheduled' // الحالة المبدئية للجلسة هي "مجدولة"
    };

    // إضافة الجلسة إلى Firestore
    setDoc(doc(db, 'zoom_sessions', sessionId), zoomSessionData)
        .then(() => {
            console.log('تم جدولة الجلسة بنجاح');
            window.location.href = 'zoom-session-success.html'; // التوجيه إلى صفحة النجاح
        })
        .catch((error) => {
            console.error('حدث خطأ أثناء جدولة الجلسة:', error);
        });
});
