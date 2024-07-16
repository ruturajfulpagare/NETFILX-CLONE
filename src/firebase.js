import { initializeApp } from "firebase/app";
import { 
     createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
     
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB4R1gInfOKgPyhxX36rQstYJMk5R78als",
  authDomain: "netfilx-clone-71a66.firebaseapp.com",
  projectId: "netfilx-clone-71a66",
  storageBucket: "netfilx-clone-71a66.appspot.com",
  messagingSenderId: "560984353325",
  appId: "1:560984353325:web:24faaf88c102cf09f266a4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};