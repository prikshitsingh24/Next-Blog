
import { TextField } from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function Overlay(props: any){
    const [pass,setPass]=useState("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
      };
    
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 ${props.show ? 'block' : 'hidden'}`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <div className="w-80 bg-black flex">
                <div className="px-5">enter the passcode</div>
                <input className="text-black mx-10" onChange={handleInputChange}></input>
                <button onClick={props.onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </div>
            
          </div>
        </div>
      );
}