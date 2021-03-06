import * as React from 'react';
import { SubHeader } from '../components/common/SubHeader';

export const Home: React.FC = () => {
  return (
    <>
      <SubHeader />
      <div className="flex-1 container w-full p-20 m-4 mx-auto my-16 text-center bg-white border-2 border-dashed border-blueGray-300 h-96 rounded-xl">
        <p className="mt-20 italic tracking-tighter text-md text-blueGray-500 title-font">
          -- Content goes here --
        </p>
      </div>
    </>
  );
};
