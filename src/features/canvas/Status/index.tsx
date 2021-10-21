import React from 'react';

const Status = (props: any) => {
  
  return (
    <div className="flex h-2/12">
      <div className="flex flex-col w-2/12 justify-center items-center p-2 bg-gray-900 text-yellow-50">
        <div className="">Round</div>
        <div className="">12/12</div>
      </div>
      <div className="flex flex-col relative flex-grow justify-center border-2 border-gray-900 p-2">
        <div className="flex justify-center items-center bg-green-100 px-1 rounded-md h-auto absolute -top-4 left-1/2" style={{ transform: 'translateX(-50%)'}}>
          Guest it! Classic
        </div>
        <div className="relative flex justify-center items-center">
          <div className=" bg-gray-100 p-1 border-2 border-gray-900 rounded-md">R _ f _ n d</div>
        </div>
      </div>
      <div className="flex flex-col w-2/12 justify-center items-center p-2 bg-gray-900 text-yellow-50">
        <div className="">12s</div>
      </div>
    </div>
  )
}

export default Status;