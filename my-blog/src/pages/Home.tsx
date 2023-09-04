import Appbar from "@/components/appbar";
import Template from "@/components/template";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
interface Data {
    title: string;
    description: string;
    author:string;
  
  }


export default function Blogs({data,session}){
  const reverseData=[...data].reverse();
    return(
        <div className="bg-amber-400">
          {session ?(
          <Appbar username={session.user.name}></Appbar>):(
            <Appbar username={"user not found!!"}></Appbar>
          )}
           <div className="grid grid-cols-12 my-5">
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