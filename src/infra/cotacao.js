import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirCotacao(novaCotacao) {
    try {
        const docRef = await addDoc(collection(db, "cotacao"), novaCotacao);
        console.log(docRef.id)
    } catch (e) {
        console.error(e)
    }
}

export async function listaCotacoes() {
    let retorno;
    await getDocs(collection(db, "cotacao"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}