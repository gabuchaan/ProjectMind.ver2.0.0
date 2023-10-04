import { auth, db } from "../firebase.js";
import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { Link, useNavigate } from "react-router-dom";
import { setInitProject } from "./project.js";


function getAuthUser() {
    const user = auth.currentUser;
    return user;
}

async function getUserFromAuth(uid) {
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();
    return doc.data();
}

function createDefaultIcon(name) {
    const image = `https://ui-avatars.com/api/?name=${name}&background=random&rounded=true&format=svg`;
    return image
}

async function getUser(uid) {
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();

    return doc.data();
}

/**
 * Sign in with google
 * @param {*} navigate 
 */
const signInWithGoogle = async (navigate) => {

    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        console.log(result);
        if (result.user !== null) {
            const data = {
                name: result.user.displayName,
                uid: result.user.uid,
                e_mail: result.user.email,
                avatar: createDefaultIcon(result.user.displayName),
                created_at: firebase.firestore.FieldValue.serverTimestamp()
            };
            const userRef = db.collection('users').doc(result.user.uid);
            const user = await userRef.get();
            console.log(user);

            // Si no existe el usuario se registra en el db
            //　ユーザーが未登録の場合は登録・イニシャルプロジェクトを作成。
            if (!user.exists) {
                const res = await db.collection('users').doc(data.uid).set(data);

                await setInitProject(data);
            }
                navigate("/dashboard");
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
    }
}

const registerInApplication = async (auth, email, password, name, navigate) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const avatar = await createDefaultIcon(name);
        const displayName = name;
        const uid = result.user.reloadUserInfo.localId;;
        const eMail = result.user.email;
        const data = {
            name: displayName,
            uid: uid,
            e_mail: eMail,
            avatar: avatar,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        };

        const res = await db.collection('users').doc(uid).set(data);
        setInitProject(uid, displayName, data.avatar);
        navigate("/dashboard");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    }
}

/**
     * Registrar a la aplicación
     */
function registerInApplication1() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('userName').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (user) => {
            const displayName = name;
            const uid = user.user.reloadUserInfo.localId;;
            const eMail = user.user.email;
            const data = {
                name: displayName,
                uid: uid,
                e_mail: eMail,
                avatar: createDefaultIcon(name),
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
            };

            const res = await db.collection('users').doc(uid).set(data);
            setInitProject(uid, displayName);
            // useNavigate("dashboard");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}


export { getAuthUser, createDefaultIcon, getUserFromAuth, getUser, signInWithGoogle, registerInApplication }