import React from 'react'


const ToolsMenu = () => {
    return (
        <div className='w-full h-9 bg-white dark:bg-boxes rounded-md shadow-lg flex items-center justify-center'>
            <div className='flex items-center justify-center bg-blue-300 text-white rounded-md pl-2 pr-2 cursor-pointer hover:scale-105 hover:shadow-xl transition-all'>Menu</div>
            <div className='flex items-center justify-center bg-blue-300 text-white rounded-md pl-2 pr-2 ml-3 cursor-pointer hover:scale-105 hover:shadow-xl transition-all'>Tools</div>
        </div>
    )
}

export default ToolsMenu
