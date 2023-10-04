import React, { useState, useEffect } from 'react'

import MenuProfile from '../Components/MenuProfile';
import ChatBox from '../Components/Chatbox';
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';
import Rightmenu from '../Components/Rightmenu';
import { getDoc, doc, getDocs, collection, query, where, orderBy, limit, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { getUser, getAuthUser } from "../Js/user";
import EditProject from '../Components/EditProject';
import { BsGear } from 'react-icons/bs';
import firebase from 'firebase/compat/app';

const DashBoard = () => {
  const [showEditProject, setShowEditProject] = useState(false);
  const toggleEditProject = () => {
    setShowEditProject(!showEditProject);
  };
  //------------------------------------------
  //--------------- VARIABLES ----------------
  //------------------------------------------
  const authUser = auth.currentUser;

  //------------------------------------------
  //----------------- HOOKS ------------------
  //------------------------------------------
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [projectId, setProjectId] = useState("");
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [invitation, setInvitation] = useState([]);
  const [member, setMember] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (authUser) {
      getRecentProject(authUser.uid);
    }

  }, [user])

  useEffect(() => {
    if (authUser) {
      getCurrentUser(authUser.uid);
      setUserId(authUser.uid);

      db.collection("users").doc(authUser.uid)
        .onSnapshot((snapShot) => {
          // getInvitationProjects(authUser.uid);
        });

      db.collection("users").doc(authUser.uid).collection("projects")
        .onSnapshot((snapShot) => {
          getProjects(authUser.uid);
        });

      // const docRef = db.collection("users").doc(uid);
      // const childRef = docRef.collection('projects');
    }

    if (projectId) {
      const memberParentRef = db.collection('projects').doc(projectId);
      memberParentRef.collection('member')
        .onSnapshot((snapShot) => {
          let memberArray = [];
          snapShot.forEach((mem) => {
            memberArray.push(mem.data());
          })
          setMember(memberArray);
        })

      db.collection('projects').doc(projectId).collection('tasks')
        .onSnapshot((snapShot) => {
          let arrayTasks = [];
          snapShot.forEach((task) => {
            arrayTasks.push({ id: task.id, data: task.data() });
          })
          setTasks(arrayTasks);

          if (arrayTasks.length === 0) {
            setProgress(0)
          } else {
            let finishedTask = 0;

            //Calcular tareas completadas
            arrayTasks.map((task) => {
              if (task.data.state) {
                finishedTask++;
              }
            })

            const progressPor = Math.round(finishedTask / arrayTasks.length * 100);
            setProgress(progressPor);
          }
        });
    }
  }, [projectId]);


  //------------------------------------------
  //--------------- FUNCTIONS ----------------
  //------------------------------------------
  const getProjects = async (uid) => {

    const docRef = db.collection("users").doc(uid);
    const childRef = docRef.collection('projects');

    let results = [];

    childRef.get().then((snap) => {
      let results = [];
      snap.forEach((pro) => {
        results.push(pro.data());
      });
      setProjects(results)
    });
  }

  const getRecentProject = async (uid) => {
    console.count("getRecent");
    const userProjectsRef = collection(db, "users", uid, "projects");
    const q = query(userProjectsRef, orderBy("last_connection_at", "desc"), limit(1));
    getDocs(q).then((snapshot) => {
      
      const projectRef = db.collection("projects").doc(snapshot.docs[0].id);
      projectRef.get().then((res) => {
        console.count("setProject");
        setProject(res.data());
        setProjectId(res.id);
      });
    })
  }

  // const getInvitationProjects = async (uid) => {
  //   let projects = [];

  //   getUser(uid).then((result) => {
  //     result.invited.map(async (project) => {
  //       const docRef = doc(db, "projects", project);
  //       const docSnap = await getDoc(docRef);

  //       projects.push({ id: docSnap.id, data: docSnap.data() });
  //     })
  //   })
  //   setInvitation(projects);
  // }



  /**
 * Funcion para obtener el usuario
 */
  function getCurrentUser(uid) {
    getUser(uid).then((result) => {
      setUser(result);
    });
  }

  function handleSelectProject(project) {
    setProject(project);
    setProjectId(project.project);

    const docRef = db.collection("users").doc(userId).collection("projects").doc(project.project);
    docRef.update({
      last_connection_at: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }


  //------------------------------------------
  //--------------- COMPONENT ----------------
  //------------------------------------------
  return (
    <div className="bg-wback dark:bg-back">
      <Topbar />
      <Sidebar
        projects={projects}
        user={user}
        userId={userId}
        invitation={invitation}
        onClick={handleSelectProject}
      />
      {/*MAIN CONTAINER*/}
      {/* <BsGear size={26} onClick={toggleEditProject} className='fixed top-36 left-5 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:scale-105  transition-all cursor-pointer' /> */}

      <div className="md:pl-16 pt-16">
        <div className="bg-wback dark:bg-back -mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
          {/*SIDE MENU-------------------*/}

          {/* <div id="menu-main" className=" side-content col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 side-content--active flex-col overflow-hidden">
            <MenuRooms
              progress={progress}
              member={member}
            />
          </div> */}
          {/*EDITAR PERFIL*/}

          <div id='menu-profile' className='hidden side-content col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 side-content--active flex-col overflow-hidden '>
            <MenuProfile
              authUser={authUser}
              user={user}
              userId={userId}
              projects={projects}
            />
          </div>
          
          {/*CHAT----------------------------*/}
          <div className=" chat-box border-gray-300 dark:border-boxes col-span-12 xl:col-span-9 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
        
          {showEditProject ? (
            <EditProject
              project={project}
              projectId={projectId}
              authUser={authUser}
              user={user}
              userId={userId}
              member={member}
              tasks={tasks}
            />
          ) : (
            <ChatBox
              project={project}
              projectId={projectId}
              authUser={authUser}
              user={user}
              userId={userId}
              member={member}
              tasks={tasks}
            />
          )}
</div>
          {/*RIGHT MENU*/}

          <div className=" info-content col-span-12 xl:col-span-3 flex flex-col overflow-hidden pl-6 xl:pl-0 pr-6 pt-6 ">
            <Rightmenu
              project={project}
              projectId={projectId}
              member={member}
              authUser={authUser}
              user={user}
              userId={userId}
              tasks={tasks}
            />
          </div>
        </div>
      </div>

      {/*MAIN CONTAINER END*/}
    </div>
  );
}

export default DashBoard;
