import React, { useState } from 'react';
import ToolsMenu from './ToolsMenu';

const RightMenuTools = () => {
  const [randomColor, setRandomColor] = useState('rgb(123, 456, 255)');

  const getRandomNumber = () => Math.floor(Math.random() * 256);

  const generateRandomColor = () =>
    `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;

  const darkenColor = (color) => {
    const [r, g, b] = color.substring(4, color.length - 1).split(',').map(Number);
    return `rgb(${Math.max(r - 50, 0)}, ${Math.max(g - 50, 0)}, ${Math.max(b - 50, 0)})`;
  };

  const handleNewColorClick = () => {
    const color = generateRandomColor();
    setRandomColor(color);
  };

  return (
    <>
      <div
        className="w-full h-auto pt-5 bg-transparent shadow-lg mt-4 dark:bg-boxes rounded-md flex flex-col justify-center items-center p-3"
        style={{ backgroundColor: darkenColor(randomColor) }}
      >
        <div className="bg-blue-100 rounded-md w-72 h-auto flex flex-col items-center justify-center pt-5 pb-5">
          <div className="bg-black w-44 h-44 rounded-md" style={{ backgroundColor: randomColor }}></div>
          <div className="mt-4 text-black font-medium text-lg">Random color</div>
          <div id="colorNumber" className="text-gray-700">
            {randomColor}
          </div>
          <div
            className="cursor-pointer bg-blue-400 mt-4 text-white rounded-xl w-28 h-8 flex items-center justify-center"
            onClick={handleNewColorClick}
          >
            New color
          </div>
        </div>
      </div>
    </>
  );
};

export default RightMenuTools;
