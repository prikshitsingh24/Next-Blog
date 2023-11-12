
import { getServerSession } from "next-auth/next";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from "next/navigation";
import Appbar from "../components/appbar";
import Template from "../components/template";
import { userInfoState } from "../states/atoms/userInfo";
interface Data {
    title: string;
    description: string;
    author:string;
  
  }


export default function Blogs({data,session}:any){
  const router=useRouter();
  const[userInfo,setUserInfo]=useRecoilState(userInfoState);
  const reverseData=[...data].reverse();
  const handleLogout=()=>{
    signOut();
  }
  const handleSettings=()=>{
    router.push('/Settings');
  }

  
    return(
        <div className="bg-Beige h-screen">
          {session ?(
          <Appbar username={session.user.name}></Appbar>

          ):(
            <Appbar username={"user not found!!"}></Appbar>
          )}
          {userInfo?(
            
              <div className="absolute z-[999] mx-40 min-[862px]:right-0 mx-10 w-60 h-40 bg-black rounded-xl my-1">
              <div className="mx-[90px]">
              <div className="my-2 cursor-pointer text-white" onClick={handleSettings}>Settings</div>
              </div>
              <div className="border-t border-gray my-1"></div>
              <div className="mx-[90px]">
              <div className="cursor-pointer text-white" onClick={handleLogout}>Logout</div>
              </div>
              <div className="border-t border-gray my-1"></div>
            </div>
          ):(
            <div></div>
          )}
          <div onClick={()=>setUserInfo(false)}>
          <div className="relative flex justify-center item-center my-5 rounded-xl">
            <div className="flex bg-white w-96 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 my-2 mx-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
            <input className="rounded-xl border-none w-full outline-none px-5" placeholder="Search the blog you desire!!" />
            </div>
          </div>
          <div className="bg-Beige grid grid-cols-12 my-5" >
          <div className="col-span-12 md:col-span-12 lg:col-span-8">
           <div className="px-10 text-xl">Blogs</div>
           {reverseData.map(x=>{
            return <Template key={x._id} id={x._id} data={x}></Template>
           })}
          </div>
          <div className="col-span-12 md:col-span-0 lg:col-span-4  mx-10 my-5">
          <div>Hello!!</div>
          </div>
           </div>
          </div>
           </div>
           
    );
}


export async function getServerSideProps(context:any) {
  try {
    
    const session=await getServerSession(context.req,context.res,authOptions);
    if(!session){
      return{
        redirect:{
          destination:'/Login',
          permanent:false
        }
      }
    }
    const response = await fetch(`${process.env.NEXT_BLOGS_URL}/api/postBlogs?limit=10`);
    const data = await response.json() as Data;
    console.log(session);
    return {
      props: {
        data,
        session
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: null,
        session:null // You can handle the error or return a default value as needed
      },
    };
  }
}