import { collection, updateDoc } from 'firebase/firestore';
import { db } from "../firebase.js";
import React, { useEffect, useRef } from 'react'

/**
 * 
 * @param {
 * task={task}
 * projectId={props.projectId}
 * } props 
 * @returns 
 */
const Task = (props) => {
    
        //------------------------------------------
        //--------------- VARIABLES ----------------
        //------------------------------------------
        const inputRef = useRef(null);
        //------------------------------------------
        //----------------- HOOKS ------------------
        //------------------------------------------
    
        //------------------------------------------
        //--------------- FUNCTIONS ----------------
        //------------------------------------------
        function handlerChecked() {
            const taskRef = db.collection("tasks").doc(props.task.id);
            updateDoc(taskRef, {
                state: inputRef.current.checked
            })

            const parentProjectTaskRef = db.collection("projects").doc(props.projectId);
            const subCollectionRef = parentProjectTaskRef.collection("tasks").doc(props.task.id);

            updateDoc(subCollectionRef, {
                state: inputRef.current.checked
            });

        }
    
        //------------------------------------------
        //--------------- COMPONENT ----------------
        //------------------------------------------

    return (
        <div className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer bg-wback border border-blue-400 dark:border-blue-800 dark:bg-bars w-full h-12 rounded-md flex flex-row items-center pl-3 pr-3 space-x-3">
            <div className="form-control">
                {
                    props.task.data.state ? <input  ref={inputRef} type="checkbox"  className="checkbox checkbox-primary" onChange={handlerChecked} checked/> : <input  ref={inputRef} type="checkbox"  className="checkbox checkbox-primary" onChange={handlerChecked} />
                }
                </div>
            <div className="text-back dark:text-white font-extralight">{props.task.data.name}</div>
        </div>
    )
}

export default Task
