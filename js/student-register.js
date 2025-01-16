import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const registerForm = document.getElementById('student-register-form');
const messageContainer = document.querySelector('.message-container');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // التحقق من البيانات
    if (name && email && password) {
        // التسجيل في Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userRef = doc(db, 'users', user.uid);

                // حفظ بيانات المستخدم في Firestore
                setDoc(userRef, {
                    name: name,
                    email: email,
                    role: 'student', // تحديد الدور كطالب
                    createdAt: new Date(),
                    profilePicture: '', // يمكنك إضافة صورة بعد تحميلها
                    sessionsCount: 0,
                }).then(() => {
                    messageContainer.innerHTML = `
                        <div class="message success">
                            تم تسجيلك كطالب بنجاح! شكراً لاختيارك الأكاديمية.
                        </div>
                    `;
                    setTimeout(() => {
                        window.location.href = 'login.html'; // إعادة التوجيه إلى صفحة تسجيل الدخول
                    }, 3000);
                });
            })
            .catch((error) => {
                messageContainer.innerHTML = `
                    <div class="message error">
                        ${error.message}
                    </div>
                `;
            });
    } else {
        messageContainer.innerHTML = `
            <div class="message error">
                يرجى ملء جميع الحقول.
            </div>
        `;
    }
});
