import {
    addDoc,
    collection, 
    deleteDoc, 
    doc, 
    getDocs, 
    updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function inserirRequisicao(novaRequisicao) {
    try {
        const docRef = await addDoc(collection(db, "requisicoes"), novaRequisicao);
    } catch (e) {
        console.error(e)
    }
}

export async function listaRequisicoes() {
    let retorno;
    await getDocs(collection(db, "requisicoes"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function deletaRequisicao(id) {
    await deleteDoc(doc(db, "requisicoes", id));
}

export async function editaRequisicao(id, novaRequisicao) {
    await updateDoc(doc(db, "requisicoes", id), novaRequisicao);
}