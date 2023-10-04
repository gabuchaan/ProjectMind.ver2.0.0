import React from "react";

const MyMessage = ({ mensaje }) => {
    return (
      <>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="https://tecdn.b-cdn.net/img/new/avatars/3.webp" alt="Avatar" />
            </div>
          </div>
          <div className="chat-header flex items-center">
          <div className="text-xs opacity-50 mr-2">Developer</div>
            Anakin
          </div>
          <div className="chat-bubble chat-bubble-primary shadow-md dark:shadow-none shadow-gray-400">
            {mensaje.mensaje}
          </div>
          <div className="chat-footer opacity-50">{mensaje.hora}</div>
        </div>
      </>
    );
  };

export default MyMessage;