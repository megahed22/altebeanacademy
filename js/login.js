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
            console.log('تم تسجيل الدخول بنجاح');

            // استرجاع بيانات المستخدم من Firestore للتحقق من الدور
            const userRef = doc(db, 'users', user.uid);
            getDoc(userRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        const role = userData.role; // استخراج الدور من البيانات

                        // التوجيه بناءً على الدور
                        if (role === 'teacher') {
                            window.location.href = 'teacher-dashboard.html'; // توجيه المعلم إلى لوحة المعلم
                        } else if (role === 'student') {
                            window.location.href = 'student-dashboard.html'; // توجيه الطالب إلى لوحة الطالب
                        } else {
                            console.log('دور غير معروف');
                        }
                    } else {
                        console.log('لا توجد بيانات للمستخدم');
                    }
                })
                .catch((error) => {
                    console.error('حدث خطأ أثناء استرجاع بيانات المستخدم:', error.message);
                });
        })
        .catch((error) => {
            console.error('حدث خطأ أثناء تسجيل الدخول:', error.message);
            alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        });
});
