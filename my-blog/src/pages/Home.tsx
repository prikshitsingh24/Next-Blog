import Appbar from "@/components/appbar";
import Template from "@/components/template";
import { userInfoState } from "@/states/atoms/userInfo";
import { useMediaQuery } from "@mui/material";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { authOptions } from "./api/auth/[...nextauth]";
interface Data {
    title: string;
    description: string;
    author:string;
  
  }


export default function Blogs({data,session}){
  const[userInfo,setUserInfo]=useRecoilState(userInfoState);
  const reverseData=[...data].reverse();
  const handleLogout=()=>{
    signOut();
  }
    return(
        <div className="bg-amber-400">
          {session ?(
          <Appbar username={session.user.name}></Appbar>

          ):(
            <Appbar username={"user not found!!"}></Appbar>
          )}
          {userInfo?(
            
              <div className="absolute z-[999] mx-40 min-[862px]:right-0 mx-10 w-60 h-40 bg-black rounded-xl my-1">
              <div className="mx-[90px]">
              <div className="my-2 cursor-pointer text-white">Settings</div>
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
           <div className="grid grid-cols-12 my-5" onClick={()=>setUserInfo(false)}>
          <div className="col-span-12 sm:col-span-8">
           <div className="px-10 text-xl">Blogs</div>
           {reverseData.map(x=>{
            return <Template data={x}></Template>
           })}
          </div>
          <div className="col-span-12 sm:col-span-4 mx-8">
            <div className="px-10 text-xl">Todos</div>
            </div>
           </div>
           
           </div>
           
    );
}


export async function getServerSideProps(context) {
  try {
    const session=await getServerSession(context.req,context.res,authOptions);
    if(!session){
      return{
        redirect:{
          destination:'/',
          permanent:false
        }
      }
    }
    const response = await fetch('http://localhost:3000/api/postBlogs');
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