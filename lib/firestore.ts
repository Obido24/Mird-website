import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, type Firestore } from 'firebase/firestore';

export function collectionRef(db: Firestore, name: string) {
  return collection(db, name);
}

export async function listDocuments<T>(db: Firestore, name: string) {
  const snapshot = await getDocs(collectionRef(db, name));
  return snapshot.docs.map((entry) => ({ id: entry.id, ...(entry.data() as T) }));
}

export async function createDocument<T extends Record<string, unknown>>(db: Firestore, name: string, payload: T) {
  return addDoc(collectionRef(db, name), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function updateDocument<T extends Record<string, unknown>>(db: Firestore, name: string, id: string, payload: Partial<T>) {
  return updateDoc(doc(db, name, id), {
    ...payload,
    updatedAt: serverTimestamp()
  });
}

export async function removeDocument(db: Firestore, name: string, id: string) {
  return deleteDoc(doc(db, name, id));
}
