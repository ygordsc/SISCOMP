import { 
    addDoc, 
    collection, 
    deleteDoc, 
    doc, 
    getDocs, 
    updateDoc
} from "firebase/firestore";
import { db } from "./firebase";

export async function inserirContato(novoContato) {
    try {
        const docRef = await addDoc(collection(db, "contatos"), novoContato);
    } catch (e) {
        console.error(e)
    }
}

export async function listaContatos() {
    let retorno;
    await getDocs(collection(db, "contatos"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function deletaContato(id) {
    await deleteDoc(doc(db, "contatos", id));
}

export async function editaContato(id, novoContato) {
    await updateDoc(doc(db, "contatos", id), novoContato);
}