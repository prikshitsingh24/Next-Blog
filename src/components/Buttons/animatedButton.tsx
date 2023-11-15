

export default function AnimatedButton(props:any){
    return(
        <div className="border border-black rounded-xl hover:cursor-pointer hover:transform hover:scale-105 transition-transform duration-300" onClick={props.onTap}>
            <div className="flex">
                <div className="mx-2">{props.text}</div>
            </div>
        </div>
    );
}