import Appbar from "@/components/appbar";
import Template from "@/components/template";
import { GetServerSideProps } from "next";
interface Data {
    title: string;
    description: string;
    author:string;
  
  }


export default function Blogs({data}:{data:Data[]}){
  const reverseData=[...data].reverse();
    return(
        <div>
           <Appbar></Appbar>
           <div className="grid grid-cols-12 my-5">
          <div className="col-span-12 sm:col-span-8">
           <div className="px-10 text-xl">Blogs</div>
           {reverseData.map(x=>{
            return <Template data={x}></Template>
           })}
          </div>
          <div className="col-span-12 sm:col-span-4 mx-8">
            <div className="px-10 text-xl">Todos</div>
            </div>
           </div>
           
           </div>
           
    );
}


export async function getStaticProps() {
  try {
    const response = await fetch('http://localhost:3000/api/postBlogs');
    const data = await response.json() as Data;
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: null, // You can handle the error or return a default value as needed
      },
    };
  }
}