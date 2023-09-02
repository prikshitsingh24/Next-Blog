import BlogAdditionComponent from "@/components/AddBlogsComponent/blogAddition";
import { useState } from "react";


export default function AddBlogs(){
    const[showOverlay,setShowOverlay]=useState(true);
    const toggleOverlay=()=>{
        setShowOverlay(!showOverlay)
    };
    return(
        <div>
             <BlogAdditionComponent></BlogAdditionComponent>
        </div>
           
        
    );
}
