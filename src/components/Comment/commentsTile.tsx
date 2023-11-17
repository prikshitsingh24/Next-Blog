import { useState } from "react";
import { useRecoilState } from "recoil";
import ButtonX from "../Buttons/buttons";
import AddComment from "./addComment";
import ReplyComment from "./replyComment";
import ReplyCommentsTile from "./replyCommentsTile";

export default function CommentTile({data}:any){
    const [showReplies,setShowReplies]=useState(false);
    const [reply,setReply]=useState(false);

    const handleReply=()=>{
        setReply(!reply);
    }
    return(
        <div>
            {
                !data.parentCommentId && (
                    <div className="mb-8 px-5">
            <div className="flex mb-2">
            <div className="w-14 h-14 px-6 bg-black rounded-full flex items-center justify-center"></div>
            <div className="flex-column">
                <div className="text-xs">{data.user}</div>
                <div className="text-sm py-2 px-2">{data.text}</div>
            </div>
            </div>
            <div className="pl-10"> 
            <div className="pl-60">
            <div className="text-gray-900 text-xs hover:cursor-pointer " onClick={handleReply}>Reply</div>
            </div>
            
            {
                reply && (
                    <ReplyComment data={data} onReplySubmit={handleReply}></ReplyComment>
                )
            }     
                {data.replies.length >0 && (
                <div className="ml-10">
                    <div className="flex w-10 hover:cursor-pointer">
                         <img src="/down-arrow.png" alt="drop down" height={10} width={20} />
                        <div className="text-blue-600 text-sm " onClick={()=>setShowReplies(!showReplies)}>Reply</div>
                        </div>
                {showReplies && [...data.replies].reverse().map((reply, id) => (
                    <div key={id} className="pl-5">
                        <ReplyCommentsTile data={reply}></ReplyCommentsTile>
                    </div>
                ))}
                </div>
            )}
            

            </div>
        </div>
                )
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