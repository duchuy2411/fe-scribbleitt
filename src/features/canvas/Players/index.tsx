import React from 'react';

const Players = (props: any) => {
  const { player, src } = props;

  return (
    <div className="h-578 w-3/12 bg-yellow-50 box-border">
      <div className="w-full z-10 flex border-2 border-gray-100 bg-gray-900 text-white p-2">
        <div className="w-2/12 h-auto">
          <img className="w-full h-full rounded-full" src={src} />
        </div>
        <div className="w-10/12 px-2">
          <div className="font-bold">AbalaTrap</div>
          <div className="italic">Score: 0</div>
        </div>
      </div>
      <div className="h-505 max-h-505 overflow-y-auto">
      {
        player.map((ele: any) => (
          <div className="flex border-2 border-gray-900 p-2 my-0.5">
            <div className="w-2/12 h-auto">
              <img className="w-full h-full rounded-full" src={src} />
            </div>
            <div className="w-10/12 px-2">
              <div className="font-bold">{ele.name}</div>
              <div className="italic">Score: {ele.score}</div>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
};

export default Players;