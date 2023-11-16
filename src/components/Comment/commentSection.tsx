import { useEffect, useState } from "react";
const io = (await import("socket.io-client")).default;
import AddComment from "./addComment";
import CommentTile from "./commentsTile";



export default function CommentSection({data}:any){
    const id=data._id;
    const [comments,setComments]=useState([]);
    useEffect(()=>{
     const handleCommentData=async()=>{
        const response=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comments?blogId=${id}`);
        const data=await response.json();
        if(data){
            setComments(data.comments);
        }else{
            console.log('no comments founds');
        }
     }
 
     const handleSocketNewComment = (newComment) => {
        // Update UI based on the newComment received
        setComments((prevComments) => [...prevComments, newComment]);
      };
  
      handleCommentData();
      const socket = io(`${process.env.NEXT_PUBLIC_URL}:80`);
      socket.on('newParentComment', handleSocketNewComment);
  
      return () => {
        // Clean up event listener when the component unmounts
        socket.off('newParentComment', handleSocketNewComment);
      };
    },[id]);
    return(
        <div>
            <div className="text-xl text-solid p-4">
            Comments
        </div>
        <div className="mb-10">
        <AddComment data={data}></AddComment>
        </div>
        <div>
            {
                [...comments].reverse().map((x,id)=>{
                    return <CommentTile key={id} data={x}></CommentTile>
                })
            }
        </div>
        </div>
        
    );
}