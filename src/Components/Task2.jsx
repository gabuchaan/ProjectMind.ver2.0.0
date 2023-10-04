import React from 'react'

const Task2 = (props) => {
    return (
        <div className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer justify-center  bg-wback border border-gray-300 dark:border-gray-800 dark:bg-gray-600 w-full h-12 rounded-md flex flex-row items-center pl-3 pr-3 space-x-3">
            
            <div className="text-back dark:text-white font-extralight">{props.task.data.name}</div>
        </div>
    )
}

export default Task2
