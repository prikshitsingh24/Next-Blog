

export default function ButtonX(props:any){
    return(
        <div className="my-10 border border-black p-2 rounded-xl hover:cursor-pointer hover:transform hover:scale-105 transition-transform duration-300" onClick={props.goTo}>
            <div className="flex">
                <div className="border rounded-lg border-black p-1">
                <img src={props.icon} alt={props.text} height={20} width={20} />
                </div>
                <div className="mx-5">{props.text}</div>
            </div>
        </div>
    );
}