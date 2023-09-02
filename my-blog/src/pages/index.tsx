import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [isClicked,setIsClicked]=useState(false)
  const router=useRouter();
  function navigateToSite(){
    setIsClicked(true);
    setTimeout(()=>{
      router.push('/Home');
    },500)
  }
  return (
    
    <div>
      <div className={`relative flex justify-center items-center h-screen ${
          isClicked ? 'bg-amber-400' : ''
        }`}>
      <button className={`rounded position-fixed px-10 w-35 py-10 transition-transform duration-200 active:scale-95 ${
            isClicked ? 'bg-sky-200 text-black' : 'bg-black text-white'
          }`} onClick={navigateToSite}>
        Write your blogs!!
      </button>
    </div>
    </div>
    
  )
}
