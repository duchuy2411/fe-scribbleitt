import React from "react";

const Chat = () => {
  return (
    <div className="flex flex-col justify-between h-578 w-3/12 p-2 border-2 border-gray-900 bg-yellow-50">
      <div className="w-full">
        <div className="flex w-full border-gray-900 bg-green-500 my-1 p-1">
          Huy is joined this room!
        </div>
      </div>
      <div className="w-full h-24">
        <textarea className="w-full h-full border-2 border-gray-900 rounded-lg" />
      </div>
    </div>
  )
}

export default Chat;