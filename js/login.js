iimport { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// إعداد Firestore
const db = getFirestore();

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // تسجيل الدخول
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // استرداد معلومات الدور من Firestore
        const userDoc = doc(db, "users", user.uid); // "users" هو اسم المجموعة في Firestore
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();

            // تحقق من الدور
            if (userData.role === "teacher") {
                window.location.href = "teacher-dashboard.html";
            } else if (userData.role === "student") {
                window.location.href = "student-dashboard.html";
            } else {
                console.error("Role not recognized.");
            }
        } else {
            console.error("User role not found in database.");
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
    }
});
