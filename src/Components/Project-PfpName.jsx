import React from 'react'
import { useRef } from 'react';
import { BsGear } from "react-icons/bs";
import { log } from 'util';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from '../firebase';

/**
 * @param {
 * project={props.project}
 * member={props.member}
 * projectId={props.projectId}
 * authUser={props.authUser}
 * user={props.user}
 * userId={props.userId}
 * } props 
 * @returns 
 */
const ProjectPfpName = (props) => {


    const imgInputRef = useRef(null);
    // const storage = getStorage();

    
    // const handleFileUpload = async (event) => {
    //     //Get file
    //     const file = event.target.files[0];
    //     const imagesRef = ref(storage, 'images/project' + file.name);
    //     //Save file
    //     uploadBytes(imagesRef, file).then((snapshot) => {

    //         // Save path to project
    //         const docRef = db.collection("projects").doc(props.projectId);
    //         docRef.update({
    //             image_path: snapshot.metadata.fullPath
    //         })
    //     })
    // };

    return (
        <div className="box border  border-gray-300 dark:border-gray-700  bg-white dark:bg-bars h-64 pl-7 flex justify-start flex-col items-start px-5 rounded-md">
            <div className='flex items-center'>
                <div className='mt-5 text-black dark:text-white text-lg font-medium'>Project settings</div>
                <BsGear size={20} className='mt-5 ml-3 text-white' />
                <p className='ml-8 mt-5'>Project created by {props.project.admin_name}</p>
            </div>
            <div className='flex mt-5 items-center'>
                <div className='cursor-pointer'>

                    <img className="hover:shadow-xl hover:scale-105 transition-all ring-2 ring-gray-300 dark:ring-gray-600 border-4 border-transparent rounded-full  w-32" src={props.project.image} />
                </div>
                <div className='w-52 ml-6 text-gray-600 dark:text-gray-400'>
                    we recommend an image of at least 512x512 for the project
                </div>
                <div className='flex flex-col ml-7 space-y-3'>
                    <div className='font-medium text-white'>Project Name</div>
                    <div className='flex'>
                        <input type="text" placeholder='ProjectName' className='rounded-md bg-wback text-black dark:bg-back border dark:text-white w-64 h-9 pl-3 hover:focus:none' />
                        <div className='hover:scale-105 hover:shadow-lg transition-all cursor-pointer bg-green-500 text-white rounded-md w-20 flex items-center justify-center font-medium text-base ml-4'>Save</div>
                    </div>
                </div>

            </div>
            <div className='flex'>
                <div className='hover:scale-105 hover:shadow-lg transition-all bg-transparent cursor-pointer rounded-md items-center justify-center flex w-auto pl-4 pr-4 ml-6 border mt-3'>Delete</div>
                <input type="file" ref={imgInputRef} className='mt-3 ml-11' accept="image/*"></input>
                {/* <input type="file" ref={imgInputRef} className='mt-3 ml-11' accept="image/*"  onChange={handleFileUpload}></input> */}
            </div>

        </div>
    )
}

export default ProjectPfpName
