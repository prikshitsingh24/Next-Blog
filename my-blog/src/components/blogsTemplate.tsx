export default function BlogTemplate(props: any){
    return(
        <div className="bg-black text-white rounded-md px-10 py-5">
            <div className="text-xl my-5">{props.title}</div>
            <div className="border-t border-gray-300 my-4"></div>
            {props.text}
        </div>
    );
}