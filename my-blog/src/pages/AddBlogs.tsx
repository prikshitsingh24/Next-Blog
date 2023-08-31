import BlogAdditionComponent from "@/components/AddBlogsComponent/blogAddition";
import Overlay from "@/components/AddBlogsComponent/overlay";
import { useState } from "react";

export default function AddBlogs(){
    const[showOverlay,setShowOverlay]=useState(true);
    const toggleOverlay=()=>{
        setShowOverlay(!showOverlay)
    };
    return(
        <div>
             <BlogAdditionComponent></BlogAdditionComponent>
        <Overlay show={showOverlay} onClose={toggleOverlay} />
        </div>
           
        
    );
}