import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { blogIdState } from "@/states/atoms/blogId";
import ErrorComponent from "../errorComponent";

export default function BlogAdditionComponent() {
  const {data:session}=useSession();
  const[title,setTitle]=useState("");
  const[error,setError]=useState("");
  const [popUp,setPopUp]=useState(false);
  const[description,setDescription]=useState("");
  const author=session?.user?.name;

  const router=useRouter();

  const handleTitle=(e:any)=>{
    setTitle(e.target.value);
  }
  const handleDescription=(e:any)=>{
    setDescription(e.target.value);
  }


  const handleSubmit=async()=>{
    if(title=="" && description=="" && author==""){
      alert("please fill all the fields");
    }else{
      const response=await fetch('http://localhost:3000/api/postBlogs',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({title,description,author}),
      });
      if(response.ok){
        const data=await response.json();
        setPopUp(false);
        router.push('/Home');
      }else{
        setPopUp(true);
        setError("Please fill all the fields!!");
      }
    }
   
  };

  return (
    <div className="bg-amber-400 p-8 flex-column justify-center items-center h-screen">
        <div className="text-black text-xl my-5">Your Blog</div>
      <div className="bg-sky-200 p-8 rounded shadow-md w-full">
        {popUp ?(
            <div className="relative flex justify-center item-center">
              <ErrorComponent error={error}></ErrorComponent>
            </div>
        ):(
          <div></div>
        )}
        <div className="mb-4">
          <label htmlFor="title" className="text-black block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="py-2 px-3 w-full rounded border-black outline-none"
            onChange={handleTitle}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-black block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            className="py-2 px-3 w-full h-96 rounded border-gray-300 resize-none outline-none"
            onChange={handleDescription}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="text-black block mb-1">
            Author:
          </label>
          <input
            type="text"
            id="title"
            className="py-2 px-3 w-full rounded border-gray-300 outline-none"
            value={session?.user?.name}
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

