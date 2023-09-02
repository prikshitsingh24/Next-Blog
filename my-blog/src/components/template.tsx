
import TodosTemplate from "./todosTemplate";

interface Data {
    title: string;
    description: string;
    author:string;
  }

export default function Template({data}:{data:Data}){
    return(
        <div className="bg-black text-white rounded-md px-10 py-5 my-5">
            <div className="text-xl my-5">{data.title}</div>
            <div className="border-t border-gray-300 my-4"></div>
            {data.description}
            <div className="text-xl my-5">{data.author}</div>
        </div>
    );
}


