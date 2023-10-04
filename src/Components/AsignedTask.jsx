import React from 'react'
import { db } from '../firebase';

const AsignedTask = (props) => {

    function handleDone() {
        const docRef = db.collection("tasks").doc(props.task.id);
        docRef.update({
            state: true
        })
        const proDocRef = db.collection('projects').doc(props.task.data.project).collection('tasks').doc(props.task.id);
        proDocRef.update({
            state: true
        })

    }
    
    function handleDelete() {
        const docRef = db.collection("tasks").doc(props.task.id);
        docRef.delete();

        const proDocRef = db.collection('projects').doc(props.task.data.project).collection('tasks').doc(props.task.id);
        proDocRef.delete();
    }

    return (
        <div className='flex'>
            <div className='border rounded-md flex items-center justify-center w-40'>{props.task.data.name}</div>
            <div className='ml-4'>asigned to --</div>
            <div className='border rounded-md flex items-center justify-center w-36 ml-4'>{props.task.data.asignedUserName}</div>
            <div className='cursor-pointer bg-blue-400 text-white rounded-md w-20 items-center justify-center flex ml-4' onClick={handleDone}>Done</div>
            <div className='cursor-pointer bg-red-400 text-white rounded-md w-20 items-center justify-center flex ml-4' onClick={handleDelete}>Delete</div>
        </div>
    )
}

export default AsignedTask
