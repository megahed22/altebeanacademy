import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

async function fetchPayments() {
    const userDoc = await getDoc(doc(db, "students", "student-id")); // استبدل بـ "student-id"
    if (userDoc.exists()) {
        const data = userDoc.data();
        const paymentsTable = document.getElementById("payments-table").getElementsByTagName('tbody')[0];

        data.payments.forEach(payment => {
            let row = paymentsTable.insertRow();
            row.insertCell(0).textContent = payment.month;
            row.insertCell(1).textContent = payment.amount;
            row.insertCell(2).textContent = payment.status;
            let buttonCell = row.insertCell(3);
            buttonCell.innerHTML = `<button onclick="completePayment()">إتمام الدفع</button>`;
        });
    }
}

function completePayment() {
    // إتمام الدفع
}

fetchPayments();
