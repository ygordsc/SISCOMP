import {
    addDoc,
    collection, 
    deleteDoc, 
    doc, 
    getDocs, 
    updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function inserirCotacao(novaCotacao) {
    try {
        const docRef = await addDoc(collection(db, "cotacoes"), novaCotacao);
    } catch (e) {
        console.error(e)
    }
}

export async function listaCotacoes() {
    let retorno;
    await getDocs(collection(db, "cotacoes"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function deletaCotacao(id) {
    await deleteDoc(doc(db, "cotacoes", id));
}

