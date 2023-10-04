import React from "react";

const ProjectIcon = (props) => {

    //------------------------------------------
    //--------------- VARIABLES ----------------
    //------------------------------------------

    //------------------------------------------
    //----------------- HOOKS ------------------
    //------------------------------------------

    //------------------------------------------
    //--------------- FUNCTIONS ----------------
    //------------------------------------------
    function handlerProjectSelected() {
        props.onClick(props.project)
    }

    //------------------------------------------
    //--------------- COMPONENT ----------------
    //------------------------------------------
    return (
        <div className=" w-12 h-12 rounded-md hover:scale-105  transition-all  cursor-pointer" onClick={handlerProjectSelected}>
            <img src={props.project.image} alt="" />
        </div>
    )
}

export default ProjectIcon;