// firestore.js
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import app from './firebase-init.js';

const db = getFirestore(app);

// جلب البيانات من مجموعة
export const fetchData = async (collectionName) => {
    const querySnapshot = await getDocs(collection(collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
};

// إضافة أو تحديث البيانات
export const saveData = async (collectionName, data) => {
    await setDoc(doc(db, collectionName, data.id), data);
};
