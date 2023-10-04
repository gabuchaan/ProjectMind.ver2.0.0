import React, { useState, useEffect, } from 'react'
import { AiOutlineBell, AiFillBell } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import ProjectIcon from "./ProjectIcon";
import InvitationNotification from '../Components/InvitationNotification';
import { checkIfNotEmpty } from '../Js/common';
import { createProject } from '../Js/project';
import { RiLogoutBoxLine } from "react-icons/ri";
import { getAuth, signOut } from "firebase/auth";


const Sidebar = (props) => {

    const navigate = useNavigate();
    const Swal = require('sweetalert2')
    const [darkMode, setDarkMode] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleClick3 = () => {
        if (props.invitation.length !== 0) setShowNotifications(!showNotifications);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    function logOut() {
        const auth = getAuth();

        signOut(auth).then(() => {
            navigate('/')
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    async function createProjectForm() {
        const { value: formValues } = await Swal.fire({
            title: 'Input the name of new project',
            html:
                '<input type="text" id="projectName" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>',
            focusConfirm: false,
            preConfirm: () => {
                const projectName = document.getElementById('projectName').value;
                if (!checkIfNotEmpty(projectName)) return "Tienes que poner un nombre";
                createProject(props.userId, projectName, props.user.name, props.user.avatar);

                return projectName;
            }
        })

        if (formValues) {
            Swal.fire(JSON.stringify(formValues));
        }
    }

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

    return (
        <div>
            <div className="bg-white dark:bg-bars items-center side-menu  top-0 left-0 fixed w-16 h-screen flex flex-col py-6 shadow-lg">

                <div className="items-center flex flex-col space-y-3 overflow-x-hidden scrollbar-hide h-3/4">
                    {props.projects.map((project, index) => {
                        return (
                            <ProjectIcon
                                project={project}
                                onClick={props.onClick}
                                key={index}
                            />
                        )
                    })
                    }
                </div>
                <div className="items-center flex flex-col space-y-3 overflow-x-hidden scrollbar-hide h-1/4 fixed bottom-0">

                    <div className="hover:bg-gray-200 bg-gray-300 dark:bg-boxes  w-12 h-12 rounded-md hover:scale-105 hover:shadow-lg transition-all dark:hover:bg-gray-500 justify-center items-center flex text-gray-700 dark:text-white cursor-pointer" onClick={createProjectForm}> <BsPlusCircle size={22} /> </div>
                    <div className="hover:bg-gray-200  bg-gray-300 dark:bg-boxes w-12 h-12 rounded-md hover:scale-105 hover:shadow-lg transition-all dark:hover:bg-gray-500 justify-center mt-4 items-center flex text-gray-700 dark:text-white cursor-pointer" onClick={logOut}> <RiLogoutBoxLine size={22} /> </div>

                    <div onClick={() => toggleMenu("menu-profile")} className="cursor-pointer  bg-gray-300 dark:bg-boxes w-12 h-12 rounded-md hover:scale-105 hover:shadow-lg transition-all hover:bg-gray-500 justify-center items-center flex text-white" >
                        {/* <AiOutlineUser size={22}/> */}
                        <img src={props.user.avatar} alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidebar;
