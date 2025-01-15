// student-dashboard.js
import { fetchData } from './firestore.js';

const studentDataContainer = document.getElementById('studentData');

fetchData('students').then(data => {
    data.forEach(student => {
        const div = document.createElement('div');
        div.innerHTML = `<p>${student.name}</p>`;
        studentDataContainer.appendChild(div);
    });
});
