// @ts-ignore: Object is possibly 'null'.
import React, { useEffect, useRef, useState } from 'react';

function Login() {
  
  return (
    <div className='flex flex-wrap h-auto mx-auto w-6/12 p-4 mt-32 bg-gradient-to-r from from-yellow-300 to-yellow-500 rounded font-mono'>
      <div className="flex md:w-6/12 custom:hidden justify-center items-center">
        <div className="p-4">
          <img src="https://i.rada.vn/data/image/2021/06/04/Scribble-It-200.jpg" className="w-full h-auto" />
        </div>
      </div>
      <div className="flex flex-col md:w-6/12 custom:w-full justify-center">
        <div className="text-center w-full my-3">
          <input className="rounded" />
        </div>
        <div className="text-center w-full my-3">
          <input className="rounded" />
        </div>
        <div className="text-center w-full">
          <button className="bg-gradient-to-r from-gray-900 hover:from-gray-400 to-gray-800 hover:to-gray-400 text-gray-50 px-2 rounded text-sm">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
