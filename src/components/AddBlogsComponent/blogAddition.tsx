import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ErrorComponent from "../errorComponent";
import MarkdownRenderer from "./markdownComponent";

export default function BlogAdditionComponent() {
  const {data:session}=useSession();
  const[title,setTitle]=useState("");
  const[error,setError]=useState("");
  const [popUp,setPopUp]=useState(false);
  const [markdown,setMarkdown]=useState("");
  const author=session?.user?.name;

  const router=useRouter();

  const handleTitle=(e:any)=>{
    setTitle(e.target.value);
  }
  const handleMarkdownChange=(e:any)=>{
    setMarkdown(e.target.value);
  }

  const handleSubmit=async()=>{
    if(title=="" && markdown=="" && author==""){
      alert("please fill all the fields");
    }else{
      const response=await fetch(`${process.env.VERCEL_PUBLIC_URL}/api/postBlogs`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({title:title,description:markdown,author:author}),
      });
      if(response.ok){
        setPopUp(false);
        router.push('/Home');
      }else{
        setPopUp(true);
        setError("Please fill all the fields!!");
      }
    }
   
  };
  const handleNavigationToDoc=()=>{
    router.push('/MarkdownDocs');
  }

  return (
    <div className="bg-Beige p-8 flex-column justify-center items-center h-full w-full">
        <div className="text-black text-xl my-5">Your Blog</div>
      <div className="bg-darkgrey p-2 rounded shadow-md w-full">
        {popUp ?(
            <div className="relative flex justify-center item-center">
              <ErrorComponent error={error}></ErrorComponent>
            </div>
        ):(
          <div></div>
        )}
        <div className="mb-4">
          <div className="flex justify-between">
          <label htmlFor="title" className="text-white block mb-1">
            Title:
          </label>
          </div>
          <input
            type="text"
            id="title"
            className="py-2 px-3 w-full rounded border-black outline-none bg-Beige"
            onChange={handleTitle}
          />
        </div>
        <div className="grid grid-cols-12 mb-4">
          <div className='col-span-12 lg:col-span-6 '>
          <div className="flex justify-between">
          <label htmlFor="description" className="text-white block mb-1">
            Description:
          </label>
          <div className="cursor-pointer" onClick={handleNavigationToDoc}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          </div>
          </div>
          <textarea
            id="description"
            className="py-2 px-3 w-full h-[500px] rounded border-gray-300 overflow-auto resize-none outline-none bg-Beige "
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="It also supports markdown!!!"
          />
          </div>
          <div className='col-span-12 lg:col-span-6'>
          <div className="text-white mx-2">Preview:</div>
          <div className="w-full h-[500px] border rounded border-black overflow-auto px-3 bg-darkgrey text-white my-1 mx-1">
          <MarkdownRenderer content={markdown}></MarkdownRenderer>
          </div>
          </div>
          
        </div>
        <div className="mb-4 my-5">
          <label htmlFor="title" className="text-white block mb-1">
            Author:
          </label>
          <input
            type="text"
            id="title"
            className="py-2 px-3 w-full rounded border-gray-300 outline-none"
            value={session?.user?.name || ''}
            readOnly={true}
          />
        </div>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add Blog
        </Button>
      </div>
    </div>
  );
}

