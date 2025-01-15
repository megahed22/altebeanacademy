import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const studentRegisterForm = document.getElementById('student-register-form');

studentRegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;
    const password = document.getElementById('student-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('تم التسجيل بنجاح:', user);
        })
        .catch((error) => {
            console.error('حدث خطأ أثناء التسجيل:', error);
        });
});
