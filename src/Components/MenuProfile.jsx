import React from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";

/**
 * 
 * @param {
 * authUser={authUser}
 * user={user}
 * userId={userId}
 * projects={projects}
 * } props 
 * @returns 
 */
const MenuProfile = (props) => {
    //------------------------------------------
    //--------------- VARIABLES ----------------
    //------------------------------------------

    //------------------------------------------
    //----------------- HOOKS ------------------
    //------------------------------------------

    //------------------------------------------
    //--------------- FUNCTIONS ----------------
    //------------------------------------------
    const toggleMenu = (menuId) => {
        const menuMain = document.getElementById("menu-main");
        const menuProfile = document.getElementById("menu-profile");

        if (menuId === "menu-main") {
            menuMain.classList.remove("hidden");
            menuProfile.classList.add("hidden");
        } else if (menuId === "menu-profile") {
            menuMain.classList.add("hidden");
            menuProfile.classList.remove("hidden");
        }
    };
    //------------------------------------------
    //--------------- COMPONENT ----------------
    //------------------------------------------
    return (
        <>
            <div className="text-xl font-medium flex text-white"><IoArrowBackCircleSharp size={27} className='mr-5 hover:scale-105 cursor-pointer transition-all' onClick={() => toggleMenu("menu-main")} /> Edit Profile<AiFillEdit className='mt-1 ml-11 cursor-pointer hover:scale-105 text-gray-300 hover:text-white' /></div>

            <div className='bg-white dark:bg-boxes w-full h-64 mt-4 rounded-md items-center flex flex-col'>
                <div className='bg-wback border rounded-full w-44 h-44 mt-5'></div>
                <div className="intro-y text-xl font-medium text-black dark:text-white mt-4">{props.user.name}</div>
            </div>
            <div className='bg-white dark:bg-boxes w-full h-auto mt-3 rounded-md items-center flex flex-col p-3'>
                <div className='flex flex-row space-x-2 w-full'>
                    <input className='bg-gray-200 dark:bg-bars w-full h-10 rounded-md flex items-center pl-3 text-white' placeholder={props.user.name}></input>
                </div>
                <input className='bg-gray-200 dark:bg-bars w-full h-10 rounded-md mt-2 flex items-center pl-3 text-white' placeholder={props.user.e_mail}></input>
                <input className='bg-gray-200 dark:bg-bars w-full h-10 rounded-md mt-2 pl-3 items-center flex text-white' placeholder='************'></input>
            </div>
            <div className='bg-white dark:bg-boxes w-full h-auto mt-3 p-3 rounded-md items-center justify-center flex flex-col'>
                <div className="intro-y text-xl font-medium text-white">Projects</div>
                <div className='mt-3 flex gap-2 flex-wrap justify-center'>
                    {
                        props.projects.map((project) => {
                            return <div className='w-32 h-36 p-2 bg-gray-200 dark:bg-bars rounded-md flex flex-col items-center justify-center hover:scale-105 hover:shadow-lg transition-all cursor-pointer'>
                                <div className='bg-blue-200 w-20 h-20 rounded-full mt-1'></div>
                                <div className='text-white font-medium mt-2 w-28 items-center justify-center flex'>{project.name}</div>
                            </div>
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default MenuProfile;