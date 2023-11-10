import NewsTemplate from "@/components/NewsTemplate";
import { useEffect, useState } from "react";
import Loader from 'react-loader-spinner';
interface NewsItem {
    title: string;
    text: string;
    url: string;
    image: string;
    publish_date: string;
  }        


export default function News({data}:any){
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("apikey", "1vXmP758BYfTBkkDo7VJMwdb7so7mkX1");
        const url=['https://www.reuters.com/world/middle-east/gaza-officials-say-hospitals-come-under-new-israeli-attacks-2023-11-10/'];
        const analyze='India';
        var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
        };
        const handleNews=async ()=>{
            const response = await fetch(`https://api.apilayer.com/world_news/extract-news?url=${url}&analyze=${analyze}`,requestOptions);
            const result = await response.json();
            setNewsData([result])
        };
             handleNews();
          
        
    },[]);
    return(
        <div>
            <div className="text-xl">
            News
            </div>
            <div className="w-full h-[600px] border rounded border-black ">
                <div className="relative flex justify-center">
                    <div className="justify-center w-full">
                    <div className="px-10 my-5">Today's latest news!</div>
                    <div className=" border-t border-black my-4 mx-5"> </div>
                    <div className="mx-1 my-5">
                    <div className="grid grid-cols-3 gap-2">
                    {Array.isArray(newsData) && newsData.length !== 0 ? (
                        newsData.map((item, index) => (
                            <NewsTemplate data={item} key={index} />
                        ))
                        ) : (
                        <div className="mx-20 my-20">Loading.....</div>
                        )}
                    </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

