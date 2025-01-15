// main.js
import { loginUser, registerUser } from './firebase-auth.js';

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    loginUser(email, password)
        .then(() => {
            window.location.href = '/teacher-dashboard.html'; // الانتقال إلى لوحة المعلم
        })
        .catch(error => alert(error.message));
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    registerUser(email, password)
        .then(() => {
            window.location.href = '/teacher-dashboard.html'; // الانتقال إلى لوحة المعلم
        })
        .catch(error => alert(error.message));
});
