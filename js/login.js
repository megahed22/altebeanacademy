import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // التحقق من الدور من خلال Firestore
            getDoc(doc(db, 'users', user.uid))
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        const role = userData.role; // الحصول على الدور من Firestore

                        // التوجيه بناءً على الدور
                        if (role === 'teacher') {
                            window.location.href = 'teacher-dashboard.html'; // التوجيه إلى لوحة المعلم
                        } else if (role === 'student') {
                            window.location.href = 'student-dashboard.html'; // التوجيه إلى لوحة الطالب
                        }
                    } else {
                        console.error('لم يتم العثور على بيانات المستخدم في Firestore');
                    }
                })
                .catch((error) => {
                    console.error('حدث خطأ أثناء استرجاع بيانات الدور:', error);
                });
        })
        .catch((error) => {
            console.error('حدث خطأ أثناء تسجيل الدخول:', error.message);
        });
});
