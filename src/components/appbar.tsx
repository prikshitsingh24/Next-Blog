
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { sideBarStatus } from '../states/atoms/sidebarStatus';
import { userInfoState } from '../states/atoms/userInfo';
import Sidebar from './sidebar';

export default function Appbar(props:any) {
  const router = useRouter();
  const[userInfo,setUserInfo]=useRecoilState(userInfoState);
  const[sidebarStatus,setSideBarStatus]=useRecoilState(sideBarStatus);
  const isSmScreen = useMediaQuery('(max-width: 862px)');
  const handleUserInfo=()=>{
    if(!isSmScreen){
      setUserInfo(!userInfo);
    }
  }
  const handleSideBar=()=>{
    setSideBarStatus(!sidebarStatus);
  }
  return (
    <div>
      {
        isSmScreen && (
          <div className='flex justify-start relative'>
      <div className='absolute top-10 left-5'>
      <img src="./menu.png" alt="Menu Icon" width={30} height={30} className="hover:cursor-pointer" onClick={handleSideBar}/>
        <Sidebar></Sidebar>
      </div>
      </div>
        )
      }
      <div className={`position-fixed flex w-full py-2 h-19 bg-darkgrey text-white justify-between items-center ${isSmScreen ? 'flex-col' : 'flex-row'}`}>
      <div className="flex">
        <div className="text-white text-xl mx-10">Next-Blogs</div>
        {!isSmScreen && (
          <>
            <button className="bg-darkgrey text-white rounded position-fixed px-4 mx-5">Home</button>
            <button className="bg-darkgrey text-white rounded position-fixed px-4 mx-5" onClick={() => router.push('/MyBlogs')}>My blogs</button>
            <button className="bg-darkgrey text-white rounded position-fixed px-4 mx-5" onClick={() => router.push('/AddBlogs')}>Add blogs</button>
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
    </div>
    
  );
}
