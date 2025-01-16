import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const form = document.getElementById('student-register-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    try {
        // تسجيل المستخدم في Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // تخزين بيانات المستخدم في Firestore مع إضافة role كـ "student"
        await setDoc(doc(db, 'users', user.uid), {
            name: name,
            email: email,
            role: 'student', // تحديد الدور هنا
            createdAt: new Date()
        });

        console.log('تم تسجيل الطالب بنجاح');
        alert('تم تسجيلك بنجاح كطالب');
        window.location.href = 'student-dashboard.html'; // التوجيه إلى لوحة الطالب
    } catch (error) {
        console.error('حدث خطأ أثناء التسجيل:', error.message);
    }
});
