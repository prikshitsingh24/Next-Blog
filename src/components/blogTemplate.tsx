import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import MarkdownRenderer from "./AddBlogsComponent/markdownComponent";
import CommentSection from "./Comment/commentSection";


export default function BlogTemplate({data}:any){
    return(
        <div>
            <div className="flex justify-center text-2xl">
            <h1>{data.title}</h1>
            </div>
        <div className="bg-darkgrey text-white py-5 px-5 my-5"> 
        <MarkdownRenderer content={data.description}/>
        </div>
        <div className="border border-black rounded-lg mx-2">
            <CommentSection data={data}></CommentSection>
        </div>
        </div>
       
    );
}