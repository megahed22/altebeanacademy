// student-profile.js
import { auth } from './firebase-auth.js';

const studentProfile = document.getElementById('studentProfile');
const user = auth.currentUser;

studentProfile.innerHTML = `
  <p>Welcome, ${user.email}</p>
  <button onclick="logoutUser()">Logout</button>
`;

function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = '/login.html';
    });
}
