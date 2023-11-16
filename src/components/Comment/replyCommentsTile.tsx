import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ButtonX from "../Buttons/buttons";
import AddComment from "./addComment";
import ReplyComment from "./replyComment";
import { io } from 'socket.io-client';

interface ReplyType{
    _id:string;
    blogId:string;
    text:string;
    user:string;
    replies:[];
}
export default function ReplyCommentTile({data}:any){
    const replyId:string=data;
    const [replyData,setReplyData]=useState<ReplyType[]>([]);
    useEffect(()=>{
        const handleReplyComments=async ()=>{
            const response=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comments?commentId=${replyId}`);
            const data=await response.json();
            if(data){
                setReplyData([data]);
            }else{
                console.log("no comments found");
            }

        }
       
        handleReplyComments();
    },[replyId])

    return(
        <div>
            {
            <div className="mb-8">
            <div className="flex mb-2">
            <div className="w-12 h-12 px-6 bg-black rounded-full flex items-center justify-center"></div>
            <div className="flex-column">
                <div className="text-xs">{replyData[0]?.user ?? " "}</div>
                <div className="text-sm py-1 px-1">{replyData[0]?.text ?? " "}</div>
            </div>
            </div>
            </div>
            }
        </div>
    );
}





{/* <div className="mb-8">
            <div className="flex mb-2">
            <div className="w-14 h-14 mx-4 bg-black rounded-full flex items-center justify-center"></div>
            <div className="flex-column">
                <div className="text-xs">{data.user}</div>
                <div className="text-sm py-2">{data.text}</div>
            </div>
            </div>
            <div className="pl-10">      
                {showReplies && data.replies && data.replies.length > 0 && (
                <div className="ml-10">
                    <div className="flex w-10 hover:cursor-pointer">
                         <img src="/down-arrow.png" alt="drop down" height={10} width={20} />
                        <div className="text-blue-600 text-sm ">Reply</div>
                        </div>
                {data.replies.map((reply, id) => (
                    <div key={id} className="pl-5">
                    {/* Render individual reply */}
            //         </div>
            //     ))}
            //     </div>
            // )}

        //     </div>
        // </div> */}