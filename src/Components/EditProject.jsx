import React from 'react'
import ProjectPfpName from './Project-PfpName';
import TaskManagement from './TaskManagement';
import Members from './Members';
import ProjectTitleBar from './ProjectTitleBar';
import { useRef } from 'react';

/**
 * project={project}
 * projectId={projectId}
 * authUser={authUser}
 * user={user}
 * userId={userId}
 * member={member}
 * tasks={tasks}
 * @returns 
 */
const EditProject = (props) => {

    //------------------------------------------
    //--------------- VARIABLES ----------------
    //------------------------------------------

    //------------------------------------------
    //----------------- HOOKS ------------------
    //------------------------------------------

    //------------------------------------------
    //--------------- FUNCTIONS ----------------
    //------------------------------------------

    //------------------------------------------
    //--------------- COMPONENT ----------------
    //------------------------------------------
    return (
        <>
            <ProjectTitleBar
                project_name={props.project.name}
                project_image={props.project.image}
            />
            
            <div className="overflow-y-scroll scrollbar-hidden scrollbar-hide pt-5 flex-1 float-left">
                <ProjectPfpName
                    project={props.project}
                    projectId={props.projectId}
                    authUser={props.authUser}
                    user={props.user}
                    userId={props.userId}
                    member={props.member}
                />

                <TaskManagement
                    project={props.project}
                    projectId={props.projectId}
                    authUser={props.authUser}
                    user={props.user}
                    userId={props.userId}
                    member={props.member}
                    tasks={props.tasks}
                />

                <Members
                    project={props.project}
                    projectId={props.projectId}
                    authUser={props.authUser}
                    user={props.user}
                    userId={props.userId}
                    member={props.member}
                />
            </div>
        </>
    )
}

export default EditProject
