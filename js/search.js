import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

async function searchStudents(query) {
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
        if (doc.data().name.includes(query)) {
            console.log(doc.data());
        }
    });
}
