import Template from "@/components/template";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function MyBlogs({userBlogs}){
    const reverseData=[...userBlogs].reverse();
    return(
        <div className="bg-amber-400 h-screen sm:h-full  ">
            <div className="relative flex justify-center item-center">
            <div className="text-3xl my-10">
                Your Blogs!!!
            </div>
        </div>
        <div className="relative flex justify-center item-center my-5 rounded-xl">
            <div className="flex bg-white w-96 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 my-2 mx-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
            <input className="rounded-xl border-none w-full outline-none px-5" placeholder="Search all the blog you you have written!!" />
            </div>
          </div>
          {reverseData.map(x=>{
            return <Template data={x}></Template>
           })}
        </div>
        
    );
}

export async function getServerSideProps(context) {
    const session=await getServerSession(context.req,context.res,authOptions);
  
    try {
      const response = await fetch(`http://localhost:3000/api/getUserBlogs?author=${session?.user?.name}`);
      
      if (response.ok) {
        const userBlogs = await response.json();
        return {
          props: {
            userBlogs,
          },
        };
      } else {
        console.error(`API request failed with status: ${response.status}`);
        return {
          props: {
            userBlogs: [],
          },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        props: {
          userBlogs: [],
        },
      };
    }
  }
  