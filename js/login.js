import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('تم تسجيل الدخول بنجاح');

            // التوجيه بناءً على الدور
            const role = user.displayName === 'teacher' ? 'teacher-dashboard.html' : 'student-dashboard.html';
            window.location.href = role;
        })
        .catch((error) => {
            console.error('حدث خطأ أثناء تسجيل الدخول:', error.message);
        });
});
