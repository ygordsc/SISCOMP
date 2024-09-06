import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirProduto(novoProduto) {
    try {
        const docRef = await addDoc(collection(db, "produtos"), novoProduto);
        console.log(docRef.id)
    } catch (e) {
        console.error(e)
    }
}

export async function listaProdutos() {
    let retorno;
    await getDocs(collection(db, "produtos"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function deletaProduto(id) {
    await deleteDoc(doc(db, "produtos", id));
}