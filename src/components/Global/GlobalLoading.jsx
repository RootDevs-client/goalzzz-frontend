'use client';
import { BiFootball } from 'react-icons/bi';

export default function GlobalLoading() {
  return (
    <div className="flex items-center justify-center p-2 mt-5 md:mt-10">
      <div className="flex items-center">
        <div className="animate-bounce [animation-delay:-0.3s]">
          <BiFootball className="text-3xl  animate-spin " />
        </div>
        <div className="animate-bounce [animation-delay:-0.15s]">
          <BiFootball className="text-3xl text-secondary animate-spin " />
        </div>
        <div className="animate-bounce ">
          <BiFootball className="text-3xl  animate-spin" />
        </div>
      </div>
    </div>
  );
}
