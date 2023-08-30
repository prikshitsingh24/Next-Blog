import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const router=useRouter();
  function navigateToSite(){
    setTimeout(()=>{
      router.push('/Home');
    },300)
  }
  return (
    <div>
      <div className='relative flex justify-center items-center h-screen'>
      <button className='bg-black text-white rounded position-fixed px-10 w-35 py-10 transition-transform duration-200 active:scale-95' onClick={navigateToSite}>
        Write your blogs!!
      </button>
    </div>
    </div>
    
  )
}
