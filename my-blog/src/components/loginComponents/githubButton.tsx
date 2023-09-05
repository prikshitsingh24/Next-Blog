import Image from 'next/image'
import githubIcon from '../assets/githubIcon.png'
export default function GithubButton(){
    return(

        <div className="flex justify-equally w-60 h-10 bg-white rounded-xl cursor-pointer hover:bg-black hover:text-white">
            <div className="w-8 h-8 rounded-full mx-10 my-1">
            <Image src={githubIcon} alt="Google Logo" width={100} height={100} className="mx-2 bg-white rounded-full" />
            </div>
            <div className="my-1 text-xl">Github</div>
        </div>
    );
}