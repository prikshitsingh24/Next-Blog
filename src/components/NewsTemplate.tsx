

export default function  NewsTemplate({data}:any){
    console.log("data",data)
    return(
        <a href={data.url} target="_blank">
            <div className="relative border px-2 py-2 border-black rounded-xl w-60 h-70 mx-2">
            <div className="border rounded ">
            <img src={data.image} alt="Description of the image" width={600}/>
            </div>
           <div>{data.title}</div>
        </div>
        </a>
        
    );
}