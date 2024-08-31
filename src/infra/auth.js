import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";


export async function login(email, password, admin) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (admin) {
                localStorage.setItem("admin", true);
                window.location.href = "/home";
            } else {
                localStorage.setItem("logado", true);
                window.location.href = "/home";
            }
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


export async function registrar(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            console.log(email)
            console.log(password)
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
