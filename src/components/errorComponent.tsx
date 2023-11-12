

export default function ErrorComponent(props:any){
    return(
        <div className="bg-red-600 w-full rounded h-8 mx-20">
            <div className="relative flex justify-center item-center text-white">
            {props.error}
            </div>
            
        </div>
    );
}