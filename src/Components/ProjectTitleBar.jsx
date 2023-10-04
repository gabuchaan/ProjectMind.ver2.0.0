import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCamera, BsMic } from "react-icons/bs";

const ProjectTitleBar = (props) => {
  //------------------------------------------
  //--------------- VARIABLES ----------------
  //------------------------------------------

  //------------------------------------------
  //----------------- HOOKS ------------------
  //------------------------------------------

  //------------------------------------------
  //--------------- FUNCTIONS ----------------
  //------------------------------------------

  async function addUser() {
    const Swal = require('sweetalert2')
    //------DIRECCION CORREO-----------
    const { value: email } = await Swal.fire({
      title: 'Invite user',
      input: 'email',
      inputLabel: 'user email address',
      inputPlaceholder: 'Enter user email address'
    })

    if (email) {
      Swal.fire(`Entered email: ${email}`)
    }

    //--ROL-----
    const { value: role } = await Swal.fire({
      title: 'Add user rol',
      input: 'select',
      inputOptions: {
        'Roles': {
          member: 'Member (general)',
          designer: 'Designer',
          developer: 'Developer',
          tester: 'Tester',
          prijectManager: 'Project manager',
        },
      },
      inputPlaceholder: 'Select a rol',
      showCancelButton: true,

    })

    if (role) {
      Swal.fire(`You selected: ${role}`)
    }
  }


  //------------------------------------------
  //--------------- COMPONENT ----------------
  //------------------------------------------
  return (
    <div className="box border border-gray-300 dark:border-blue-900 bg-white dark:bg-bars h-20 flex justify-start flex-row items-center px-5 rounded-md">
      <div>
        <img className="ring-2 ring-gray-300 dark:ring-gray-600 border-4 border-transparent rounded-full  w-12" src={props.project_image} />
      </div>
      <div className='flex items-center'>
        <div className="intro-y text-2xl ml-5 font-medium text-bars dark:text-white">{props.project_name}</div>
      </div>
      <div className="flex flex-row ml-auto">
        <button type="submit" className="flex justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-2">Chat</button>
        <button type="submit" className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-2">Task</button>
      </div>

      <div className="flex flex-row ml-3 text-gray-500 dark:text-gray-400 space-x-3">

        <AiOutlineUserAdd className='cursor-pointer dark:hover:text-gray-100 transition-all' size={23} onClick={addUser} />
      </div>
    </div>
  )
}

export default ProjectTitleBar;