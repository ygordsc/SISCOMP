import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirFornecedor(novoFornecedor) {
    try {
        const docRef = await addDoc(collection(db, "fornecedores"), novoFornecedor);
        console.log(docRef.id)
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