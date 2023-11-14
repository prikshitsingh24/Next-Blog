import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import ErrorComponent from "../errorComponent";
import GithubButton from "./githubButton";
import GoogleButton from "./googleButton";


export default function LoginCardPhone(){
    const router=useRouter();
    const[popUp,setPopUp]=useState(false);
    const[error,setError]=useState("");
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
    const handleSignUpToLogin = async () => {
        if(!username || !password || !email){
            setPopUp(true);
            setError("Please fill all the credentials");
        }
        try {
          const response = await fetch(`https://next-blogs-delta-ecru.vercel.app/api/postUsers`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, email: email, password: password })
          });
      
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            if (data.error) {
                setPopUp(true);
                setError(data.error);
              }else{
                setPopUp(false);
                setShowSignUp(!showSignUp);
              }
            
          } else {
              console.log('Unexpected error:', data);
           
          }
        } catch (error) {
          console.log(error);
          // Handle network errors or other exceptions here
        }
      };
      
    const handleSignUp=()=>{
        setPopUp(false);
        setShowSignUp(!showSignUp);
    }
    const handleUsernameLogin=(e:any)=>{
        setUsernameLogin(e.target.value)
    }
    const handlePasswordLogin=(e:any)=>{
        setPasswordLogin(e.target.value)
    }
    const handleNavigation=async()=>{
        if(!usernameLogin || !passwordLogin){
            setPopUp(true);
            setError("Please fill all the credentials");
        }else{
            const signInResponse=await signIn("credentials",{
                username:usernameLogin,
                password:passwordLogin,
                redirect:false
            });
            if(signInResponse && !signInResponse.error){
                setPopUp(false);
                router.push('/Home');
                
            }else{
                setPopUp(true);
                setError("User not found!!! please check your username or password ");
            }
        }
       
    }

    
    return(
        <div className=" overflow-hidden ">
            <div className="bg-darkgrey w-screen h-screen overflow-hidden rounded-md">
                <div className="relative flex justify-center item-center">
                <div className="py-5 text-2xl text-white">Next-Blog</div>
                </div>
                <div className="relative flex justify-center item-center">
                <div className="border-t border-white my-4 w-100 mx-10"></div>
                </div>
                {popUp &&(
                    <div className="relative flex justify-center item-center">
                        <ErrorComponent error={error}/>
                    </div>
                    
                )}
                {showSignUp?(
                    <div>
                        <div className="mx-5 my-2">
                <div className="text-white"> Username:  </div>
                <input className="w-full rounded border-black py-2 px-5" onChange={handleUsername}/>
                <div className=" my-10">
                <div className="text-white"> Email:  </div>
                <input className="w-full rounded border-black py-2 px-5" onChange={handleEmail}/>
                </div>
                <div className="my-10"></div>
                <div className="text-white"> Password:  </div>
                <input className="w-full rounded border-black py-2 px-5" onChange={handlePassword}/>
                </div>
                    </div>
                ):(
                    <div>
                        <div className="mx-5 my-2">
                <div className="text-white"> Username:  </div>
                <input key={"login"} className="w-full rounded border-black py-2 px-5 outline-none" onChange={handleUsernameLogin} placeholder={"Enter username"}/>
                <div className="my-10"></div>
                <div className="text-white"> Password:  </div>
                <input className="w-full rounded border-black py-2 px-5 outline-none" onChange={handlePasswordLogin} placeholder={"Enter password"}/>
                </div>
                    </div>
                )}
                
                {showSignUp ?(
                    <div>
                        <div className="relative flex justify-center item-center my-5">
                <Button color="success" variant="contained" onClick={handleSignUpToLogin}>Sign Up</Button>
                </div>
                    </div>
                ):(
                    <div>
                        <div className="relative flex justify-center item-center my-5">
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
                    <div className="text-sm my-3 text-white">New to Next-blog?</div>
                    <div className="text-sm my-3 mx-1 cursor-pointer text-white underline" onClick={handleSignUp}>Sign Up</div>
                </div>
                <div className="relative flex justify-center item-center">
                    <div className="text-2xl my-5 text-white">OR</div>
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