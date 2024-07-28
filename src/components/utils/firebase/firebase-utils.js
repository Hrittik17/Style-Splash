import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    getDocs,
    query,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfb_wjdlqj3-T_ZkQ3oC3_fQts9OTxcNU",
    authDomain: "style-splash-82d6d.firebaseapp.com",
    projectId: "style-splash-82d6d",
    storageBucket: "style-splash-82d6d.appspot.com",
    messagingSenderId: "254649460110",
    appId: "1:254649460110:web:7e0f1caceef9a74ec3b0df"
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();

export const addCollectionsAndDocuments = async(collectionKey, objectsToAdd)=>{
    const collectionRef = collection(db,collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef,object.title.toLowerCase())
        batch.set(docRef,object)
    });

    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async()=>{
    const collectionRef = collection(db,'categories')
    const q = query(collectionRef)

    const querySnapshot = getDocs(q)
    const categoriesMap = (await querySnapshot).docs.reduce((acc,docSnapshot)=>{
        const {items,title} = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    },{})
    return categoriesMap;
}

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.error('Error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const SignoutUsers = async()=> await signOut(auth)

export const onAuthStateChangedListener = (callback)=>{
    onAuthStateChanged(auth,callback);
}