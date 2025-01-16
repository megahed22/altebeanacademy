import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const form = document.getElementById('teacher-register-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    try {
        // تسجيل المستخدم في Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // تخزين بيانات المستخدم في Firestore مع إضافة role كـ "teacher"
        await setDoc(doc(db, 'users', user.uid), {
            name: name,
            email: email,
            role: 'teacher', // تحديد الدور هنا
            createdAt: new Date()
        });

        console.log('تم تسجيل المعلم بنجاح');
        alert('تم تسجيلك بنجاح كمعلم');
        window.location.href = 'teacher-dashboard.html'; // التوجيه إلى لوحة المعلم
    } catch (error) {
        console.error('حدث خطأ أثناء التسجيل:', error.message);
    }
});

