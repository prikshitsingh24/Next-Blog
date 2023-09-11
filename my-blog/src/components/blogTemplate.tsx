import MarkdownRenderer from "./AddBlogsComponent/markdownComponent";


export default function BlogTemplate({data}){
    return(
        <div>
            <div className="flex justify-center text-2xl">
            <h1>{data.title}</h1>
            </div>
        <div className="bg-darkgrey text-white py-5 px-5 my-5"> 
        <MarkdownRenderer content={data.description}/>
        </div>
        </div>
       
    );
}