import React from 'react'
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import {
    AiFillFileExcel, AiFillFileExclamation, AiFillFileImage, AiFillFileMarkdown, AiFillFilePpt,
    AiFillFileText, AiFillFileWord, AiFillFileZip, AiFillFile
} from "react-icons/ai";

const SharedFile = () => {
    return (
        <div className="w-full h-16 bg-wback border border-gray-300 dark:border-gray-700 dark:bg-bars rounded-md flex flex-row pl-3 items-center cursor-pointer text-back dark:text-gray-300 hover:shadow-2xl hover:scale-105 transition-all">
            <BsFileEarmarkPdfFill size={38} />
            <div className="flex flex-col ml-3">
                <div className="font-medium">SmartContract</div>
                <div className="text-sm">Type: PDF</div>
            </div>

        </div>
    )
}

export default SharedFile
