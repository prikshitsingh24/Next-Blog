import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import GithubButton from "./githubButton";
import GoogleButton from "./googleButton";



export default function LoginCard(){
    const router=useRouter();
    const[showSignUp,setShowSignUp]=useState(false);
    const handleSignUp=()=>{
        setShowSignUp(!showSignUp);
    }
    const handleNavigation=()=>{
        router.push('/Home');
    }
    
    return(
        <div className="my-40">
            <div className="bg-sky-200 w-110 h-110 rounded-md">
                <div className="relative flex justify-center item-center">
                <div className="py-5 text-2xl">Next-Blog</div>
                </div>
                <div className="relative flex justify-center item-center">
                <div className="border-t border-black my-4 w-100 mx-10"></div>
                </div>
                {showSignUp?(
                    <div>
                        <div className="mx-5 my-10">
                <div> Username:  </div>
                <input className="w-full rounded border-black py-2 px-5"/>
                <div className=" my-10">
                <div> Email:  </div>
                <input className="w-full rounded border-black py-2 px-5"/>
                </div>
                <div className="my-10"></div>
                <div> Password:  </div>
                <input className="w-full rounded border-black py-2 px-5"/>
                </div>
                    </div>
                ):(
                    <div>
                        <div className="mx-5 my-10">
                <div> Username:  </div>
                <input className="w-full rounded border-black py-2 px-5"/>
                <div className="my-10"></div>
                <div> Password:  </div>
                <input className="w-full rounded border-black py-2 px-5"/>
                </div>
                    </div>
                )}
                
                {showSignUp ?(
                    <div>
                        <div className="relative flex justify-center item-center">
                <Button color="success" variant="contained" onClick={handleSignUp}>Sign Up</Button>
                </div>
                    </div>
                ):(
                    <div>
                        <div className="relative flex justify-center item-center">
                <Button color="success" variant="contained" onClick={handleNavigation}>Login</Button>
                </div>
                    </div>
                )}
                
                {showSignUp ? (
                    <div>

                    </div>
                ):(
                    <div>
                        <div className="relative flex justify-center item-center">
                    <div className="text-sm my-3">New to Next-blog?</div>
                    <div className="text-sm my-3 mx-1 cursor-pointer text-blue underline" onClick={handleSignUp}>Sign Up</div>
                </div>
                <div className="relative flex justify-center item-center">
                    <div className="text-2xl my-5">OR</div>
                </div>
                <div className="relative flex justify-center item-center">
                    <GoogleButton></GoogleButton>
                </div>
                <div className="my-5"></div>
                <div className="relative flex justify-center item-center">
                    <GithubButton></GithubButton>
                </div>
                <div className="my-5"></div>
                    </div>
                )}
                
            </div>
        </div>
    );
}


