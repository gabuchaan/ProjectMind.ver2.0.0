import React, { useState } from 'react'
import { TiArrowShuffle } from "react-icons/ti";
import AsignedTask from './AsignedTask';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';
import { useRef } from 'react';
import { log } from 'util';

/**
 * 
 * @param { 
 * project={project}
 * projectId={projectId}
 * authUser={authUser}
 * user={user}
 * userId={userId}
 * member={member}
 * tasks={props.tasks}
 * } props 
 * @returns 
 */
const TaskManagement = (props) => {
    //------------------------------------------
    //--------------- VARIABLES ----------------
    //------------------------------------------

    //------------------------------------------
    //----------------- HOOKS ------------------
    //------------------------------------------
    const [member, setMember] = useState(props.member);
    const [taskName, setTaskName] = useState("");
    //------------------------------------------
    //--------------- FUNCTIONS ----------------
    //------------------------------------------
    async function asignHandler(e) {

        if (taskName != '') {
            //Get selected UserName
            const select = document.getElementById("selectMember");
            let memberName ="";

            props.member.map((men) => {
                if (men.uid === select.value) {
                    memberName = men.name;
                }
            })

            //Store DB
            const taskData = {
                name: taskName,
                state: false,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                asignedUser: select.value,
                asignedUserName: memberName,
                project: props.projectId
            }
            db.collection("tasks").add(taskData).then((res) => {
                db.collection("projects").doc(props.projectId).collection('tasks').doc(res.id).set(taskData);
            });

            //Reset input TaskName
            document.getElementById("taskName").value = "";

            //Reset TaskName
            setTaskName("");
        }
    }

    //------------------------------------------
    //--------------- COMPONENT ----------------
    //------------------------------------------

    return (
        <div className='pl-7 w-full h-auto pb-7 bg-white border border-gray-300 dark:border-gray-700 dark:bg-bars mt-5 rounded-md'>
            <div className='flex'>
                <div className='mt-5 text-black dark:text-white text-lg font-medium'>Task management</div>
                <TiArrowShuffle size={21} className="text-black dark:text-white mt-6 ml-3" />
            </div>
            <div className='flex mt-5'>
                <div className='text-black dark:text-gray-300'>Asign</div>
                <input id='taskName' className='ml-3 bg-transparent border rounded-md pl-3' type="text" placeholder='Task Name' onChange={(e) => setTaskName(e.target.value)} />
                <div className='ml-3 text-black dark:text-gray-300'>to</div>
                <select id='selectMember' className='ml-3 bg-transparent border rounded-md pl-3' type="text" placeholder='Member' >
                    {
                        props.member.map((mem) => {
                            return <option value={mem.uid}>{mem.name}</option>
                        })
                    }
                </select>
                <div onClick={asignHandler} className='border cursor-pointer hover:scale-105 hover:shadow-lg transition-all bg-green-400 text-white rounded-md w-20 justify-center items-center flex ml-7'>Asign</div>
            </div>
            <div className='mt-5 text-white text-lg font-medium'>Created tasks</div>
            <div className='mt-5 flex flex-col space-y-4'>
                {
                    props.tasks.map((task, index) => {
                        return <AsignedTask
                            key={index}
                            task={task}
                        />
                    })
                }

            </div>
        </div>
    )
}

export default TaskManagement
