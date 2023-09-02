import { useRouter } from 'next/navigation'
export default function Appbar(){
    const router=useRouter();
    return(
        <div className="position-fixed w-100 py-5 h-19 bg-red-500 text-white">
            <div className="flex">
            <div className="text-white text-xl mx-10">Next-Blogs</div>
           <button className="bg-red-500 text-white rounded position-fixed px-4 mx-5">Home</button>
           <button className="bg-red-500 text-white rounded position-fixed px-4 mx-5" onClick={()=>{router.push('/MyBlogs')}}>My blogs</button>
           <button className="bg-red-500 text-white rounded position-fixed px-4 mx-5" onClick={()=>{router.push('/AddBlogs')}}>Add blogs</button>
           <button className="bg-red-500 text-white rounded position-fixed px-4 mx-5" onClick={()=>{router.push('/Todos')}}>Todos</button>
            </div>
           
        </div>
    );
}