import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAgqj12nPyzmI1XKhNpGD-iim0x9lmGCPI",
  authDomain: "siscomp-pb.firebaseapp.com",
  projectId: "siscomp-pb",
  storageBucket: "siscomp-pb.appspot.com",
  messagingSenderId: "128983827083",
  appId: "1:128983827083:web:56c52c626bf0e30d334a8e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
