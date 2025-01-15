import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const teacherRegisterForm = document.getElementById('teacher-register-form');

teacherRegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('تم التسجيل بنجاح:', user);
        })
        .catch((error) => {
            console.error('حدث خطأ أثناء التسجيل:', error);
        });
});
