
import { Link } from "@mui/material";
import MarkdownRenderer from "./AddBlogsComponent/markdownComponent";

interface Data {
    title: string;
    description: string;
    author:string;
  }

export default function Template({data,id}:any){
    return(
        <div className="bg-darkgrey text-white rounded-md mx-5 px-10 py-3 my-1">
            <div className="text-xl my-2">{data.title}</div>
            <div className="border px-2 py-2 border-black rounded-xl">
            <MarkdownRenderer content={data.description.slice(0,900)}></MarkdownRenderer>
            <div>........</div>
            </div>
            <div className="text-xl my-5 flex justify-between">
                <div>
                {data.author}
                </div>
                <div className="cursor-pointer">
                    <Link href={`/blogs/${id}`}>
                        <div className="flex">
                        <div>Read more</div>
                    <div className="my-1">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                        />
                        </svg>
                    </div>
                        </div>
                    
                </Link>
            </div>
        </div>
    </div>
    
    );
}


