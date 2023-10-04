import React, { useContext } from 'react';

import { SocketContext } from '../Js/SocketContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
    
        <div className='flex'>
          <h1>{call.name} is calling:</h1>
          <button className='bg-green-300 text-black rounded-full' onClick={answerCall}>
            Answer
          </button>
        </div>
   
    </>
  );
};

export default Notifications;