import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Appbar(props:any) {
  const router = useRouter();
  const[userInfo,setUserInfo]=useState(false);
  const isSmScreen = useMediaQuery('(max-width: 862px)'); // Define your breakpoint here
  const handleUserInfo=()=>{
    setUserInfo(!userInfo);
  }
  return (
    <div className={`position-fixed flex w-full py-2 h-19 bg-red-500 text-white justify-between items-center ${isSmScreen ? 'flex-col' : 'flex-row'}`}>
      <div className="flex">
        <div className="text-white text-xl mx-10">Next-Blogs</div>
        {!isSmScreen && (
          <>
            <button className="bg-red-500 text-white rounded position-fixed px-4 mx-5">Home</button>
            <button className="bg-red-500 text-white rounded position-fixed px-4 mx-5" onClick={() => router.push('/MyBlogs')}>My blogs</button>
            <button className="bg-red-500 text-white rounded position-fixed px-4 mx-5" onClick={() => router.push('/AddBlogs')}>Add blogs</button>
            <button className="bg-red-500 text-white rounded position-fixed px-4 mx-5" onClick={() => router.push('/Todos')}>Todos</button>
          </>
        )}
      </div>
      <div className="flex items-center">
        <div>{props.username}</div>
        <div className="w-14 h-14 mx-4 bg-black rounded-full flex items-center justify-center" onClick={handleUserInfo}>
          <span className="text-white"></span>
        </div>
      </div>
    </div>
  );
}
