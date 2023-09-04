import { signIn } from 'next-auth/react';
import Image from 'next/image'
import googleIcon from '../assets/googleIcon.png'

export default function GoogleButton(){
    const handleGoogle=()=>{
        signIn("google");
    }
    return(

        <div className="flex justify-equally w-60 h-10 bg-white rounded-xl cursor-pointer hover:bg-black hover:text-white" onClick={handleGoogle}>
            <div className="w-8 h-8 rounded-full mx-10 my-1">
            <Image src={googleIcon} alt="Google Logo" width={50} height={50} className="mx-2 rounded-full bg-white" />
            </div>
            <div className="my-1 text-xl">Google</div>
        </div>
    );
}