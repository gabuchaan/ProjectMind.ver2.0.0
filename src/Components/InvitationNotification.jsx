
import React from "react";
import { getDoc, doc, getDocs, collection, query, where, orderBy, limit, updateDoc, arrayUnion, arrayRemove, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { log } from "util";
import firebase from 'firebase/compat/app';

const InvitationNotification = (props) => {

    async function joinToProject() {
        props.setShowNotifications(false); // Actualiza el estado de showNotifications a false

        const invitedUserRef = doc(db, "users", props.userId);
        await updateDoc(invitedUserRef, {
            invited: arrayRemove(props.project.id),
        });

        const parentDocRef = db.collection("users").doc(props.userId);
        const subCollectionRef = parentDocRef.collection("projects");

        // const invitedUserProjectsRef = invitedUserRef.collection("projects");
        subCollectionRef.doc(props.project.id).set({
            project: props.project.id,
            name: props.project.data.name,
            admin: props.project.data.admin,
            image: props.project.data.image,
            last_connection_at: firebase.firestore.FieldValue.serverTimestamp()
        });

        const joinProjectRef = doc(db, "projects", props.project.id);
        await updateDoc(joinProjectRef, {
            invitation: arrayRemove(props.userId)
        });

        const memberParentRef = db.collection('projects').doc(props.project.id);
        const memberChildRef = memberParentRef.collection('member');

        await memberChildRef.doc(props.userId).set({
            uid: props.userId,
            name: props.user.name,
            avatar: props.user.avatar,
            role: null
        });

        const element = document.getElementById('toast-message-cta');
        element.remove();
    }

    async function rejectProject() {
        props.setShowNotifications(false); // Actualiza el estado de showNotifications a false
        const invitedUserRef = doc(db, "users", props.userId);
        await updateDoc(invitedUserRef, {
            invited: arrayRemove(props.project.id),
        });

        const joinProjectRef = doc(db, "projects", props.project.id);
        await updateDoc(joinProjectRef, {
            invitation: arrayRemove(props.userId)
        })
    }

    function handleDimiss() {
        props.setShowNotifications(false); // Actualiza el estado de showNotifications a false
    }

    //------------------------------------------
    //--------------- COMPONENT ----------------
    //------------------------------------------
    return (
        <>
            <div id="toast-message-cta" className="hover:scale-105 hover:shadow-lg cursor-pointer transition-all w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                <div className="flex">
                    <img className="w-8 h-8 rounded-full shadow-lg" src="https://tecdn.b-cdn.net/img/new/avatars/3.webp" alt="Jese Leos image" />
                    <div className="ml-3 text-sm font-normal">
                        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{props.project.data.admin_name}</span>
                        <div className="mb-2 text-sm font-normal">{props.project.data.name}</div>
                        <a onClick={joinToProject} href="#" className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">Accept</a>
                        <a onClick={rejectProject} href="#" className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ml-3">Decline</a>
                    </div>
                    <button onClick={handleDimiss} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close">
                        {/* <span onClick={handleDimiss} className="sr-only">Close</span> */}
                        <svg onClick={handleDimiss} aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default InvitationNotification;