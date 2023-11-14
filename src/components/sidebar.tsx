import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { sideBarStatus } from "../states/atoms/sidebarStatus";
import ButtonX from "./Buttons/buttons";


export default function Sidebar(){
    const {data:session}=useSession();
    const[sidebarStatus]=useRecoilState(sideBarStatus);
    const router=useRouter();
    return(
        <div className="flex">
        <div
          className={`fixed top-0 left-0 z-20 w-64 h-full transition-all duration-500 border rounded-md transform ${
            sidebarStatus ? 'translate-x-0' :'-translate-x-full'
          }  bg-white shadow-lg`}
        >
          <div className="px-6 py-4">
            <div>
                <h1 className="text-xl">Hello {session?.user?.name ?? " "},</h1>
                <div className="border border-black w-full"></div>
                <div>
                <ButtonX text={"Home"} icon={'./home.png'} goTo={()=>router.push('/Home')}></ButtonX>
                <ButtonX text={"My blogs"} icon={'./contract.png'} goTo={()=>router.push('/MyBlogs')}></ButtonX>
                <ButtonX text={"Add blogs"} icon={'./add.png'} goTo={()=>router.push('/AddBlogs')}></ButtonX>
                <ButtonX text={"Blogger's Guild"} icon={'./castle.png'} goTo={()=>router.push('/BloggersGuild')}></ButtonX>
                <ButtonX text={"settings"} icon={'./settings.png'} goTo={()=>router.push('/Settings')}></ButtonX>
                <ButtonX text={"Logout"} icon={'./logout.png'} goTo={()=>signOut()}></ButtonX>
                </div>
                
            </div>
          </div>
        </div>
      </div>
    );
}