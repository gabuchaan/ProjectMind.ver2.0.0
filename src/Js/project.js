import { db } from "../firebase.js";
import firebase from 'firebase/compat/app';
import { createDefaultIcon } from "../Js/user";
import { getDoc, doc, getDocs, collection, query, where, orderBy, limit, updateDoc, arrayUnion } from "firebase/firestore";

/**
 * Funcion para crear un projecto por defecto si no tienr projecto.
 * ユーザーが初めてログインしたときに初期プロジェクトを作成
 * @param {*} data
 * data = {
                name: result.user.displayName,
                uid: result.user.uid,
                e_mail: result.user.email,
                avatar: createDefaultIcon(result.user.displayName),
                created_at: firebase.firestore.FieldValue.serverTimestamp()
            }; 
 */
async function setInitProject(data) {

    //Crear un projecto en Projects
    //プロジェクトコレクションにプロジェクトを登録
    const firstProjectData = {
        name: `${data.name}'s First Project`,
        admin: data.uid,
        admin_name: data.name,
        image: `https://ui-avatars.com/api/?name=${data.name}'s First Project&background=random&rounded=true&format=svg`,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        last_connection_at: firebase.firestore.FieldValue.serverTimestamp(),
        invitation: [],
    };
    const res = await db.collection('projects').doc(firstProjectData.name + data.uid).set(firstProjectData);

    const memberParentRef = db.collection('projects').doc(firstProjectData.name + data.uid);
    const memberChildRef = memberParentRef.collection('member');

    await memberChildRef.doc(data.uid).set({
        uid: data.uid,
        name: data.name,
        avatar: data.avatar,
        role: 'admin'
    });

    //Crear un projecto en users
    //ユーザーコレクションにプロジェクトを登録
    const userParentRef = db.collection('users').doc(data.uid);
    const userChildRef = userParentRef.collection('projects');

    userChildRef.doc(firstProjectData.name + data.uid).set({
        project: firstProjectData.name + data.uid,
        name: firstProjectData.name,
        admin: data.uid,
        admin_name: data.name,
        image: `https://ui-avatars.com/api/?name=${firstProjectData.name}&background=random&rounded=true&format=svg`,
        last_connection_at: firebase.firestore.FieldValue.serverTimestamp()
    });
}

/**
 * Funcion para obtener todos los projecto del usuario.
 * @param {*} uid 
 */
async function getAllProjects(uid) {
    const docRef = collection(db, "projects");
    // const q = query(docRef, where("admin", "==", uid));
    const q = query(docRef, where("member", "array-contains", uid));
    getDocs(q).then((snapshot) => {
        let results = [];

        snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, data: doc.data() });
        });
        return results;
    });
}

async function createProject(uid, projectName, userName, avatar) {
    // crear un projecto en projecto
    const data = {
        name: projectName,
        admin: uid,
        admin_name: userName,
        image: `https://ui-avatars.com/api/?name=${projectName}&background=random&rounded=true&format=svg`,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        last_connection_at: firebase.firestore.FieldValue.serverTimestamp(),
        invitation: [],
    };
    const res = await db.collection('projects').doc(data.name + uid).set(data);

    const memberParentRef = db.collection('projects').doc(data.name + uid);
    const memberChildRef = memberParentRef.collection('member');

    await memberChildRef.doc(uid).set({
        uid: uid,
        name: userName,
        avatar: avatar,
        role: 'admin'
    });

    //Crear un projecto en users
    const userParentRef = db.collection('users').doc(uid);
    const userChildRef = userParentRef.collection('projects');

    userChildRef.doc(data.name + uid).set({
        project: data.name + uid,
        name: data.name,
        admin_name: userName,
        admin: uid,
        image: `https://ui-avatars.com/api/?name=${data.name}&background=random&rounded=true&format=svg`,
        last_connection_at: firebase.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('messages').doc(res.id).set({ project: projectName });

}

async function getRecientProject(uid) {
    const projectRef = collection(db, "projects");
    const q = query(projectRef, where("admin", "==", uid), orderBy("last_connection_at"), limit(1));
    const querySnapshot = await getDocs(q);
}

async function inviteUser(email, project_id) {
    //Buscar el usuario con el email.
    const userRef = collection(db, "users");
    const q = query(userRef, where("e_mail", "==", email), limit(1));
    const invitedUserSnapshot = await getDocs(q);

    //Si no se encontra el usuario retorna false
    if (invitedUserSnapshot.empty) return false;

    //Añadir a la lista de invitación del projecto al usuario invitado.
    const invitedUserRef = doc(db, "users", invitedUserSnapshot.docs[0].data().uid);
    await updateDoc(invitedUserRef, {
        invited: arrayUnion(project_id),
    });

    //Añadir a la lista de invitación del projecto.
    const invitationProjectRef = doc(db, "projects", project_id);
    await updateDoc(invitationProjectRef, {
        invitation: arrayUnion(invitedUserSnapshot.docs[0].data().uid),
    });
}

function getInvitedProjects(invitation) {
}

function removeProject(params) {

}

function addUser(params) {

}

function removeUser(params) {

}

function joinToProject(params) {

}

export { setInitProject, getAllProjects, createProject, removeProject, addUser, removeUser, joinToProject, getRecientProject, inviteUser, getInvitedProjects }