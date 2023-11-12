
import { useState } from "react";
import BlogAdditionComponent from "../components/AddBlogsComponent/blogAddition";


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
