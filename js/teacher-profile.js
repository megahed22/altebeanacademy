// teacher-profile.js
import { auth } from './firebase-auth.js';

const teacherProfile = document.getElementById('teacherProfile');
const user = auth.currentUser;

teacherProfile.innerHTML = `
  <p>Welcome, ${user.email}</p>
  <button onclick="logoutUser()">Logout</button>
`;

function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = '/login.html';
    });
}
