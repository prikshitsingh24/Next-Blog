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
      router.push('/Login');
    },900)
  }
  return (
    
    <div>
      <div className={`relative flex justify-center items-center h-screen ${
          isClicked ? 'bg-amber-400' : ''
        }`}>
          {isClicked && (
          
            <div className="text-4xl font-bold text-white mx-2 text-red-500">Next-Blog</div>
        )}
      <button className={`rounded position-fixed px-10 w-35 py-10 transition-transform duration-200 active:scale-90 ${
            isClicked ? 'bg-sky-200 text-black' : 'bg-black text-white'
          }`} onClick={navigateToSite}>
        Write your blogs!!
      </button>
    </div>
    </div>
    
  )
}
