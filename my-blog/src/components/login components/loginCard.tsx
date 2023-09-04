import { Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import GithubButton from "./githubButton";
import GoogleButton from "./googleButton";



export default function LoginCard(){
    const router=useRouter();
    const[showSignUp,setShowSignUp]=useState(false);
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[usernameLogin,setUsernameLogin]=useState("");
    const[passwordLogin,setPasswordLogin]=useState("");

    const handleUsername=(e:any)=>{
        setUsername(e.target.value)
    }
    const handleEmail=(e:any)=>{
        setEmail(e.target.value)
    }
    const handlePassword=(e:any)=>{
        setPassword(e.target.value)
    }
    const handleSignUpToLogin=async()=>{
        const response=await fetch('http://localhost:3000/api/postUsers',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify({username:username,email:email,password:password})
        });
        if(response.ok){
            setPassword("");
            setUsername("");
            setShowSignUp(!showSignUp);
          }else{
            alert("please fill all the fields")
          }
        
    }
    const handleSignUp=()=>{
        setShowSignUp(!showSignUp);
    }
    const handleUsernameLogin=(e:any)=>{
        setUsernameLogin(e.target.value)
    }
    const handlePasswordLogin=(e:any)=>{
        setPasswordLogin(e.target.value)
    }
    const handleNavigation=async()=>{
        const signInResponse=await signIn("credentials",{
            username:usernameLogin,
            password:passwordLogin,
            redirect:false
        });
        if(signInResponse && !signInResponse.error){
            router.push('/Home');
            return null;
            
        }else{
            console.log("Error: ",signInResponse);
        }
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
                <input className="w-full rounded border-black py-2 px-5" onChange={handleUsername}/>
                <div className=" my-10">
                <div> Email:  </div>
                <input className="w-full rounded border-black py-2 px-5" onChange={handleEmail}/>
                </div>
                <div className="my-10"></div>
                <div> Password:  </div>
                <input className="w-full rounded border-black py-2 px-5" onChange={handlePassword}/>
                </div>
                    </div>
                ):(
                    <div>
                        <div className="mx-5 my-10">
                <div> Username:  </div>
                <input className="w-full rounded border-black py-2 px-5" onChange={handleUsernameLogin}/>
                <div className="my-10"></div>
                <div> Password:  </div>
                <input className="w-full rounded border-black py-2 px-5" onChange={handlePasswordLogin}/>
                </div>
                    </div>
                )}
                
                {showSignUp ?(
                    <div>
                        <div className="relative flex justify-center item-center">
                <Button color="success" variant="contained" onClick={handleSignUpToLogin}>Sign Up</Button>
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


