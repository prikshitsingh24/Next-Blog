
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Template from "../components/template";
import { authOptions } from "./api/auth/[...nextauth]";

interface Data {
  _id: string; // Update with the actual type of _id
  title: string;
  description: string;
  author: string;
}

export default function MyBlogs({userBlogs}:any){
    const reverseData=[...userBlogs].reverse();
    const [searchDataList, setSearchDataList] = useState<Data[]>([]); 
    const [blogSearch,setBlogSearch]=useState('');

    const handleBlogSearch=(e:any)=>{
      setBlogSearch(e.target.value);
      
    }


    useEffect(()=>{
      const fetchBlogs=async()=>{
        try{
          const response=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getBlogByTitle?title=${blogSearch}`);
          const data = await response.json();
          if(data){
            setSearchDataList(data);
          }else{
            console.log("didnt work")
          }
        }catch(error){
          console.log(error)
        }
      }
      if (blogSearch.trim() !== '') {
        fetchBlogs();
      }
    },[blogSearch]);
  
    return(
        <div className="bg-Beige h-screen overflow-auto overflow-x-hidden ">
            <div className="relative flex justify-center item-center">
            <div className="text-3xl my-5">
                Your Blogs!!!
            </div>
        </div>
        <div className="border-t border-2 border-black my-2 mx-10"></div>
        <div className="relative flex justify-center item-center my-5 rounded-xl">
            <div className="flex bg-white w-96 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 my-2 mx-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
            <input className="rounded-xl border-none w-full outline-none px-5" placeholder="Search all the blog you you have written!!" onChange={handleBlogSearch} />
            </div>
          </div>
          {blogSearch===''?(reverseData.map(x=>{
            return <Template key={x._id} id={x._id} data={x}></Template>
           })):(
            (searchDataList.map(x=>{
              return <Template key={x._id} id={x._id} data={x}></Template>
             }))
           )}
        </div>
        
    );
}

export async function getServerSideProps(context:any) {
    const session=await getServerSession(context.req,context.res,authOptions);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getUserBlogs?author=${session?.user?.name}`);
      
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
  