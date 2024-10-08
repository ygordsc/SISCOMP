import { 
    addDoc, 
    collection, 
    deleteDoc, 
    doc, 
    getDocs,
    updateDoc
} from "firebase/firestore";
import { db } from "./firebase";

export async function inserirFornecedor(novoFornecedor) {
    try {
        const docRef = await addDoc(collection(db, "fornecedores"), novoFornecedor);
    } catch (e) {
        console.error(e)
    }
}

export async function listaFornecedores() {
    let retorno;
    await getDocs(collection(db, "fornecedores"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function deletaFornecedor(id) {
    await deleteDoc(doc(db, "fornecedores", id));
}

export async function editaFornecedor(id, novoFornecedor) {
    await updateDoc(doc(db, "fornecedores", id), novoFornecedor);
}