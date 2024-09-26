import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";

export async function login(email, password, setAcesso) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setAcesso(true);
            window.location.href = "/home";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}


export async function logout() {
    const auth = getAuth();
    localStorage.setItem("logado", false);
    localStorage.setItem("admin", false);
    signOut(auth).then(() => {

    }).catch((error) => {
        console.error(error)
    });
}


export async function registrar(email, password, setAcesso) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            setAcesso(true);
            window.location.href = "/home";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}