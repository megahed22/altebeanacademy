import { db } from './firebase-config.js';
import { doc, setDoc } from 'firebase/firestore';

const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = document.getElementById('payment-amount').value;
    const studentName = document.getElementById('student-name').value;
    const paymentId = `pay_${Date.now()}`;

    const paymentData = {
        amount: amount,
        student_name: studentName,
        date: new Date(),
        payment_id: paymentId,
        status: 'paid' // الحالة تكون مدفوعة
    };

    // إضافة بيانات الدفع إلى Firestore
    setDoc(doc(db, 'payments', paymentId), paymentData)
        .then(() => {
            console.log('تم الدفع بنجاح');
            window.location.href = 'payment-success.html'; // توجيه إلى صفحة النجاح
        })
        .catch((error) => {
            console.error('حدث خطأ أثناء معالجة الدفع:', error);
        });
});
