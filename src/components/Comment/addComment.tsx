import { useSession } from "next-auth/react";
import { useState } from "react";
import AnimatedButton from "../Buttons/animatedButton";



export default function AddComment({data}:any){
    const {data:session}=useSession();
    const [text,setText]=useState('');

    const handleText=(e:any)=>{
        setText(e.target.value);
    }

    const handleCommentPost=async()=>{
        if(text==''){
            console.log('error please fill the comment');
        }else{
            const response=await fetch(`https://next-blogs-delta-ecru.vercel.app/api/comments`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({blogId:data._id,text:text,user:session?.user?.name}),
      });
      if(response.ok){
        console.log('comment posted')
        setText('');
      }else{
        console.log('comment not posted')
      }
        }
    }
    return(
        <div>
            <div className="flex">
           <div className="w-14 h-14 mx-4 bg-black rounded-full flex items-center justify-center"></div>
           <div className="h-14 ml-2">
            <div className="border-b border-black">
                <input type="text" name="add" id="addComments" className="border-none focus:outline-none w-full bg-Beige py-2 overflow-x-none w-[300px]" placeholder="Add a comment...." onChange={handleText}/>
            </div>
            </div>
        </div>
        <div className="flex px-20 py-2">
            <div>
                <AnimatedButton text={"Comment"} onTap={handleCommentPost}></AnimatedButton>
            </div>
            <div className="px-2">
                <AnimatedButton text={"Cancel"}></AnimatedButton>
            </div>
        </div>
        </div>
        
    );
}